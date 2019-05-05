import * as fs from 'fs-extra'
import * as os from 'os'
import * as path from 'path'

const xdgConfigPath = (file : any) => {
    const xdgConfigHome = process.env.XDG_CONFIG_HOME
    if (xdgConfigHome) {
        const rcDir = path.join(xdgConfigHome, 'pw-cli')
        if (!fs.existsSync(rcDir)) {
            // fs.ensureDirSync(rcDir, 0o700)
            fs.ensureDirSync(rcDir)
        }
        return path.join(rcDir, file)
    }
}

const getPath = (file : any) => {
    return (
        process.env.PW_PATH ||
        xdgConfigPath(file) ||
        path.join(os.homedir(), '.pw-cli', file)
    )
}

export { getPath }
