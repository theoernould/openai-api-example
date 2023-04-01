export class Command {
    name;
    title;
    handler;
    constructor(name, title, handler) {
        this.name = name;
        this.title = title;
        this.handler = handler;
    }
}
