import { Logger } from "log-it-colored";
import { existsSync } from "node:fs";
import { cp, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { rootDirname } from "./paths.config.ts";
const sourcePath = join(rootDirname, "src", "db", "orm");
const destPath = join(rootDirname, "dist", "db", "orm");
const logMsg = new (class logMsg {
    start = () => Logger.violet("Copying Prisma DLL apps to ./dist");
    success = () => Logger.success("✔ Files copied successfully");
    alreadyDone = () => Logger.yellow("! Destination already exists, skipping copy");
    error = () => Logger.red(`✖ Error copying files: `);
})();
try {
    logMsg.start();
    await _copyDirs(sourcePath, destPath);
    logMsg.success();
} catch (_err) {
    logMsg.error();
    throw _err;
}
//

async function _copyDirs(src: string, dest: string): Promise<void> {
    // Uncomment to skip if already present:
    // if (existsSync(dest)) {
    //   return log(MESSAGES.alreadyDone);
    // }

    if (!existsSync(dest)) {
        await mkdir(dest, { recursive: true });
    }
    await cp(src, dest, { recursive: true, force: true });
}
