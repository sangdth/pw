import Command from '@oclif/command';
import Table from 'cli-table';
import chalk from 'chalk';
import clipboardy from 'clipboardy';
import moment from 'moment';
import { prompt } from 'inquirer';
import passwordAPI from '../api/controllers';

export default class Copy extends Command {
  static description = 'Copy a record';

  static aliases = ['copy'];

  static args = [
    {
      name: 'alias',
      required: false,
      description: 'If flags are omitted, first arg will become alias',
      hidden: false,
      // parse: input => 'output',
      // options: ['a', 'b'],
    },
  ];

  async run() {
    const { args: { alias } } = this.parse(Copy);

    if (alias) {
      const results = passwordAPI.search(alias);

      if (results.length === 1) {
        const password = passwordAPI.getPassword(results[0].id);
        clipboardy.writeSync(password);
        this.log(`Copied ${chalk.green(results[0].alias)}'s password into clipboard!`);
      } else if (results.length >= 2) {
        const table = new Table({
          head: [
            chalk.blueBright.bold('#'),
            chalk.blueBright.bold('Alias'),
            chalk.blueBright.bold('Login'),
            chalk.blueBright.bold('Email'),
            chalk.blueBright.bold('Created'),
          ],
        });
        for (let i = 0; i < results.length; i++) {
          const item = results[i];
          table.push([i, item.alias, item.login, item.email, moment(item.created).fromNow()]);
        }
        this.log(table.toString());
        const answers: any = await prompt(
          [
            {
              name: 'position',
              type: 'input',
              message: 'Select item to copy',
              default: 0,
            },
          ],
        );

        if (answers.position !== undefined) {
          const selected = results[answers.position];
          const password = passwordAPI.getPassword(selected.id);
          clipboardy.writeSync(password);
          this.log(`Copied ${chalk.green(selected.alias)}'s password into clipboard!`);
        }
      } else {
        this.log(`Can't find password with alias: ${chalk.green(alias)}`);
      }
    }
  }
}
