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
/** Class instance with configuration of all paths of necessary folders/files */

