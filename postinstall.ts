import chalk from "chalk";
import { log } from "node:console";
import { existsSync } from "node:fs";
import { cp, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const _dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES = {
    start: chalk.magenta("Copying Prisma DLL apps to ./dist"),
    success: chalk.green("✔ Files copied successfully"),
    alreadyDone: chalk.yellow("! Destination already exists, skipping copy"),
    error: (error: unknown) => chalk.red(`✖ Error copying files: ${error}`),
};

async function copyDirectory(src: string, dest: string): Promise<void> {
    // Uncomment to skip if already present:
    // if (existsSync(dest)) {
    //   return log(MESSAGES.alreadyDone);
    // }

    if (!existsSync(dest)) {
        await mkdir(dest, { recursive: true });
    }
    await cp(src, dest, { recursive: true, force: true });
}

(async function main() {
    const sourcePath = join(_dirname, "src", "db", "orm");
    const destPath = join(_dirname, "dist", "db", "orm");
    log(MESSAGES.start);
    try {
        await copyDirectory(sourcePath, destPath);
        log(MESSAGES.success);
    } catch (err) {
        console.error(MESSAGES.error(err));
        process.exit(1);
    }
})();
