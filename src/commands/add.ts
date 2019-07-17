import { Command, flags } from '@oclif/command'
// import chalk from 'chalk'
import clipboardy from 'clipboardy';
import { prompt } from 'inquirer'
import randomize from 'randomatic'
import passwordAPI from '../api/controllers'

export default class Add extends Command {
  static description = 'Add new record'

  static aliases = ['create', 'new', 'generate']

  // consider change it to flags
  static args = [
    { name: 'alias' },
    { name: 'login' },
    { name: 'email' },
    { name: 'password' },
  ]

  static flags = {
    strength: flags.integer({ char: 's' }),
  }

  async run() {
    const { args, flags } = this.parse(Add)
    let { alias, login, email, password } = args
    const { strength } = flags
    // if user does not enter any arg
    if (!login) {
      let answers: any = await prompt(
        [
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
            default: (a: any) => a.login
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
            when: (answer: any) => {
              if (answer.auto) {
                answer.password = randomize('aA0!', 16)
                return false
              }
              return true
            }
          }
        ]
      )

      alias = answers.alias
      email = answers.email
      login = answers.login
      password = answers.password
    }

    if (!email) {
      email = login
    }

    if (!password) {
      if (strength) {
        password = randomize('aA!', strength)
      } else {
        password = randomize('aA!', 16)
      }
      clipboardy.writeSync(password);
    }
    passwordAPI.add(email, password, alias, login)
  }
}
