import Command, { flags } from '@oclif/command';
import { prompt } from 'inquirer'
import chalk from 'chalk';
import Table from 'cli-table';
import clipboardy from 'clipboardy';
import passwordAPI from '../api/controllers';

export default class Copy extends Command {
  static description = 'Copy a record'

  static aliases = ['copy']

	static args = [
		{
    	name: 'alias',
    	required: false,
    	description: 'If flags are omitted, first arg will become alias',
    	hidden: false,
    	// parse: input => 'output',
      // options: ['a', 'b'],
  	}
	]

    static flags = {
      index: flags.string({ char: 'i' }),
      alias: flags.string({ char: 'a' }),
    }

    async run() {
      const { args, flags } = this.parse(Copy);

      const table = new Table({
        head: [
          chalk.blueBright.bold('#'),
          chalk.blueBright.bold('Alias'),
          chalk.blueBright.bold('Login'),
          chalk.blueBright.bold('Email'),
          chalk.blueBright.bold('Password'),
        ],
      });

			if (Object.keys(args).length) {
				const { alias }	 = args;
				if (alias) {
        	const passwords = passwordAPI.findByAlias(alias);
        	for (let i = 0; i < passwords.length; i++) {
          	const item = passwords[i];
          	table.push([i, item.alias, item.login, item.email, '*'.repeat(16)]);
        	}
					
        	if (passwords.length >= 2) {
          	this.log(table.toString());
          	const answers: any = await prompt(
            	[
              	{
                	name: 'position',
                	type: 'input',
                	message: 'Select item to copy',
                	default: 0,
              	},
            	]
          	);

          	if (answers.position) {
            	clipboardy.writeSync(passwords[answers.position].password);
            	this.log(`Copied ${chalk.green(passwords[answers.position].alias)} into clipboard!`);
          	}
        	}

        	if (passwords.length === 1) {
          	clipboardy.writeSync(passwords[0].password);
          	this.log(`Copied ${chalk.green(passwords[0].alias)} into clipboard!`);
        	}
				}
			}

      if (Object.keys(flags).length) {
      	const { index, alias } = flags;
      	if (alias) {

        	const passwords = passwordAPI.findByAlias(alias);
        	for (let i = 0; i < passwords.length; i++) {
          	const item = passwords[i];
          	table.push([i, item.alias, item.login, item.email, '*'.repeat(16)]);
        	}

        	if (passwords.length >= 2) {
          	this.log(table.toString());
          	const answers: any = await prompt(
            	[
              	{
                	name: 'position',
                	type: 'input',
                	message: 'Select item to copy',
                	default: 0,
              	},
            	]
          	);

          	if (answers.position) {
            	clipboardy.writeSync(passwords[answers.position].password);
            	this.log(`Copied ${chalk.green(passwords[answers.position].alias)} into clipboard!`);
          	}
        	}

        	if (passwords.length === 1) {
          	clipboardy.writeSync(passwords[0].password);
          	this.log(`Copied ${chalk.green(passwords[0].alias)} into clipboard!`);
        	}
      	}

    	

      	if (index) {
        	const passwords = passwordAPI.list();
        	const found = passwords[parseInt(index, 10)];
        	clipboardy.writeSync(found.password);
        	this.log(`Copied ${chalk.green(found.alias)} into clipboard!`);
      	}
      }
    }
}
