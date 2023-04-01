import { mode, openai } from "../app";
import { colors, colorText } from "../services/utils";
import { Modes } from "../enums/modes";
export async function handleImage(input) {
    console.log(colorText(`Mode Image activated !`, colors.blue));
    mode.state = Modes.Image;
    await generateImage(input);
}
export async function generateImage(input) {
    if (input != "") {
        const res = await openai.createImage({
            prompt: input,
            n: 1,
            size: "1024x1024"
        });
        const imageUrl = res.data.data[0].url;
        console.log(imageUrl);
    }
}
