"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@oclif/command");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const inquirer = tslib_1.__importStar(require("inquirer"));
const cli_table_1 = tslib_1.__importDefault(require("cli-table"));
const clipboardy = require('clipboardy');
const controllers_1 = tslib_1.__importDefault(require("../api/controllers"));
class Copy extends command_1.Command {
    async run() {
        const { flags } = this.parse(Copy);
        const { index, alias } = flags;
        if (alias) {
            const table = new cli_table_1.default({
                head: [
                    chalk_1.default.blueBright.bold('#'),
                    chalk_1.default.blueBright.bold('Alias'),
                    chalk_1.default.blueBright.bold('Login'),
                    chalk_1.default.blueBright.bold('Email'),
                    chalk_1.default.blueBright.bold('Password'),
                ],
            });
            const passwords = controllers_1.default.findByAlias(alias);
            for (let i = 0; i < passwords.length; i++) {
                const item = passwords[i];
                table.push([i, item.alias, item.login, item.email, '*'.repeat(16)]);
            }
            if (passwords.length >= 2) {
                this.log(table.toString());
                const answers = await inquirer.prompt([
                    {
                        name: 'position', type: 'input', message: 'Select item to copy', default: 0,
                    },
                ]);
                if (answers.position) {
                    clipboardy.writeSync(passwords[answers.position].password);
                    this.log(`Copied ${chalk_1.default.green(passwords[answers.position].alias)} into clipboard!`);
                }
            }
            if (passwords.length === 1) {
                clipboardy.writeSync(passwords[0].password);
                this.log(`Copied ${chalk_1.default.green(passwords[0].alias)} into clipboard!`);
            }
        }
        if (index) {
            const passwords = controllers_1.default.list();
            const found = passwords[parseInt(index, 10)];
            clipboardy.writeSync(found.password);
            this.log(`Copied ${chalk_1.default.green(found.alias)} into clipboard!`);
        }
    }
}
Copy.description = 'Copy a record';
Copy.aliases = ['copy'];
Copy.flags = {
    index: command_1.flags.string({ char: 'i' }),
    alias: command_1.flags.string({ char: 'a' }),
};
exports.default = Copy;
