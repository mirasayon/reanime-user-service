import chalk from "chalk";
export { chalk };
/** Custom logger util */
export const Logger = new (class Logger_Class {
    blue = (...content: unknown[]) => {
        return console.info(chalk.blueBright(...content));
    };
    violet = (...content: unknown[]) => {
        return console.info(chalk.rgb(255, 0, 242)(...content));
    };
    slate = (...content: unknown[]) => {
        return console.info(chalk.rgb(179, 179, 179)(...content));
    };
    red = (...content: unknown[]) => {
        return console.error(chalk.rgb(255, 0, 0)(...content));
    };
    /** Raw error */
    error = (...content: unknown[]) => {
        console.error(...content);
    };
    success = (...content: unknown[]) => {
        return console.error(chalk.green(...content));
    };
    sky = (...content: unknown[]) => {
        return console.info(chalk.rgb(94, 242, 255)(...content));
    };
    green = (...content: unknown[]) => {
        return console.info(chalk.rgb(0, 255, 34)(...content));
    };
    gray = (...content: unknown[]) => {
        return console.info(chalk.rgb(122, 122, 122)(...content));
    };
    /** console.info */
    raw = (...content: unknown[]) => {
        return console.info(...content);
    };
})();
