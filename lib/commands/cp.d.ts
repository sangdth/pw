import Command, { flags } from '@oclif/command';
export default class Copy extends Command {
    static description: string;
    static aliases: string[];
    static args: {
        name: string;
        required: boolean;
        description: string;
        hidden: boolean;
    }[];
    static flags: {
        index: flags.IOptionFlag<string | undefined>;
        alias: flags.IOptionFlag<string | undefined>;
    };
    run(): Promise<void>;
}
