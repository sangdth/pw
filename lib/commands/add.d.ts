import { Command } from '@oclif/command';
export default class Add extends Command {
    static description: string;
    static aliases: string[];
    static args: {
        name: string;
    }[];
    static flags: {
        strength: import("@oclif/parser/lib/flags").IOptionFlag<number | undefined>;
    };
    run(): Promise<void>;
}
