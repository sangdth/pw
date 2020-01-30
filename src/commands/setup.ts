import { Command } from '@oclif/command';
import chalk from 'chalk';
// import clipboardy from 'clipboardy';
import { prompt } from 'inquirer';
// import randomize from 'randomatic';
// import passwordAPI from '../api/controllers';
import { setPreferences } from '../api/database';

export default class Add extends Command {
  static description = 'Set up pw';

  static aliases = ['init', 'config'];

  async run() {
    const answers = await prompt(
      [
        {
          name: 'name',
          type: 'input',
          message: 'What\'s your name?',
          default: '',
        },
        {
          name: 'login',
          type: 'input',
          message: 'Enter your default login:',
          default: '',
        },
        {
          name: 'email',
          type: 'input',
          message: 'Enter your default email:',
          default: (a: any) => a.login,
        },
        /*
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
        */
      ],
    );
    setPreferences({ ...answers });
    this.log(`${chalk.green('Setup completed!')}`);
  }
}
