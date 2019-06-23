"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = tslib_1.__importStar(require("@oclif/command"));
// import cli from 'cli-ux'
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const inquirer_1 = require("inquirer");
const cli_table_1 = tslib_1.__importDefault(require("cli-table"));
const controllers_1 = tslib_1.__importDefault(require("../api/controllers"));
class List extends command_1.default {
    async run() {
        // cli.action.start('starting a process')
        const { flags } = this.parse(List);
        let { show } = flags;
        const table = new cli_table_1.default({
            head: [
                chalk_1.default.blueBright.bold('#'),
                chalk_1.default.blueBright.bold('Alias'),
                chalk_1.default.blueBright.bold('Login'),
                chalk_1.default.blueBright.bold('Email'),
                chalk_1.default.blueBright.bold('Password'),
            ],
        });
        const passwords = controllers_1.default.list();
        let answers;
        if (show) {
            answers = await inquirer_1.prompt([{
                    name: 'confirm',
                    type: 'confirm',
                    message: () => `Print all passwords as ${chalk_1.default.red('clear text')}, OK?`,
                    default: false,
                }]);
            if (!answers.confirm)
                show = false;
        }
        for (let i = 0; i < passwords.length; i += 1) {
            const item = passwords[i];
            if (!show)
                item.password = '*'.repeat(16);
            table.push([i, item.alias, item.login, item.email, item.password]);
        }
        // cli.action.stop()
        this.log(table.toString());
    }
}
List.description = 'Print out all passwords';
List.aliases = ['list', 'la'];
List.flags = {
    show: command_1.flags.boolean({ char: 's' }),
};
exports.default = List;
