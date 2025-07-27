import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
/** Class with configuration of all paths of necessary folders/files */
export const PathsConfig = new (class PathsClass {
    /** Root path string of the Project. The directive where `package.json` is located, for example. */
    root: string = join(_dirname, "..", "..");
    /** Public/static folder path */
    static: string = join(this.root, "resources", "static");
    /** The folder where all the scripts are located. `$project/dist` for js files for example */
    src: string = join(_dirname, "..");
})();
/** Class instance with configuration of all paths of necessary folders/files */

