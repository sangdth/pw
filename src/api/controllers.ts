import FileSync from 'lowdb/adapters/FileSync';
import Fuse from 'fuse.js';
import low from 'lowdb';
import randomize from 'randomatic';
// import usb from 'usb';
// import * as os from 'os';
import {
  scryptSync,
  createCipheriv,
  createDecipheriv,
} from 'crypto';
// import * as inquirer from 'inquirer';
// import chalk from 'chalk';
import { getPath } from '../lib/util/path';

// const devices = usb.getDeviceList();
// console.log('devices ', devices.length);

const pwFile = getPath('db.json');
const masterPass = 'lorem_pass';
const iv = Buffer.alloc(16, 0); // make it dynamic later
const salt = 'random_salt';
const key = scryptSync(masterPass, salt, 24);

const adapter = new FileSync(pwFile, {
  // run on write
  // serialize: (obj: object) => encrypt(obj),
  // run on read
  // deserialize: (str: string) => decrypt(str)
});

const db = low(adapter);

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

    private encrypt(cleanString: string) {
      const cipher = createCipheriv('aes192', key, iv);
      let encrypted = cipher.update(cleanString, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    }

    private decrypt(encryptedString: string) {
      const decipher = createDecipheriv('aes192', key, iv);
      let decrypted = decipher.update(encryptedString, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    }

    add(email : string, password : string, alias? : string, login? : string) {
      alias = alias || '';
      login = login || '';
      const found = this.passwords.find(o => o.alias === alias);
      if (found) { alias += randomize('a', 3); }
      const newPassword: Password = {
        id: randomize('aA0', 32),
        email,
        password: this.encrypt(password),
        alias,
        login,
        used: 0,
        created: Date.now(),
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
