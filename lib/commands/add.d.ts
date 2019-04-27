import { Command, flags } from '@oclif/command';
export default class Add extends Command {
    static description: string;
    static aliases: string[];
    static args: {
        name: string;
    }[];
    static flags: {
        length: flags.IOptionFlag<string | undefined>;
        show: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
