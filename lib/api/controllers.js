"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const crypto = require("crypto");
const path_1 = require("../lib/util/path");
const randomize = require('randomatic');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const pwFile = path_1.getPath('db.json');
const pwTemplate = '{ "passwords": [] }';
const masterPass = 'lorem_pass';
const iv = Buffer.alloc(16, 0); // make it dynamic later
const salt = 'random_salt';
const key = crypto.scryptSync(masterPass, salt, 24);
const adapter = new FileSync(pwFile, {
// run on write
// serialize: (obj: object) => encrypt(obj),
// run on read
// deserialize: (str: string) => decrypt(str)
});
const db = low(adapter);
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
        const cipher = crypto.createCipheriv('aes192', key, iv);
        let encrypted = cipher.update(cleanString, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    decrypt(encryptedString) {
        const decipher = crypto.createDecipheriv('aes192', key, iv);
        let decrypted = decipher.update(encryptedString, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    add(email, password, alias, login) {
        alias = alias || '';
        login = login || '';
        const found = this.passwords.find(o => o.alias === alias);
        if (found) {
            alias += randomize('a', 3);
        }
        const newPassword = {
            id: randomize('aA0', 32),
            email,
            password: this.encrypt(password),
            alias,
            login,
            used: 0,
            created: Date.now()
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
    }
}
const api = new PasswordAPI;
exports.default = api;
