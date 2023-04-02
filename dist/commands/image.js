import { mode, openai } from "../app";
import { colors, colorText, hideLoader, showLoader } from "../services/utils";
import { Modes } from "../enums/modes";
export async function handleImage(input) {
    console.clear();
    console.log(colorText(`Mode Image activated !`, colors.blue));
    mode.state = Modes.Image;
}
export async function generateImage(input) {
    if (input != "") {
        showLoader();
        const res = await openai.createImage({
            prompt: input,
            n: 1,
            size: "1024x1024"
        });
        const imageUrl = res.data.data[0].url;
        hideLoader();
        console.log(`Generated image URL : ${imageUrl}`);
    }
}
