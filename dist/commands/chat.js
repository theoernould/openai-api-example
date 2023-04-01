import { colors, colorText } from "../services/utils";
import { mode, openai } from "../app";
import { Modes } from "../enums/modes";
const conversationHistory = [];
const model = "gpt-3.5-turbo";
export async function handleChat(input) {
    console.log(colorText(`Mode Chat activated !`, colors.blue));
    mode.state = Modes.Chat;
    await chat(input);
}
export async function chat(input) {
    if (input != "") {
        const userMsg = {
            role: "user",
            content: input
        };
        const res = await openai.createChatCompletion({
            model,
            messages: [...conversationHistory, userMsg]
        });
        const iaResponseMsg = res.data.choices[0].message;
        conversationHistory.push(userMsg, iaResponseMsg);
        console.log(`${colorText("IA : ", colors.blue)}${iaResponseMsg.content}`);
    }
}
