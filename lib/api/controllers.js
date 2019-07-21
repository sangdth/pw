"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lowdb_1 = tslib_1.__importDefault(require("lowdb"));
const randomatic_1 = tslib_1.__importDefault(require("randomatic"));
const FileSync_1 = tslib_1.__importDefault(require("lowdb/adapters/FileSync"));
const fs = tslib_1.__importStar(require("fs-extra"));
const path = tslib_1.__importStar(require("path"));
// import usb from 'usb';
// import * as os from 'os';
const crypto_1 = require("crypto");
// import * as inquirer from 'inquirer';
// import chalk from 'chalk';
const path_1 = require("../lib/util/path");
// const devices = usb.getDeviceList();
// console.log('devices ', devices.length);
const pwFile = path_1.getPath('db.json');
const pwTemplate = '{ "passwords": [] }';
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
        this.passwords = [];
        // make folder and file for the first run
        if (!fs.existsSync(path.dirname(pwFile))) {
            fs.mkdirSync(path.dirname(pwFile));
            fs.writeFileSync(pwFile, pwTemplate, { encoding: 'utf-8' });
        }
        const passwords = db.get('passwords').value();
        this.passwords = passwords.map((o) => {
            const tempObj = Object.assign({}, o);
            tempObj.password = this.decrypt(o.password);
            return tempObj;
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
        db.get('passwords')
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
    removeById(id) {
        this.passwords.splice(this.passwords.findIndex(e => e.id === id), 1);
    }
    removeByAlias(alias) {
        this.passwords.splice(this.passwords.findIndex(e => e.alias === alias), 1);
        db.get('passwords')
            .remove({ alias })
            .write();
    }
}
const api = new PasswordAPI();
exports.default = api;
