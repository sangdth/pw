interface Password {
    id: string;
    email: string;
    password: string;
    alias: string;
    login: string;
    used: number;
    created: number;
}
declare class PasswordAPI {
    private passwords;
    private iv;
    private masterPass;
    private salt;
    constructor();
    private savePasswords;
    private encrypt;
    private decrypt;
    add(email: string, password: string, alias?: string, login?: string): void;
    list(): Password[];
    findByIndex(index: number): Password;
    findById(id: string): Password | undefined;
    findByAlias(alias: string): Password[];
    findByEmail(email: string): Password[];
    removeById(id: string): void;
    removeByAlias(alias: string): void;
}
declare const api: PasswordAPI;
export default api;
