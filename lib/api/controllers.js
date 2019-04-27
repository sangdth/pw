"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const os = require("os");
const randomize = require('randomatic');
const pwFile = path.join(os.homedir(), '.pw-cli', 'db.json');
class PasswordAPI {
    constructor() {
        this.passwords = [];
        // make folder and file for the first run
        if (!fs.existsSync(path.dirname(pwFile))) {
            fs.mkdirSync(path.dirname(pwFile));
            fs.writeFileSync(pwFile, "[]", { encoding: 'utf-8' });
        }
        this.passwords = JSON.parse(fs.readFileSync(pwFile, { encoding: 'utf-8' }));
    }
    savePasswords() {
        const data = JSON.stringify(this.passwords);
        fs.writeFileSync(pwFile, data, { encoding: 'utf-8' });
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
        const newPassword = { email, password, alias, login, used, created };
        this.passwords.push(newPassword);
        this.savePasswords();
    }
    list() {
        return this.passwords;
    }
    findByIndex(index) {
        return this.passwords[index];
    }
    findByAlias(alias) {
        return this.passwords.filter(e => e.alias.toLowerCase().includes(alias));
    }
    findByEmail(email) {
        return this.passwords.filter(e => e.email.toLowerCase().includes(email));
    }
    removeByIndex(index) {
        this.passwords.splice(index, 1);
        this.savePasswords();
    }
    removeByAlias(alias) {
        const index = this.passwords.findIndex(e => e.alias === alias);
        this.passwords.splice(index, 1);
        this.savePasswords();
    }
}
const api = new PasswordAPI;
exports.default = api;
