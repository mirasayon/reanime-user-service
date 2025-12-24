import { createHash, randomBytes } from "node:crypto";

class MediaFilenameHashingServiceClass {
    private readonly BUFFER_HASH_ALGORITHM = "sha3-512";

    public readonly BUFFER_HASH_ALGORITHM_VERSION = 1;
    /** 86 characters in total . base64url */
    public hashFileB64Url(buffer: Buffer<ArrayBufferLike>): string {
        return createHash(this.BUFFER_HASH_ALGORITHM).update(buffer).digest("base64url");
    }
    /** 3 characters in total. base64url */
    private dirNameGenerator = () => {
        return randomBytes(2).toString("base64url");
    };
    /** 6 characters in total. base64url */
    private genRandomString4b64Url = () => {
        return randomBytes(4).toString("base64url");
    };
    // /** 22 characters in total */
    // private genRandomString16B64url = () => {
    //     return randomBytes(16).toString("base64url");
    // };
    /** 43 characters in total */
    private genRandom32B64Url = () => {
        return randomBytes(32).toString("base64url");
    };
    public genFilenamePairForProduction = () => {
        return {
            dirName: this.dirNameGenerator(),
            fileName: this.genRandom32B64Url(),
        };
    };
    public genTempName = () => {
        return this.genRandomString4b64Url();
    };
    // public genFilenamePairForTemporary = () => {
    //     return {
    //         dirName: this.dirNameGenerator(),
    //         fileName: this.genRandom32B64Url(),
    //     };
    // };
}
export const mediaHashService = new MediaFilenameHashingServiceClass();
