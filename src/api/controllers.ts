import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
const randomize = require('randomatic')

const pwFile = path.join(os.homedir(), '.pw-cli', 'db.json')

interface Password {
    email: string
    password: string
    alias: string
    login: string
    used: number
    created: number
}

class PasswordAPI {
    private passwords : Password[] = []

    constructor () {
        // make folder and file for the first run
        if (!fs.existsSync(path.dirname(pwFile))) {
            fs.mkdirSync(path.dirname(pwFile))
            fs.writeFileSync(pwFile, "[]", { encoding: 'utf-8' })
        }
        this.passwords = JSON.parse(fs.readFileSync(pwFile, { encoding: 'utf-8' }))
    }

    private savePasswords () {
        const data = JSON.stringify(this.passwords)
        fs.writeFileSync(pwFile, data, { encoding: 'utf-8' })
    }

    add (email : string, password : string, alias? : string, login? : string) {
        alias = alias  || ''
        login = login || ''
        const used = 0
        const created = Date.now()
        const found = this.passwords.find(o => o.alias === alias)
        if (found) { alias += randomize('a', 3) }
        const newPassword : Password = { email, password, alias, login, used, created }
        this.passwords.push(newPassword)
        this.savePasswords()
    }

    list () {
        return this.passwords
    }

    findByIndex (index : number) {
        return this.passwords[index]
    }

    findByAlias (alias : string) {
        return this.passwords.filter(e => e.alias.toLowerCase().includes(alias))
    }

    findByEmail (email : string) {
        return this.passwords.filter(e => e.email.toLowerCase().includes(email))
    }

    removeByIndex (index : number) {
        this.passwords.splice(index, 1)
        this.savePasswords()
    }

    removeByAlias (alias : string) {
        const index = this.passwords.findIndex(e => e.alias === alias)
        this.passwords.splice(index, 1)
        this.savePasswords()
    }
}

const api = new PasswordAPI
export default api
