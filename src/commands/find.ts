import Command from '@oclif/command';
import chalk from 'chalk';
import Table from 'cli-table';
import pw from '../api/controllers';

export default class Find extends Command {
  static description = 'Get one or more specific passwords';

  static aliases = ['get', 'select'];

  static args = [
    { name: 'input' },
  ];

  async run() {
    const { args: { input } } = this.parse(Find);
    const table = new Table({
      head: [
        chalk.blueBright.bold('#'),
        chalk.blueBright.bold('Alias'),
        chalk.blueBright.bold('Login'),
        chalk.blueBright.bold('Email'),
        chalk.blueBright.bold('Password'),
      ],
    });

    // TODO: Make sure flags have affect here
    if (input) {
      const results = pw.search(input);

      results.forEach((o: Password, i: number) => {
        table.push([i, o.alias, o.login, o.email, `**********${o.password.slice(-4)}`]);
      });

      this.log(table.toString());
    }
  }
}
