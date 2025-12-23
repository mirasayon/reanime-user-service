import { ensuredJoinSync } from "#/utilities/ensured-path-join-util.js";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const _filename_ = fileURLToPath(import.meta.url);
const _dirname_ = dirname(_filename_);
/** Configuration of all paths of necessary folders/files */
class PathsMainConfig {
    /** Root path string of the Project. The directive where `package.json` is located */
    root: string = ensuredJoinSync(_dirname_, "..", "..");
    /** For user images
     *
     * `./resources/storage`
     */
    storage: string = ensuredJoinSync(this.root, "resources", "storage");
    /** Static folder path */
    static: string = ensuredJoinSync(this.root, "resources", "static");
    /** The folder where all the scripts are located. `$project/dist` for js files */
    src: string = ensuredJoinSync(_dirname_, "..");
}
export const pathsMainConfig = new PathsMainConfig();
export const baseProcessPathForAvatar = ensuredJoinSync(pathsMainConfig.storage, "avatars", "base");
export const tempProcessPathForAvatar = ensuredJoinSync(pathsMainConfig.storage, "avatars", "temp");
