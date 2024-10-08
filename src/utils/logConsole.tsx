const debugMode = false;

export const logConsole = (...args: any[]) => {
    if (debugMode) {
        return console.log(...args);
    }
    return;
};
