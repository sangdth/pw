import Command from '@oclif/command';
export default class List extends Command {
    static description: string;
    static aliases: string[];
    static flags: {
        show: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
