"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@oclif/command");
// import chalk from 'chalk'
const inquirer_1 = require("inquirer");
const randomatic_1 = tslib_1.__importDefault(require("randomatic"));
const controllers_1 = tslib_1.__importDefault(require("../api/controllers"));
class Add extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(Add);
        let { alias, login, email, password } = args;
        // const { length, show } = flags
        // if user does not enter any arg
        if (!login) {
            let answers = await inquirer_1.prompt([
                {
                    name: 'alias',
                    type: 'input',
                    message: 'Enter alias',
                    default: alias || ''
                },
                {
                    name: 'login',
                    type: 'input',
                    message: 'Enter login',
                    default: 'sangdth@gmail.com'
                },
                {
                    name: 'email',
                    type: 'input',
                    message: 'Enter email',
                    default: (a) => a.login
                },
                {
                    name: 'auto',
                    type: 'confirm',
                    message: 'Auto generate password?',
                    default: true
                },
                {
                    name: 'password',
                    type: 'password',
                    mask: '*',
                    message: 'Enter password',
                    when: (answer) => {
                        if (answer.auto) {
                            answer.password = randomatic_1.default('aA0!', 16);
                            return false;
                        }
                        return true;
                    }
                }
            ]);
            alias = answers.alias;
            email = answers.email;
            login = answers.login;
            password = answers.password;
        }
        if (!email) {
            email = login;
        }
        if (!password) {
            password = randomatic_1.default('aA!', 16);
        }
        controllers_1.default.add(email, password, alias, login);
    }
}
Add.description = 'Add new record';
Add.aliases = ['create', 'new', 'generate'];
Add.args = [
    { name: 'alias' },
    { name: 'login' },
    { name: 'email' },
    { name: 'password' },
];
Add.flags = {
    length: command_1.flags.string({ char: 'l' }),
    show: command_1.flags.boolean({ char: 's' }),
};
exports.default = Add;
