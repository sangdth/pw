import Command, { flags } from '@oclif/command';
import chalk from 'chalk';
import { prompt } from 'inquirer';
import Table from 'cli-table';
import passwordAPI from '../api/controllers';

export default class Remove extends Command {
  static description = 'Remove a record';

  static aliases = ['remove', 'delete', 'del'];

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

  static flags = {
    index: flags.string({ char: 'i' }),
    alias: flags.string({ char: 'a' }),
  };

  async run() {
    const { args, flags } = this.parse(Remove);

    if (Object.keys(flags).length) {
      const { index, alias } = flags;
      if (index) {
        const arr = index.split(',');
        if (arr.length >= 1) {
          const answers: any = await prompt([{
            type: 'confirm',
            name: 'confirm',
            message: () => 'Permanently delete indexes. Are you sure?',
            default: false,
          }]);

          if (answers.confirm) {
            const passwords = passwordAPI.list();
            const ids = arr.map((i: any) => passwords[i].id);
            for (let i = 0; i < ids.length; i++) {
              passwordAPI.removeById(ids[i]);
            }
            this.log('Deleted successful!');
          }
        }
      }

      if (alias) {
        const table = new Table({
          head: [
            chalk.blueBright.bold('#'),
            chalk.blueBright.bold('Alias'),
            chalk.blueBright.bold('Login'),
            chalk.blueBright.bold('Email'),
            chalk.blueBright.bold('Password'),
          ],
        });

        const passwords = passwordAPI.findByAlias(alias);
        for (let i = 0; i < passwords.length; i++) {
          const item = passwords[i];
          table.push([i, item.alias, item.login, item.email, item.password]);
        }

        if (passwords.length >= 2) {
          this.log(table.toString());
          const answers: any = await prompt([
            { name: 'position', type: 'input', message: 'Select item to remove' },
            {
              name: 'confirm',
              type: 'confirm',
              message: (a: any) => `Permanent delete ${chalk.red.bold(passwords[a.position].alias)}. Are you sure?`,
              default: false,
            },
          ]);

          if (answers.confirm) {
            passwordAPI.removeByAlias(passwords[answers.position].alias);
            this.log('Deleted successful!');
          }
        }
        if (passwords.length === 1) {
          const answers: any = await prompt([
            {
              type: 'confirm',
              name: 'confirm',
              message: () => `Permanently delete ${chalk.red.bold(passwords[0].alias)}. Are you sure?`,
              default: false,
            },
          ]);

          if (answers.confirm) {
            passwordAPI.removeByAlias(passwords[0].alias);
            this.log('Deleted successful!');
          }
        }
      }
    }

    if (Object.keys(args).length) {
      // If user omitted flags, we use args
      const { alias } = args;
      passwordAPI.removeByAlias(alias);
      this.log('Deleted successful!');
    }
  }
}
