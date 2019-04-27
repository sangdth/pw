import { Command, flags } from '@oclif/command'
import chalk from 'chalk'
import * as inquirer from 'inquirer'
const Table  = require('cli-table')
const clipboardy = require('clipboardy')
import passwordAPI from '../api/controllers'

export default class Copy extends Command {
    static description = 'Copy a record'

    static aliases = ['copy']

    static flags = {
        index: flags.string({ char: 'i' }),
        alias: flags.string({ char: 'a' }),
        email: flags.string({ char: 'e' }),
    }

    async run() {
        const { flags } = this.parse(Copy)
        let { index, alias, email } = flags

        if (alias) {
            const table = new Table({
                  head: [
                    chalk.blueBright.bold('#'),
                    chalk.blueBright.bold('Alias'),
                    chalk.blueBright.bold('Login'),
                    chalk.blueBright.bold('Email'),
                    chalk.blueBright.bold('Password'),
                  ]
            })

            const passwords = passwordAPI.findByAlias(alias)
            for (let i = 0; i < passwords.length; i++) {
                const item = passwords[i]
                table.push([ i, item.alias, item.login, item.email, '*'.repeat(16) ])
            }

            if (passwords.length >= 2) {
                this.log(table.toString())
                let answers: any = await inquirer.prompt([
                    { name: 'position', type: 'input', message: 'Select item to copy', default: 0 },
                ])

                if (answers.position) {
                    clipboardy.writeSync(passwords[answers.position].password)
                    this.log(`Copied ${chalk.green(passwords[answers.position].alias)} into clipboard!`)
                }
            }

            if (passwords.length === 1) {
                clipboardy.writeSync(passwords[0].password)
                    this.log(`Copied ${chalk.green(passwords[0].alias)} into clipboard!`)
            }
        }

        if (index) {
            const found = passwordAPI.findByIndex(parseInt(index, 10))
            clipboardy.writeSync(found.password)
            this.log(`Copied ${chalk.green(found.alias)} into clipboard!`)
        }
    }
}
