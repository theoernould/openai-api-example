import readline from "readline";
export const colors = {
    red: "31",
    green: "32",
    yellow: "33",
    blue: "34",
    magenta: "35",
    cyan: "36",
    white: "37",
    black: "30"
};
let loaderInterval;
export function firstLetterUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function colorText(text, color) {
    return `\x1b[${color}m${text}\x1b[0m`;
}
export function printFormattedMessage(date, role, content) {
    const dateStr = dateToStringHours(date);
    console.log(`${colorText('[' + dateStr + ']', colors.yellow)} ${colorText(firstLetterUpperCase(role), colors.blue)} : ${content}`);
}
export function dateToStringHours(date) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}
export function clearUserInput() {
    process.stdout.moveCursor(0, -1);
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
}
export function showLoader() {
    const frames = ['[ - ]', '[ \\ ]', '[ | ]', '[ / ]'];
    let i = 0;
    loaderInterval = setInterval(() => {
        process.stdout.write(`\r${frames[i]}`);
        i = (i + 1) % frames.length;
    }, 200);
}
export function hideLoader() {
    clearInterval(loaderInterval);
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
}
