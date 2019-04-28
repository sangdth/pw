"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const chalk_1 = require("chalk");
const Table = require('cli-table');
const controllers_1 = require("../api/controllers");
class Find extends command_1.Command {
    async run() {
        const { flags } = this.parse(Find);
        const { index, alias, email } = flags;
        const table = new Table({
            head: [
                chalk_1.default.blueBright.bold('#'),
                chalk_1.default.blueBright.bold('Alias'),
                chalk_1.default.blueBright.bold('Login'),
                chalk_1.default.blueBright.bold('Email'),
                chalk_1.default.blueBright.bold('Password'),
            ]
        });
        const passwords = controllers_1.default.list();
        if (index) {
            const found = controllers_1.default.findByIndex(parseInt(index, 10));
            table.push([0, found.alias, found.login, found.email, found.password]);
            this.log(table.toString());
        }
        if (alias) {
            const passwords = controllers_1.default.findByAlias(alias);
            for (let i = 0; i < passwords.length; i++) {
                const item = passwords[i];
                table.push([i, item.alias, item.login, item.email, item.password]);
            }
            this.log(table.toString());
        }
        if (email) {
            const passwords = controllers_1.default.findByEmail(email);
            for (let i = 0; i < passwords.length; i++) {
                const item = passwords[i];
                table.push([i, item.alias, item.login, item.email, item.password]);
            }
            this.log(table.toString());
        }
    }
}
Find.description = 'Get one or more specific passwords';
Find.aliases = ['get', 'select'];
Find.flags = {
    index: command_1.flags.string({ char: 'i' }),
    alias: command_1.flags.string({ char: 'a' }),
    email: command_1.flags.string({ char: 'e' }),
};
exports.default = Find;
