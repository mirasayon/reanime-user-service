import { makeIfNotAndJoinSync, validateAndJoinPaths } from "#src/utilities/fs-path-utils.ts";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const filenamePath = fileURLToPath(import.meta.url);
const dirnamePath = dirname(filenamePath);
/** Configuration of all paths of necessary folders/files */
class ProjectPathConfig {
    /** Root path of the project */
    root = validateAndJoinPaths(dirnamePath, "..", "..");
    /** `./resources` folder path */
    resources = validateAndJoinPaths(this.root, "resources");
    uploads = makeIfNotAndJoinSync(this.root, "uploads");
    /** Public Static folder path */
    static = validateAndJoinPaths(this.resources, "static");
    /** The folder where all the scripts are located */
    src = makeIfNotAndJoinSync(dirnamePath, "..");
    maxmindCountryDb = validateAndJoinPaths(this.resources, "maxmind-db", "GeoLite2-Country.mmdb");
    profileAvatars = validateAndJoinPaths(this.uploads, "avatars");
}
export const fsPathsConfig = new ProjectPathConfig();
