import { makeIfNotAndJoinSync, validateAndJoinPaths } from "#src/utilities/fs-path-utils.ts";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const filenamePath = fileURLToPath(import.meta.url);
const dirnamePath = dirname(filenamePath);
const projectRootPath = validateAndJoinPaths(dirnamePath, "..", "..");
const resources = validateAndJoinPaths(projectRootPath, "resources");
const uploadsPath = makeIfNotAndJoinSync(projectRootPath, "uploads");
/** Configuration of all paths of necessary folders/files */
export const fsPathsConfig = {
    /** Public Static folder path */
    static: validateAndJoinPaths(resources, "static"),
    maxmindCountryDb: validateAndJoinPaths(resources, "maxmind-db", "GeoLite2-Country.mmdb"),
    profileAvatars: makeIfNotAndJoinSync(uploadsPath, "avatars"),
};
