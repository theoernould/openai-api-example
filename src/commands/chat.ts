import {colors, colorText} from "../services/utils";
import {mode, openai} from "../app";
import {Modes} from "../enums/modes";

const conversationHistory: any[] = [];
const model: string = "gpt-3.5-turbo";

export async function handleChat(input: string) {
    console.log(colorText(`Mode Chat activated !`, colors.blue));
    mode.state = Modes.Chat;
    await chat(input);
}

export async function chat(input: string) {
    if(input != "") {
        const userMsg = {
            role: "user",
            content: input
        }
        const res = await openai.createChatCompletion({
            model,
            messages: [...conversationHistory, userMsg]
        });
        const iaResponseMsg: any = res.data.choices[0].message;
        conversationHistory.push(userMsg, iaResponseMsg);
        console.log(`${colorText("IA : ", colors.blue)}${iaResponseMsg.content}`);
    }
}