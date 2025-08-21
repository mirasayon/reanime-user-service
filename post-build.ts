import { Logger } from "log-it-colored";
import { existsSync } from "node:fs";
import { cp, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
/** root */
const _dirname_ = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(_dirname_, "src", "db", "orm");
const destPath = join(_dirname_, "dist", "db", "orm");
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
