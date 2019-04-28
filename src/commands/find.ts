import { Command, flags } from '@oclif/command'
import chalk from 'chalk'
const Table  = require('cli-table')
import passwordAPI from '../api/controllers'

export default class Find extends Command {
    static description = 'Get one or more specific passwords'

    static aliases = ['get', 'select']

    static flags = {
        index: flags.string({ char: 'i' }),
        alias: flags.string({ char: 'a' }),
        email: flags.string({ char: 'e' }),
    }

    async run() {
        const { flags } = this.parse(Find)
        const { index, alias, email } = flags
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
        if (index) {
            const found = passwordAPI.findByIndex(parseInt(index, 10))
            table.push([0, found.alias, found.login, found.email, found.password])
            this.log(table.toString())
        }
        if (alias) {
            const passwords = passwordAPI.findByAlias(alias)
            for (let i = 0; i < passwords.length; i++) {
                const item = passwords[i]
                table.push([ i, item.alias, item.login, item.email, item.password ])
            }
            this.log(table.toString())
        }
        if (email) {
            const passwords = passwordAPI.findByEmail(email)
            for (let i = 0; i < passwords.length; i++) {
                const item = passwords[i]
                table.push([ i, item.alias, item.login, item.email, item.password ])
            }
            this.log(table.toString())
        }
    }
}
