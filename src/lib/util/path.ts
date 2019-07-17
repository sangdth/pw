import * as fs from 'fs-extra'
import * as os from 'os'
import * as path from 'path'

const xdgConfigPath = (file : any) => {
  const xdgConfigHome = process.env.XDG_CONFIG_HOME
  // it's undefined on macOS.
  // TODO: Make the check here, for .config folder.
  // if not found, try to find .pw-cli
  // if not found, try to create .pw-cli folder.
  if (xdgConfigHome) {
    const rcDir = path.join(xdgConfigHome, 'pw-cli')
    if (!fs.existsSync(rcDir)) {
      // fs.ensureDirSync(rcDir, 0o700)
      fs.ensureDirSync(rcDir)
    }
    return path.join(rcDir, file)
  }
}

// TODO: Check file db.json,
// if not found, create new file with pre-defined
// content, with "passwords": []
const getPath = (file : any) => {
  return (
    process.env.PW_PATH ||
    xdgConfigPath(file) ||
    path.join(os.homedir(), '.pw-cli', file)
  )
}

export { getPath }
