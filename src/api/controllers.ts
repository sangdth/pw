import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import * as crypto from 'crypto'
import * as inquirer from 'inquirer'
import chalk from 'chalk'
const randomize = require('randomatic')
const pwFile = path.join(os.homedir(), '.pw-cli', 'db.json')

interface Password {
    id: string
    email: string
    password: string
    alias: string
    login: string
    used: number
    created: number
}

class PasswordAPI {
    private passwords : Password[] = []
    private iv = Buffer.alloc(16, 0) // make it dynamic later
    private masterPass = 'lorem_pass'
    private salt = 'random_salt'

    constructor () {
        // make folder and file for the first run
        if (!fs.existsSync(path.dirname(pwFile))) {
            fs.mkdirSync(path.dirname(pwFile))
            fs.writeFileSync(pwFile, "[]", { encoding: 'utf-8' })
        }

        const passwords = JSON.parse(fs.readFileSync(pwFile, { encoding: 'utf-8' }))
        this.passwords = passwords.map((o : any) => {
            o.password = this.decrypt(o.password)
            return o
        })
    }

    private savePasswords () {
        const passwords = this.passwords.map((o : any) => {
            o.password = this.encrypt(o.password)
            return o
        })
        const data = JSON.stringify(passwords)
        fs.writeFileSync(pwFile, data, { encoding: 'utf-8' })
    }

    private encrypt (pass : string) {
        const key = crypto.scryptSync(this.masterPass, this.salt, 24)
        const cipher = crypto.createCipheriv('aes192', key, this.iv)
        let encrypted = cipher.update(pass, 'utf8', 'hex')
        encrypted += cipher.final('hex');
        return encrypted
    }

    private decrypt (encryptedPass : string) {
        const key = crypto.scryptSync(this.masterPass, this.salt, 24)
        const decipher = crypto.createDecipheriv('aes192', key, this.iv)
        let decrypted = decipher.update(encryptedPass, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted
    }

    add (email : string, password : string, alias? : string, login? : string) {
        alias = alias  || ''
        login = login || ''
        const found = this.passwords.find(o => o.alias === alias)
        if (found) { alias += '-' + randomize('a', 3) }
        const newPassword : Password = { 
            id: randomize('aA0', 16),
            email, 
            password,
            alias,
            login,
            used: 0,
            created: Date.now()
        }
        this.passwords.push(newPassword)
        this.savePasswords()
    }

    list () {
        return this.passwords
    }

    findByIndex(index : number) {
        return this.passwords[index]
    }

    findById (id : string) {
        return this.passwords.find(e => e.id === id)
    }

    findByAlias (alias : string) {
        return this.passwords.filter(e => e.alias.toLowerCase().includes(alias))
    }

    findByEmail (email : string) {
        return this.passwords.filter(e => e.email.toLowerCase().includes(email))
    }

    removeById (id : string) {
        this.passwords.splice(this.passwords.findIndex(e => e.id === id), 1)
        this.savePasswords()
    }

    removeByAlias (alias : string) {
        this.passwords.splice(this.passwords.findIndex(e => e.alias === alias), 1)
        this.savePasswords()
    }
}

const api = new PasswordAPI
export default api
