"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const randomize = require('randomatic');
const pwFile = path.join(os.homedir(), '.pw-cli', 'db.json');
class PasswordAPI {
    constructor() {
        this.passwords = [];
        this.iv = Buffer.alloc(16, 0); // make it dynamic later
        this.masterPass = 'lorem_pass';
        this.salt = 'random_salt';
        // make folder and file for the first run
        if (!fs.existsSync(path.dirname(pwFile))) {
            fs.mkdirSync(path.dirname(pwFile));
            fs.writeFileSync(pwFile, "[]", { encoding: 'utf-8' });
        }
        const data = JSON.parse(fs.readFileSync(pwFile, { encoding: 'utf-8' }));
        this.passwords = data.map((o) => {
            o.password = this.decrypt(o.password);
            return o;
        });
    }
    savePasswords() {
        const data = JSON.stringify(this.passwords);
        fs.writeFileSync(pwFile, data, { encoding: 'utf-8' });
    }
    encrypt(pass) {
        const key = crypto.scryptSync(this.masterPass, this.salt, 24);
        const cipher = crypto.createCipheriv('aes192', key, this.iv);
        let encrypted = cipher.update(pass, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    decrypt(encryptedPass) {
        const key = crypto.scryptSync(this.masterPass, this.salt, 24);
        const decipher = crypto.createDecipheriv('aes192', key, this.iv);
        let decrypted = decipher.update(encryptedPass, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    add(email, password, alias, login) {
        alias = alias || '';
        login = login || '';
        const used = 0;
        const created = Date.now();
        const found = this.passwords.find(o => o.alias === alias);
        if (found) {
            alias += randomize('a', 3);
        }
        const id = randomize('aA0', 16);
        password = this.encrypt(password);
        const newPassword = { id, email, password, alias, login, used, created };
        this.passwords.push(newPassword);
        this.savePasswords();
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
        this.savePasswords();
    }
    removeByAlias(alias) {
        this.passwords.splice(this.passwords.findIndex(e => e.alias === alias), 1);
        this.savePasswords();
    }
}
const api = new PasswordAPI;
exports.default = api;
