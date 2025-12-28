import { ensuredJoinSync, validatorJoinPath } from "#src/utilities/ensured-path-join-util.ts";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const _filename_ = fileURLToPath(import.meta.url);
const _dirname_ = dirname(_filename_);
/** Configuration of all paths of necessary folders/files */
class PathsMainConfig {
    /** Root path of the project */
    root: string = ensuredJoinSync(_dirname_, "..", "..");
    /** `./resources/storage` folder path */
    storage: string = ensuredJoinSync(this.root, "resources", "storage");
    /** Static folder path */
    static: string = ensuredJoinSync(this.root, "resources", "static");
    /** The folder where all the scripts are located. `$project/dist` for js files */
    src: string = ensuredJoinSync(_dirname_, "..");

    // resources\ip-address-static-base\GeoLite2-Country.mmdb
    maxmindDbPath: string = validatorJoinPath(this.root, "resources", "ip-address-static-base", "GeoLite2-Country.mmdb");
    /** (pathsMainConfig.storage, "avatars" ); */
    fsPathForAvatar: string = ensuredJoinSync(this.storage, "avatars");
}
export const pathsMainConfig = new PathsMainConfig();
