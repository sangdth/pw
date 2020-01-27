"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lowdb_1 = tslib_1.__importDefault(require("lowdb"));
const randomatic_1 = tslib_1.__importDefault(require("randomatic"));
const fuse_js_1 = tslib_1.__importDefault(require("fuse.js"));
const FileSync_1 = tslib_1.__importDefault(require("lowdb/adapters/FileSync"));
// import usb from 'usb';
// import * as os from 'os';
const crypto_1 = require("crypto");
// import * as inquirer from 'inquirer';
// import chalk from 'chalk';
const path_1 = require("../lib/util/path");
// const devices = usb.getDeviceList();
// console.log('devices ', devices.length);
const pwFile = path_1.getPath('db.json');
const masterPass = 'lorem_pass';
const iv = Buffer.alloc(16, 0); // make it dynamic later
const salt = 'random_salt';
const key = crypto_1.scryptSync(masterPass, salt, 24);
const adapter = new FileSync_1.default(pwFile, {
// run on write
// serialize: (obj: object) => encrypt(obj),
// run on read
// deserialize: (str: string) => decrypt(str)
});
const db = lowdb_1.default(adapter);
class PasswordAPI {
    constructor() {
        // make folder and file for the first run
        this.passwords = [];
        const passwords = db.get('container').value();
        this.passwords = passwords.map((o) => (Object.assign(Object.assign({}, o), { password: this.decrypt(o.password) })));
        this.fuse = new fuse_js_1.default(passwords, {
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
        });
    }
    encrypt(cleanString) {
        const cipher = crypto_1.createCipheriv('aes192', key, iv);
        let encrypted = cipher.update(cleanString, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    decrypt(encryptedString) {
        const decipher = crypto_1.createDecipheriv('aes192', key, iv);
        let decrypted = decipher.update(encryptedString, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    add(email, password, alias, login) {
        alias = alias || '';
        login = login || '';
        const found = this.passwords.find(o => o.alias === alias);
        if (found) {
            alias += randomatic_1.default('a', 3);
        }
        const newPassword = {
            id: randomatic_1.default('aA0', 32),
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
    findByIndex(index) {
        return this.passwords[index];
    }
    findById(id) {
        return this.passwords.find(e => e.id === id);
    }
    findByAlias(alias) {
        return this.passwords.filter(e => e.alias.toLowerCase().includes(alias));
    }
    findByEmail(email) {
        return this.passwords.filter(e => e.email.toLowerCase().includes(email));
    }
    // provide fuzzy search with input
    search(input) {
        return this.fuse.search(input);
    }
    removeById(id) {
        this.passwords.splice(this.passwords.findIndex(e => e.id === id), 1);
    }
    removeByAlias(alias) {
        this.passwords.splice(this.passwords.findIndex(e => e.alias === alias), 1);
        db.get('container')
            // @ts-ignore
            .remove({ alias })
            .write();
    }
}
const api = new PasswordAPI();
exports.default = api;
