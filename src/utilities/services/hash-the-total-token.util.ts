import { createHash } from "node:crypto";

export function createHashSHA3_512(input: string) {
    return createHash("sha3-512").update(input).digest("hex");
}
