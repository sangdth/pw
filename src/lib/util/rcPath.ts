import * as fs from 'fs-extra'
import * as os from 'os'
import * as path from 'path'

const xdgConfigPath = (file : any) => {
    const xdgConfigHome = process.env.XDG_CONFIG_HOME
    if (xdgConfigHome) {
        const rcDir = path.join(xdgConfigHome, 'pw')
        if (!fs.existsSync(rcDir)) {
            fs.ensureDirSync(rcDir, 0o700)
            // fs.ensureDirSync(rcDir)
        }
        return path.join(rcDir, file)
    }
}

// migration for 3.0.0-rc.7
// we introduced a change storing .vuerc in AppData, but the benefit isn't
// really obvious so we are reverting it to keep consistency across OSes
const migrateWindowsConfigPath = (file : any) => {
    if (process.platform !== 'win32') {
        return
    }
    const appData = process.env.APPDATA
    if (appData) {
        const rcDir = path.join(appData, 'vue')
        const rcFile = path.join(rcDir, file)
        const properRcFile = path.join(os.homedir(), file)
        if (fs.existsSync(rcFile)) {
            try {
                if (fs.existsSync(properRcFile)) {
                    fs.removeSync(rcFile)
                } else {
                    fs.moveSync(rcFile, properRcFile)
                }
            } catch (e) {}
        }
    }
}

const getRcPath = (file : any) => {
    migrateWindowsConfigPath(file)
    return (
        process.env.VUE_CLI_CONFIG_PATH ||
        xdgConfigPath(file) ||
        path.join(os.homedir(), file)
    )
}

export default getRcPath
