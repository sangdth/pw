import Command, { flags } from '@oclif/command';
import usb from 'usb';
import { prompt } from 'inquirer';
// import * as os from 'os';
// import moment from 'moment';
// import randomize from 'randomatic'
// import cli from 'cli-ux'
// import chalk from 'chalk';
// import { prompt } from 'inquirer';
// import Table from 'cli-table';
// import passwordAPI from '../api/controllers';

export default class Export extends Command {
  static description = 'Print out all passwords';

  static aliases = ['backup'];

  static flags = {
    show: flags.boolean({ char: 's' }),
  };

  async run() {
    const devices = usb.getDeviceList();

    const choices = devices.map((o) => {
      const { deviceDescriptor: { idVendor, idProduct } } = o;
      return `${idVendor}:${idProduct}`;
    });

    const answer = await prompt(
      [
        {
          name: 'deviceIds',
          type: 'list',
          message: 'Select USB:',
          default: '',
          choices,
        },
      ],
    );

    const ids = answer.deviceIds.split(':');
    const selected = usb.findByIds(ids[0], ids[1]);
    selected.open();
    this.log('Done.');
  }
}
