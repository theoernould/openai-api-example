import { config } from 'dotenv';
config();
import { Configuration, OpenAIApi } from "openai";
// @ts-ignore
import readline from "readline";
import { colors, colorText } from "./services/utils";
import { printCommands } from "./commands/commands";
import { commandsList } from "./enums/commandsList";
import { Modes } from "./enums/modes";
import { chat } from "./commands/chat";
import { generateImage } from "./commands/image";
export const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}));
const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
export const commandsPrefix = "/";
export let mode = {
    state: Modes.Chat
};
console.clear();
console.log(colorText("Welcome to the OpenAI CLI !", colors.blue));
printCommands();
userInterface.prompt();
userInterface.on('line', async (input) => {
    if (input.startsWith(commandsPrefix)) {
        // get command name and input after command name like /chat hello je veux hello
        const elements = input.split(" ");
        const commandName = elements[0].replace(commandsPrefix, "");
        const commandInput = elements.slice(1).join(" ");
        const command = commandsList.find(command => command.name === commandName);
        if (command) {
            await command.handler(commandInput);
        }
    }
    else {
        switch (mode.state) {
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
