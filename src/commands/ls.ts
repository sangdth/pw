import { Command, flags } from '@oclif/command'
import chalk from 'chalk'
import * as inquirer from 'inquirer'
const Table  = require('cli-table')
import passwordAPI from '../api/controllers'

export default class List extends Command {
    static description = 'Print out all passwords'

    static aliases = ['list', 'la']

    static flags = {
        show: flags.boolean({ char: 's' }),
    }

    async run() {
        const { flags } = this.parse(List)
        let { show } = flags

        const table = new Table({
              head: [
                chalk.blueBright.bold('#'),
                chalk.blueBright.bold('Alias'),
                chalk.blueBright.bold('Login'),
                chalk.blueBright.bold('Email'),
                chalk.blueBright.bold('Password'),
              ]
        })
        const passwords = passwordAPI.list()

        let answers: any
        if (show) {
            answers = await inquirer.prompt([{
                name: 'confirm',
                type: 'confirm',
                message: () => `Print all passwords as ${chalk.red('clear text')}, OK?`,
                default: false,
            }])

            if (!answers.confirm) show = false
        }

        for (let i = 0; i < passwords.length; i++) {
            const item = passwords[i]
            if (!show) item.password = '*'.repeat(16)
            table.push([i, item.alias, item.login, item.email, item.password])
        }
        this.log(table.toString())
    }
}
