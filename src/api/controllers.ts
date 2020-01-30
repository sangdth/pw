// import chalk from 'chalk';
import Fuse from 'fuse.js';
import randomize from 'randomatic';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'crypto';
// import * as inquirer from 'inquirer';
// import chalk from 'chalk';
import {
  addPassword,
  deletePassword,
  getPasswords,
  getPreferences,
} from './database';

const masterPass = 'lorem_pass';
const { salt } = getPreferences();

class Controllers {
  private passwords: Password[] = [];

  private key = scryptSync(masterPass, salt, 32);

  private fuse: any; // TODO: make type for this

  private encrypt(textInput: string) {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', this.key, iv);
    let encrypted = cipher.update(textInput);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  private decrypt(encryptedString: string) {
    const textParts = encryptedString.split(':');
    const iv = Buffer.from(textParts[0], 'hex');
    const encrypted = Buffer.from(textParts[1], 'hex');
    const decipher = createDecipheriv('aes-256-cbc', this.key, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  constructor() {
    const results = getPasswords();
    this.passwords = results;
    this.fuse = new Fuse(results, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        'alias',
        'email',
        'login',
      ],
    });
  }

  add(input: Input) {
    const { alias, login, email, password } = input;
    const found = this.passwords.find((o) => o.alias === alias);
    const newPassword: Password = {
      id: randomize('aA0', 32),
      email,
      password: this.encrypt(password),
      alias: found ? `${alias}-${randomize('a0', 3)}` : alias,
      login: login || '',
      used: 0,
      created: Date.now(),
      updated: Date.now(),
    };
    addPassword(newPassword);
  }

  // TODO: session
  authenticate(code: string) {
    const { secret } = getPreferences();
    if (!secret) { // need to sanitize this input
      return false;
    }
    return this.decrypt(secret) === code;
  }

  getPassword(id: string) {
    const found = this.passwords.find((e) => e.id === id);
    if (found) {
      return this.decrypt(found.password);
    }
    // console.warn(`${chalk.green('Item not found.')}`);
    return '';
  }

  list() {
    return this.passwords;
  }

  findByIndex(index: number) {
    return this.passwords[index];
  }

  findById(id: string) {
    return this.passwords.find((e) => e.id === id);
  }

  findByAlias(alias: string) {
    return this.passwords
      .filter((e) => e.alias.toLowerCase().includes(alias.toLowerCase()));
  }

  findByEmail(email: string) {
    return this.passwords
      .filter((e) => e.email.toLowerCase().includes(email.toLowerCase()));
  }

  // provide fuzzy search with input
  search(input: string) {
    return this.fuse.search(input);
  }

  // setup(master: string) {}

  removeById(id: string) {
    const found = this.findById(id);
    if (found) {
      this.passwords.splice(this.passwords.findIndex((e) => e.id === id), 1);
      deletePassword(id);
    }
  }

  removeByAlias(alias: string) {
    const index = this.passwords.findIndex((e) => e.alias === alias);
    if (index > -1) {
      const removed = this.passwords.splice(index, 1)[0];
      deletePassword(removed.id);
    }
  }
}

export default new Controllers();
