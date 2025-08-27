import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const _filename_ = fileURLToPath(import.meta.url);
const _dirname_ = dirname(_filename_);
/** Class with configuration of all paths of necessary folders/files */
export const PathsConfig = new (class PathsClass {
    /** Root path string of the Project. The directive where `package.json` is located */
    root: string = join(_dirname_, "..", "..");
    /** Static folder path */
    static: string = join(this.root, "resources", "static");
    /** The folder where all the scripts are located. `$project/dist` for js files */
    src: string = join(_dirname_, "..");
})();
export const keysPublicKey: string = await readFile(join(PathsConfig.root, "keys", "public.pem"), { encoding: "utf-8" });
export const keysPrivateKey: string = await readFile(join(PathsConfig.root, "keys", "private.pem"), { encoding: "utf-8" });
if (!keysPublicKey || !keysPrivateKey) {
    throw new Error("`./keys/public.pem` or/and `./keys/private.pem` doesn't exist");
}

