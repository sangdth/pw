interface Password {
    email: string;
    password: string;
    alias: string;
    login: string;
    used: number;
    created: number;
}
declare class PasswordAPI {
    private passwords;
    constructor();
    private savePasswords;
    add(email: string, password: string, alias?: string, login?: string): void;
    list(): Password[];
    findByIndex(index: number): Password;
    findByAlias(alias: string): Password[];
    findByEmail(email: string): Password[];
    removeByIndex(index: number): void;
    removeByAlias(alias: string): void;
}
declare const api: PasswordAPI;
export default api;
