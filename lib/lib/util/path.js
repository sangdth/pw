"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const xdgConfigPath = (file) => {
    const xdgConfigHome = process.env.XDG_CONFIG_HOME;
    if (xdgConfigHome) {
        const rcDir = path.join(xdgConfigHome, 'pw-cli');
        if (!fs.existsSync(rcDir)) {
            // fs.ensureDirSync(rcDir, 0o700)
            fs.ensureDirSync(rcDir);
        }
        return path.join(rcDir, file);
    }
};
const getPath = (file) => {
    return (process.env.PW_PATH ||
        xdgConfigPath(file) ||
        path.join(os.homedir(), '.pw-cli', file));
};
exports.getPath = getPath;
