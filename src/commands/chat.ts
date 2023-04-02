import {
    colors,
    colorText,
    firstLetterUpperCase,
    hideLoader,
    printFormattedMessage,
    showLoader
} from "../services/utils";
import {mode, openai} from "../app";
import {Modes} from "../enums/modes";
import {ChatCompletionRequestMessage, ChatCompletionResponseMessage} from "openai";

const conversationHistory: {
    date: Date,
    message: ChatCompletionRequestMessage | ChatCompletionResponseMessage
}[] = [];
const model: string = "gpt-3.5-turbo";

export async function handleChat(input: string) {
    console.clear();
    console.log(colorText(`Discuss with IA !`, colors.blue));
    conversationHistory.forEach((message: any) => printMessage(message));
    mode.state = Modes.Chat;
}

function printMessage(message: any) {
    const date: Date = message.date;
    const role: string = message.message.role;
    const content: string = message.message.content;
    printFormattedMessage(date, role, content);
}

export async function chat(input: string) {
    if(input.trim() != "") {
        showLoader();
        const userMsg: ChatCompletionRequestMessage = {
            role: "user",
            content: input
        }
        const lastMessages: ChatCompletionRequestMessage[] = conversationHistory.map((message) => message.message as ChatCompletionRequestMessage);
        const res = await openai.createChatCompletion({
            model,
            messages: [...lastMessages, userMsg]
        });
        const iaResponseMsg: any = {
            date: new Date(),
            message: res.data.choices[0].message
        };
        const userResponseMsg: any = {
            date: new Date(),
            message: userMsg
        }
        conversationHistory.push(userResponseMsg, iaResponseMsg);
        hideLoader();
        printMessage(iaResponseMsg);
    }
}