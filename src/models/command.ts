export class Command {
    name: string;
    title: string;
    handler: (input: string) => void;

    constructor(name: string, title: string, handler: (input: string) => void) {
        this.name = name;
        this.title = title;
        this.handler = handler;
    }
}