"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = tslib_1.__importStar(require("@oclif/command"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const cli_table_1 = tslib_1.__importDefault(require("cli-table"));
const controllers_1 = tslib_1.__importDefault(require("../api/controllers"));
class Find extends command_1.default {
    async run() {
        const { args: { input }, flags } = this.parse(Find);
        const { index, alias, email } = flags;
        const table = new cli_table_1.default({
            head: [
                chalk_1.default.blueBright.bold('#'),
                chalk_1.default.blueBright.bold('Alias'),
                chalk_1.default.blueBright.bold('Login'),
                chalk_1.default.blueBright.bold('Email'),
                chalk_1.default.blueBright.bold('Password'),
            ]
        });
        /*
        const passwords = passwordAPI.list().map((o: any) => {
          o.password = '*'.repeat(16)
          return o
        })
        */
        if (index) {
            const found = controllers_1.default.findByIndex(parseInt(index, 10));
            table.push([0, found.alias, found.login, found.email, found.password]);
            this.log(table.toString());
        }
        if (alias) {
            const passwords = controllers_1.default.findByAlias(alias);
            console.log({ passwords });
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
        // TODO: Make sure flags have affect here
        if (input) {
            const results = controllers_1.default.search(input);
            results.map((o, i) => {
                table.push([i, o.alias, o.login, o.email, `**********${o.password.slice(-4)}`]);
            });
            this.log(table.toString());
        }
    }
}
exports.default = Find;
Find.description = 'Get one or more specific passwords';
Find.aliases = ['get', 'select'];
Find.flags = {
    index: command_1.flags.string({ char: 'i' }),
    alias: command_1.flags.string({ char: 'a' }),
    email: command_1.flags.string({ char: 'e' }),
};
Find.args = [
    { name: 'input' },
];
