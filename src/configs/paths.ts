import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
/** Class with configuration of all paths of necessary folders/files */
class PathsClass {
    /** Root path string of the Project. The directive where `package.json` is located, for example. */
    public readonly root: string;
    /** Public/static folder path */
    public readonly static: string;
    /** The folder where all the scripts are located. `$project/dist` for js files for example */
    public readonly src: string;
    constructor() {
        const _filename = fileURLToPath(import.meta.url);
        const _dirname = dirname(_filename);
        this.root = join(_dirname, "..", "..");
        this.src = join(_dirname, "..");
        this.static = join(this.root, "resources", "static");
    }
}
/** Class instance with configuration of all paths of necessary folders/files */
export const PathsConfig = new PathsClass();
