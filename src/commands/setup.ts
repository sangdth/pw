import { Command } from '@oclif/command';
import chalk from 'chalk';
import clipboardy from 'clipboardy';
import { prompt } from 'inquirer';
import qr from 'qrcode';
import randomize from 'randomatic';
import { getPreferences, setPreferences } from '../api/database';

export default class Add extends Command {
  static description = 'Set up pw';

  static aliases = ['init', 'config'];

  async run() {
    const {
      salt,
      secret,
      name: oldName,
      login: oldLogin,
      email: oldEmail,
    } = getPreferences();

    const firstBlood = !salt && !secret;
    const { name, email, login, generate } = await prompt(
      [
        {
          name: 'name',
          type: 'input',
          message: 'What\'s your name?',
          default: oldName || '',
        },
        {
          name: 'login',
          type: 'input',
          message: 'Enter your default login:',
          default: oldLogin || '',
        },
        {
          name: 'email',
          type: 'input',
          message: 'Enter your default email:',
          default: (a: any) => oldEmail || a.login,
        },
        {
          name: 'generate',
          type: 'confirm',
          message: 'Generate salt and secret? This will wipe out all your current passwords!',
          default: firstBlood,
        },
      ],
    );

    const newPrefs = {
      email,
      login,
      name,
      salt: generate ? randomize('aA0', 32) : salt,
      secret: generate ? randomize('aA0', 64) : secret,
    };

    setPreferences(newPrefs);

    if (generate) {
      this.log(`${chalk.green('Use QR reader to setup salt and secret on your phone:')}`);
      const qrImage = await qr.toString(`${salt}:${secret}`, { type: 'terminal' });
      clipboardy.writeSync(`${salt}:${secret}`);
      this.log(qrImage);
    }

    this.log(`${chalk.green('Setup completed!')}`);
  }
}
