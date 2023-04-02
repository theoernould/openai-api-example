import {config} from 'dotenv';
import {Configuration, OpenAIApi} from "openai";
import readline from "readline";
import {Command} from "./models/command";
import {clearUserInput, colors, colorText, printFormattedMessage} from "./services/utils";
import {printCommands} from "./commands/commands";
import {commandsList} from "./enums/commandsList";
import {Modes} from "./enums/modes";
import {chat} from "./commands/chat";
import {generateImage} from "./commands/image";

config();

export const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}));

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const commandsPrefix: string = "/";
export let mode = {
    state: Modes.None
}

console.clear();

console.log(colorText("Welcome to the OpenAI CLI !", colors.blue));

printCommands();

userInterface.prompt();
userInterface.on('line', async (input: string) => {
    clearUserInput();
    printFormattedMessage(new Date(), "User", input);
    if (input.startsWith(commandsPrefix)) {
        // get command name and input after command name like /chat hello je veux hello
        const elements: string[] = input.split(" ");
        const commandName: string = elements[0].replace(commandsPrefix, "");
        const commandInput: string = elements.slice(1).join(" ");
        const command: Command = commandsList.find(command => command.name === commandName) as Command;
        if (command) {
            command.handler(commandInput);
        }
    } else {
        switch (mode.state) {
            case Modes.None:
                break;
            case Modes.Chat:
                await chat(input);
                break;
            case Modes.Image:
                await generateImage(input);
                break;
        }
    }
    userInterface.prompt();
});