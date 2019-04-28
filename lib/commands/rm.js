"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const chalk_1 = require("chalk");
const inquirer = require("inquirer");
const Table = require('cli-table');
const controllers_1 = require("../api/controllers");
class Remove extends command_1.Command {
    async run() {
        const { flags } = this.parse(Remove);
        let { index, alias, email } = flags;
        if (index) {
            const arr = index.split(',');
            if (arr.length >= 1) {
                let answers = await inquirer.prompt([{
                        type: 'confirm',
                        name: 'confirm',
                        message: (a) => 'Permanently delete those indexes. Are you sure?',
                        default: false
                    }]);
                if (answers.confirm) {
                    const passwords = controllers_1.default.list();
                    const ids = arr.map((i) => passwords[i].id);
                    for (let i = 0; i < ids.length; i++) {
                        controllers_1.default.removeById(ids[i]);
                    }
                    this.log('Deleted successful!');
                }
            }
        }
        if (alias) {
            const table = new Table({
                head: [
                    chalk_1.default.blueBright.bold('#'),
                    chalk_1.default.blueBright.bold('Alias'),
                    chalk_1.default.blueBright.bold('Login'),
                    chalk_1.default.blueBright.bold('Email'),
                    chalk_1.default.blueBright.bold('Password'),
                ]
            });
            const passwords = controllers_1.default.findByAlias(alias);
            for (let i = 0; i < passwords.length; i++) {
                const item = passwords[i];
                table.push([i, item.alias, item.login, item.email, item.password]);
            }
            if (passwords.length >= 2) {
                this.log(table.toString());
                let answers = await inquirer.prompt([
                    { name: 'position', type: 'input', message: 'Select item to remove' },
                    {
                        name: 'confirm',
                        type: 'confirm',
                        message: (a) => `Permanent delete ${chalk_1.default.blue.bold(passwords[a.position].alias)}. Are you sure?`,
                        default: false,
                    },
                ]);
                if (answers.confirm) {
                    controllers_1.default.removeByAlias(passwords[answers.position].alias);
                    this.log('Deleted successful!');
                }
            }
            if (passwords.length === 1) {
                let answers = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'confirm',
                        message: (a) => `Permanently delete ${chalk_1.default.blue.bold(passwords[0].alias)}. Are you sure?`,
                        default: false
                    },
                ]);
                if (answers.confirm) {
                    controllers_1.default.removeByAlias(passwords[0].alias);
                    this.log('Deleted successful!');
                }
            }
        }
    }
}
Remove.description = 'Remoe a record';
Remove.aliases = ['remove', 'delete', 'del'];
Remove.flags = {
    index: command_1.flags.string({ char: 'i' }),
    alias: command_1.flags.string({ char: 'a' }),
    email: command_1.flags.string({ char: 'e' }),
};
exports.default = Remove;
