import Command, { flags } from '@oclif/command';
import moment from 'moment';
// import randomize from 'randomatic'
// import cli from 'cli-ux'
import chalk from 'chalk';
// import { prompt } from 'inquirer';
import Table from 'cli-table';
import passwordAPI from '../api/controllers';

export default class List extends Command {
  static description = 'Print out all passwords';

  static aliases = ['list', 'la'];

  static flags = {
    show: flags.boolean({ char: 's' }),
  };

  async run() {
    // cli.action.start('starting a process')
    // const { flags } = this.parse(List);
    // const { show } = flags;

    // TODO: Make the row with password older than 6 months red
    const table = new Table({
      head: [
        chalk.blueBright.bold('#'),
        chalk.blueBright.bold('Alias'),
        chalk.blueBright.bold('Login'),
        chalk.blueBright.bold('Email'),
        chalk.blueBright.bold('Created'),
      ],
    });

    const results = passwordAPI.list();

    for (let i = 0; i < results.length; i += 1) {
      const item = results[i];
      table.push([i, item.alias, item.login, item.email, moment(item.created).fromNow()]);
    }
    // TODO: Make pagination or load more feature, with limit rows
    this.log(table.toString());
  }
}
