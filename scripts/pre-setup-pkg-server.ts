import { Logger } from "log-it-colored";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { rootDirname } from "./paths.config.ts";
//
const folderPath = join(rootDirname, "package", "tarball");
const _folder = await readdir(folderPath, { encoding: "utf-8" });
const packageName = _folder[0];
if (!packageName) {
    throw new Error("No tarball in `./package/tarball` folder");
}
console.clear();
Logger.violet(`npm install http://192.168.0.105:5641/${packageName}`);
