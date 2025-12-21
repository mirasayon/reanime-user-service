import { ensuredJoinSync } from "#/utilities/tools/ensured-path-join.util.js";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const _filename_ = fileURLToPath(import.meta.url);
const _dirname_ = dirname(_filename_);
/** Class with configuration of all paths of necessary folders/files */
export const PathsConfig = new (class PathsClass {
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
})();

export const avatars_folder = ensuredJoinSync(PathsConfig.storage, "avatars", "base");
export const tempProcessPath = ensuredJoinSync(PathsConfig.storage, "avatars", "temp");
