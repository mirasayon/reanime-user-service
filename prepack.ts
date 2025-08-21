import { Logger } from "log-it-colored";
import { env } from "node:process";
import { existsSync } from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

if (env.XPACK !== "true") {
    Logger.red("You actually need to run `npm run xpack` for that");
    process.exit(1);
}

if (env.XPACK === "true") {
    Logger.violet("Packing tarball...");
    const _dirname = dirname(fileURLToPath(import.meta.url));
    const packagePath = join(_dirname, "package", "tarball");
    if (existsSync(packagePath)) {
        await rm(packagePath, { recursive: true, force: true });
    }
    await mkdir(packagePath);
}
