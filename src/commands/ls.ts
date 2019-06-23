import Command, { flags } from '@oclif/command'
// import cli from 'cli-ux'
import chalk from 'chalk'
import { prompt } from 'inquirer'
import Table from 'cli-table';
import passwordAPI from '../api/controllers'

export default class List extends Command {
    static description = 'Print out all passwords'

    static aliases = ['list', 'la']

    static flags = {
      show: flags.boolean({char: 's'}),
    }

  async run() {
  	// cli.action.start('starting a process')
      const { flags } = this.parse(List)
      let { show } = flags

      const table = new Table({
        head: [
          chalk.blueBright.bold('#'),
          chalk.blueBright.bold('Alias'),
          chalk.blueBright.bold('Login'),
          chalk.blueBright.bold('Email'),
          chalk.blueBright.bold('Password'),
        ],
      })

      const passwords = passwordAPI.list()

      let answers: any
      if (show) {
        answers = await prompt([{
          name: 'confirm',
          type: 'confirm',
          message: () => `Print all passwords as ${chalk.red('clear text')}, OK?`,
          default: false,
        }])

        if (!answers.confirm) show = false
      }

      for (let i = 0; i < passwords.length; i += 1) {
        const item = passwords[i]
        if (!show) item.password = '*'.repeat(16)
        table.push([i, item.alias, item.login, item.email, item.password])
      }
    // cli.action.stop()
    this.log(table.toString())
    }
}
