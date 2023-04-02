import { colors, colorText, hideLoader, printFormattedMessage, showLoader } from "../services/utils";
import { mode, openai } from "../app";
import { Modes } from "../enums/modes";
const conversationHistory = [];
const model = "gpt-3.5-turbo";
export async function handleChat(input) {
    console.clear();
    console.log(colorText(`Discuss with IA !`, colors.blue));
    conversationHistory.forEach((message) => printMessage(message));
    mode.state = Modes.Chat;
}
function printMessage(message) {
    const date = message.date;
    const role = message.message.role;
    const content = message.message.content;
    printFormattedMessage(date, role, content);
}
export async function chat(input) {
    if (input.trim() != "") {
        showLoader();
        const userMsg = {
            role: "user",
            content: input
        };
        const lastMessages = conversationHistory.map((message) => message.message);
        const res = await openai.createChatCompletion({
            model,
            messages: [...lastMessages, userMsg]
        });
        const iaResponseMsg = {
            date: new Date(),
            message: res.data.choices[0].message
        };
        const userResponseMsg = {
            date: new Date(),
            message: userMsg
        };
        conversationHistory.push(userResponseMsg, iaResponseMsg);
        hideLoader();
        printMessage(iaResponseMsg);
    }
}
