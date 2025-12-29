import { ensuredJoinSync, validatorJoinPath } from "#src/utilities/ensured-path-join-util.ts";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const filenamePath = fileURLToPath(import.meta.url);
const dirnamePath = dirname(filenamePath);
/** Configuration of all paths of necessary folders/files */
class ProjectPathConfig {
    /** Root path of the project */
    root: string = validatorJoinPath(dirnamePath, "..", "..");
    /** `./resources/storage` folder path */
    storage: string = ensuredJoinSync(this.root, "resources", "storage");
    /** Public Static folder path */
    static: string = validatorJoinPath(this.root, "resources", "static");
    /** The folder where all the scripts are located */
    src: string = ensuredJoinSync(dirnamePath, "..");
    // resources\ip-address-static-base\GeoLite2-Country.mmdb
    maxmindCountryDb: string = validatorJoinPath(this.root, "resources", "ip-address-static-base", "GeoLite2-Country.mmdb");
    /** (pathsMainConfig.storage, "avatars" ); */
    profileAvatars: string = ensuredJoinSync(this.storage, "avatars");
}
export const pathsConfigs = new ProjectPathConfig();
