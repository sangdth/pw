import { Command, flags } from '@oclif/command'
import chalk from 'chalk'
import * as inquirer from 'inquirer'
import passwordAPI from '../api/controllers'
const randomize = require('randomatic')

export default class Add extends Command {
    static description = 'Add new record'

    static aliases = ['create', 'new', 'generate']

    static args = [
        { name: 'alias' },
        { name: 'login' },
        { name: 'email' },
        { name: 'password' },
    ]

    static flags = {
        length: flags.string({ char: 'l' }),
        show: flags.boolean({ char: 's' }),
    }

    async run() {
        const { args, flags } = this.parse(Add)
        let { alias, login, email, password } = args
        const { length, show } = flags
        if (!email) {
            email = login
        }

        // if user does not enter any arg
        if (!alias) {
            let answers: any = await inquirer.prompt([
                { name: 'alias', type: 'input', message: 'Enter alias'},
                { name: 'login', type: 'input', message: 'Enter login', default: 'sangdth@gmail.com' },
                { name: 'email', type: 'input', message: 'Enter email', default: (a: any) => a.login },
                { name: 'auto', type: 'confirm', message: 'Auto generate password?', default: true },
                { 
                    name: 'password',
                    type: 'input',
                    message: 'Enter password',
                    when: (a: any) => {
                        if (a.auto) {
                            a.password = randomize('aA!', 16)
                            return false
                        }
                        return true
                    }
                }
            ])
            console.log(answers)
        }
    }
}
