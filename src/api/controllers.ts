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
    private iv = Buffer.alloc(16, 0)
    private masterPass = 'lorem123'

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

    private encrypt (pass : string) {
        const key = crypto.scryptSync(this.masterPass, 'salt', 24)
        const cipher = crypto.createCipheriv('aes192', key, this.iv)

        let encrypted = ''

        cipher.on('readable', () => {
            let chunk
            while (null !== (chunk = cipher.read())) {
                encrypted += chunk.toString('hex');
            }
        })

        cipher.write(pass);
        cipher.end();

        cipher.on('end', () => {
            pass = encrypted
            // console.log(typeof encrypted, encrypted);
        });

        // return encrypted
    }

    private decrypt (encryptedPass : string) {
        const key = crypto.scryptSync(this.masterPass, 'salt', 24)
        const decipher = crypto.createDecipheriv('aes192', key, this.iv)

        let decrypted = ''

        decipher.on('readable', () => {
            let chunk
            while (null !== (chunk = decipher.read())) {
                decrypted += chunk.toString('utf8');
            }
        })

        decipher.on('end', () => {
            // console.log(decrypted);
        });

        // Encrypted with same algorithm, key and iv.
        decipher.write(encryptedPass, 'hex');
        decipher.end();
    }

    add (email : string, password : string, alias? : string, login? : string) {
        alias = alias  || ''
        login = login || ''
        const used = 0
        const created = Date.now()
        const found = this.passwords.find(o => o.alias === alias)
        if (found) { alias += randomize('a', 3) }
        const id = randomize('aA0', 16)
        const newPassword : Password = { id, email, password, alias, login, used, created }
        const encrypted = this.encrypt(password)
        // const decrypted = this.decrypt(encrypted)

        console.log('test enccrypt: ', password, encrypted)

        this.passwords.push(newPassword)
        this.savePasswords()
    }

    list () {
        return this.passwords
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
