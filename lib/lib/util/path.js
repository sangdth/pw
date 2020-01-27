"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs-extra"));
const os = tslib_1.__importStar(require("os"));
const path = tslib_1.__importStar(require("path"));
const template = '{ "container": [] }';
const options = {
    encoding: 'utf-8',
};
exports.getPath = (file) => {
    const xdgConfigHome = process.env.XDG_CONFIG_HOME;
    let pwDir = '';
    // if user has XDG config foler, use it
    if (xdgConfigHome) {
        pwDir = path.join(xdgConfigHome, 'pw-cli');
        // else, use the home directory
    }
    else {
        pwDir = path.join(os.homedir(), '.pw-cli');
    }
    const pwFile = path.join(pwDir, file);
    // make sure the folder exist, create it if needed
    if (!fs.pathExistsSync(pwFile)) {
        fs.ensureDirSync(pwDir);
        // create the file, because the it is not exist
        fs.writeFileSync(pwFile, template, options);
    }
    return pwFile;
};
