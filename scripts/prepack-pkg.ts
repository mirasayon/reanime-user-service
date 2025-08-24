import { Logger } from "log-it-colored";
import { env } from "node:process";
import { existsSync } from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { rootDirname } from "./paths.config.ts";

if (env.XPACK !== "true") {
    Logger.red("You actually need to run `npm run xpack` for that");
    process.exit(1);
}

if (env.XPACK === "true") {
    Logger.violet("Packing tarball...");

    const packagePath = join(rootDirname, "package", "tarball");
    if (existsSync(packagePath)) {
        await rm(packagePath, { recursive: true, force: true });
    }
    await mkdir(packagePath);
}
