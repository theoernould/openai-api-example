export const colors = {
    red: "31",
    green: "32",
    yellow: "33",
    blue: "34",
    magenta: "35",
    cyan: "36",
    white: "37",
    black: "30"
}

export function colorText(text: string, color: string) {
    return `\x1b[${color}m${text}\x1b[0m`;
}