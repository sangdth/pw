"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = tslib_1.__importStar(require("@oclif/command"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const inquirer_1 = require("inquirer");
const cli_table_1 = tslib_1.__importDefault(require("cli-table"));
const controllers_1 = tslib_1.__importDefault(require("../api/controllers"));
class Remove extends command_1.default {
    async run() {
        const { args, flags } = this.parse(Remove);
        if (Object.keys(flags).length) {
            let { index, alias } = flags;
            if (index) {
                const arr = index.split(',');
                if (arr.length >= 1) {
                    let answers = await inquirer_1.prompt([{
                            type: 'confirm',
                            name: 'confirm',
                            message: () => 'Permanently delete indexes. Are you sure?',
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
                const table = new cli_table_1.default({
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
                    let answers = await inquirer_1.prompt([
                        { name: 'position', type: 'input', message: 'Select item to remove' },
                        {
                            name: 'confirm',
                            type: 'confirm',
                            message: (a) => `Permanent delete ${chalk_1.default.red.bold(passwords[a.position].alias)}. Are you sure?`,
                            default: false,
                        },
                    ]);
                    if (answers.confirm) {
                        controllers_1.default.removeByAlias(passwords[answers.position].alias);
                        this.log('Deleted successful!');
                    }
                }
                if (passwords.length === 1) {
                    let answers = await inquirer_1.prompt([
                        {
                            type: 'confirm',
                            name: 'confirm',
                            message: (a) => `Permanently delete ${chalk_1.default.red.bold(passwords[0].alias)}. Are you sure?`,
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
        if (Object.keys(args).length) {
            // If user omitted flags, we use args
            const { alias } = args;
            controllers_1.default.removeByAlias(alias);
            this.log('Deleted successful!');
        }
    }
}
Remove.description = 'Remoe a record';
Remove.aliases = ['remove', 'delete', 'del'];
Remove.args = [
    {
        name: 'alias',
        required: false,
        description: 'If flags are omitted, first arg will become alias',
        hidden: false,
    }
];
Remove.flags = {
    index: command_1.flags.string({ char: 'i' }),
    alias: command_1.flags.string({ char: 'a' }),
};
exports.default = Remove;
