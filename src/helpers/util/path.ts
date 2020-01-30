import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import randomize from 'randomatic';

const template = {
  container: [],
  preferences: {
    salt: randomize('aA0', 32),
    master: '',
    email: '',
    login: '',
    name: '',
  },
};

const options = {
  encoding: 'utf-8',
};

export default (file: string) => {
  const xdgConfigHome = process.env.XDG_CONFIG_HOME;
  let pwDir = '';
  // if user has XDG config foler, use it
  if (xdgConfigHome) {
    pwDir = path.join(xdgConfigHome, 'pw-cli');
  // else, use the home directory
  } else {
    pwDir = path.join(os.homedir(), '.pw-cli');
  }
  const pwFile = path.join(pwDir, file);
  // make sure the folder exist, create it if needed
  if (!fs.pathExistsSync(pwFile)) {
    fs.ensureDirSync(pwDir);
    // create the file, because the it is not exist
    fs.writeFileSync(pwFile, JSON.stringify(template), options);
  }
  return pwFile;
};
