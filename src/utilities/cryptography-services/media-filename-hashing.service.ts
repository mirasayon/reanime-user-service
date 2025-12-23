import type { DbCuidType } from "#/shared/types-shared/informative-input-types-shared.js";
import { createHash } from "node:crypto";

class MediaFilenameHashingServiceClass {
    readonly ALGORITHM = "sha3-512";
    createHashFromProfileId(profile_id: DbCuidType): string {
        return createHash(this.ALGORITHM).update(profile_id, "utf8").digest("base64url");
    }
}
export const mediaFilenameHashingService = new MediaFilenameHashingServiceClass();
