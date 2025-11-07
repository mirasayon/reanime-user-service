import console from "node:console";
console.clear();
console.time("in");
import terminalImage from "terminal-image";
import { test_db } from "#/providers/adapter.js";
import { prisma } from "#/providers/database-connect.js";
import { startThisServer } from "#/server/class.js";
import { PathsConfig } from "#/configs/paths.config.js";
import { join } from "path";
import { EnvConfig } from "#/configs/environment-variables.js";

await startThisServer();
await test_db(prisma);
console.timeEnd("in");

if (EnvConfig.is_prod) {
    console.log(
        await terminalImage.file(join(PathsConfig.static, "selena-mlbb-art.jpg"), {
            height: "60%",
            width: "60%",
            preserveAspectRatio: true,
        }),
    );
} else {
    console.log("...");
}
