import {colors, colorText} from "../services/utils";
import {commandsList} from "../enums/commandsList";
import {commandsPrefix} from "../app";

export function printCommands() {
    console.log(colorText("\nCommands available :\n", colors.yellow));
    commandsList.forEach(command => {
        const coloredCommandName = colorText(`${commandsPrefix}${command.name}`, colors.cyan);
        console.log(`\t${coloredCommandName} : ${command.title}`);
    });
    console.log();
}