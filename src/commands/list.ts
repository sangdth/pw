import { Command, flags } from '@oclif/command'
import chalk from 'chalk'
const Table  = require('cli-table')
import passwordAPI from '../api/controllers'

export default class List extends Command {
    static description = 'Print out all passwords'

    static aliases = ['list', 'ls']

    async run() {
        const table = new Table({
              head: [
                chalk.blueBright('#'),
                chalk.blueBright('Alias'),
                chalk.blueBright('Login'),
                chalk.blueBright('Email'),
                chalk.blueBright('Password'),
              ]
        })
        const passwords = passwordAPI.list()
        for (let i = 0; i < passwords.length; i++) {
            const item = passwords[i]
            table.push([ i, item.alias, item.login, item.email, item.password ])
        }
        this.log(table.toString())
    }
}
