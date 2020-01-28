import FileSync from 'lowdb/adapters/FileSync';
import Fuse from 'fuse.js';
import low from 'lowdb';
import randomize from 'randomatic';
// import usb from 'usb';
// import * as os from 'os';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'crypto';
// import * as inquirer from 'inquirer';
// import chalk from 'chalk';
import { getPath } from '../helpers/util/path';

// const devices = usb.getDeviceList();
// console.log('devices ', devices.length);
const pwFile = getPath('db.json');

const adapter = new FileSync(pwFile, {
  // run on write
  // serialize: (obj: object) => encrypt(obj),
  // run on read
  // deserialize: (str: string) => decrypt(str)
});

const db = low(adapter);
const masterPass = 'lorem_pass';
const salt = db.get('preferences.salt').value();
const key = scryptSync(masterPass, salt, 32);

class PasswordAPI {
  private passwords: Password[] = []
  
  private fuse: any

  constructor() {
    // make folder and file for the first run
    const results = db.get('container').value();
    this.passwords = results.map((o: any) => ({
      ...o,
      password: this.decrypt(o.password),
    }));
    this.fuse = new Fuse(results, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        "alias",
        "email",
        "login",
      ],
    })
  }

  private encrypt(textInput: string) {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(textInput);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  private decrypt(encryptedString: string) {
    const textParts = encryptedString.split(':');
    const iv = Buffer.from(textParts[0], 'hex');
    const encrypted = Buffer.from(textParts[1], 'hex');
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  add(email : string, password : string, alias? : string, login? : string) {
    alias = alias || '';
    login = login || '';
    const found = this.passwords.find(o => o.alias === alias);
    if (found) { alias += `-${randomize('a0', 3)}`; }
    const newPassword: Password = {
      id: randomize('aA0', 32),
      email,
      password: this.encrypt(password),
      alias,
      login,
      used: 0,
      created: Date.now(),
      updated: Date.now(),
    };
    db.get('container')
      // @ts-ignore
      .push(newPassword)
      .write();
  }

  list() {
    return this.passwords;
  }

  findByIndex(index : number) {
    return this.passwords[index];
  }

  findById(id : string) {
    return this.passwords.find(e => e.id === id);
  }

  findByAlias(alias : string) {
    return this.passwords.filter(e => e.alias.toLowerCase().includes(alias));
  }

  findByEmail(email : string) {
    return this.passwords.filter(e => e.email.toLowerCase().includes(email));
  }

  // provide fuzzy search with input
  search(input: string) {
    return this.fuse.search(input) ;
  }

  removeById(id : string) {
    this.passwords.splice(this.passwords.findIndex(e => e.id === id), 1);
  }

  removeByAlias(alias : string) {
    this.passwords.splice(this.passwords.findIndex(e => e.alias === alias), 1);
    db.get('container')
      // @ts-ignore
      .remove({ alias })
      .write();
  }
}

export default new PasswordAPI();