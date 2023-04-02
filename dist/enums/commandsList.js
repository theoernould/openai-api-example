import { handleChat } from "../commands/chat";
import { handleImage } from "../commands/image";
import { printCommands } from "../commands/commands";
export const commandsList = [
    {
        name: "chat",
        title: "Chat with IA",
        handler: handleChat
    },
    {
        name: "image",
        title: "Generate an image",
        handler: handleImage
    },
    {
        name: "commands",
        title: "Show commands",
        handler: printCommands
    },
    {
        name: "clear",
        title: "Clear console",
        handler: () => console.clear()
    }
];
