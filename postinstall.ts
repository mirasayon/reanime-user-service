import chalk from "chalk";
import { existsSync, type PathLike } from "node:fs";
import { cp as copy, mkdir } from "node:fs/promises";
import { join } from "node:path";
const text = chalk.magenta("Copy Prisma DLL Apps to ./dist");
const sccs = chalk.green("Succesfully copied");
console.log(text);
async function CopyFolder(
    source: PathLike,
    destination: PathLike,
): Promise<void> {
    // if (existsSync(destination)) {
    //     return console.log(chalk.green("Already copied."));
    // }
    await mkdir(destination, { recursive: true }); // make sure destination folder exists
    await copy(source as string, destination as string, {
        recursive: true,
        force: true,
    });
    console.log(sccs);
}
try {
    await CopyFolder(join("src", "db", "orm"), join("dist", "db", "orm"));
} catch (error) {
    console.error("Error while copying files: ", error);
}
