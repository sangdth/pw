declare class PasswordAPI {
    private passwords;
    private fuse;
    constructor();
    private encrypt;
    private decrypt;
    add(email: string, password: string, alias?: string, login?: string): void;
    list(): Password[];
    findByIndex(index: number): Password;
    findById(id: string): Password | undefined;
    findByAlias(alias: string): Password[];
    findByEmail(email: string): Password[];
    search(input: string): any;
    removeById(id: string): void;
    removeByAlias(alias: string): void;
}
declare const api: PasswordAPI;
export default api;
