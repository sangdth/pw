import Command from '@oclif/command';
// import chalk from 'chalk';
// import { prompt } from 'inquirer';
// import Table from 'cli-table';
import pw from '../api/controllers';

export default class Remove extends Command {
  static description = 'Remove a record';

  static aliases = ['remove', 'delete', 'del'];

  static args = [
    {
      name: 'aliases',
      required: false,
      description: 'The alias of password item, you can use comma-separated.',
      hidden: false,
      // parse: input => 'output',
      // options: ['a', 'b'],
    },
  ];

  async run() {
    const { args } = this.parse(Remove);

    if (Object.keys(args).length) {
      // If user omitted flags, we use args
      const { aliases } = args;
      aliases.split(',').forEach((alias: string) => pw.removeByAlias(alias));
      this.log('Deleted successful!');
    }
  }
}
