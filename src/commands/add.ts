import chalk from 'chalk';
import clipboardy from 'clipboardy';
import randomize from 'randomatic';
import { Command, flags } from '@oclif/command';
import { prompt } from 'inquirer';
import passwordAPI from '../api/controllers';
import { getPreferences } from '../api/database';

export default class Add extends Command {
  static description = 'Add new record';

  static aliases = ['create', 'new', 'generate'];

  static args = [
    {
      name: 'alias',
      required: true,
      description: 'The alias (name) for password.',
      hidden: false,
    },
  ];

  static flags = {
    auto: flags.boolean({ char: 'a' }),
  };

  async run() {
    const {
      args: { alias },
      flags: { auto },
    } = this.parse(Add);

    const { login, email } = getPreferences();

    const input = {
      alias,
      login,
      email,
      password: randomize('aA0!', 16),
    };
    // if user does not enter any arg
    if (auto) {
      clipboardy.writeSync(input.password);
      passwordAPI.add({ ...input });
    } else {
      const answers = await prompt(
        [
          {
            name: 'alias',
            type: 'input',
            message: 'Enter alias',
            default: alias,
          },
          {
            name: 'email',
            type: 'input',
            message: 'Enter email',
            default: email,
          },
          {
            name: 'login',
            type: 'input',
            message: 'Enter login',
            default: (a: any) => login || a.email.split('@')[0],
          },
          {
            name: 'auto',
            type: 'confirm',
            message: 'Auto generate password?',
            default: true,
          },
          {
            name: 'password',
            type: 'password',
            mask: '*',
            message: 'Enter password',
            when: (current: any) => {
              if (current.auto) {
                return false;
              }
              return true;
            },
          },
        ],
      );
      const password = answers.auto ? input.password : answers.password;
      clipboardy.writeSync(password);
      passwordAPI.add({ ...answers, password });
    }
    this.log(`${chalk.green('Created new item!')}`);
  }
}
