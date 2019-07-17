"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = tslib_1.__importStar(require("@oclif/command"));
const keytar_1 = tslib_1.__importDefault(require("keytar"));
// import passwordAPI from '../api/controllers'
class List extends command_1.default {
    async run() {
        const result = await keytar_1.default.getPassword('google', 'google');
        console.log(result);
        /*
      // cli.action.start('starting a process')
      const { flags } = this.parse(List)
        let { show } = flags
  
        const table = new Table({
          head: [
            chalk.blueBright.bold('#'),
            chalk.blueBright.bold('Alias'),
            chalk.blueBright.bold('Login'),
            chalk.blueBright.bold('Email'),
            chalk.blueBright.bold('Password'),
          ],
        })
  
        const passwords = passwordAPI.list()
  
        let answers: any
        if (show) {
          answers = await prompt([{
            name: 'confirm',
            type: 'confirm',
            message: () => `Print all passwords as ${chalk.red('clear text')}, OK?`,
            default: false,
          }])
  
          if (!answers.confirm) show = false
        }
  
        for (let i = 0; i < passwords.length; i += 1) {
          const item = passwords[i]
          if (!show) item.password = '*'.repeat(16)
          table.push([i, item.alias, item.login, item.email, item.password])
        }
      // cli.action.stop()
      this.log(table.toString())
         */
    }
}
List.description = 'Print out all passwords';
List.aliases = ['list', 'la'];
List.flags = {
    show: command_1.flags.boolean({ char: 's' }),
};
exports.default = List;
