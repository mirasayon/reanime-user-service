import { existsSync, mkdirSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
/** Ensures that the directory name specified by the given path exists. Asynchronous version
 * @returns the concatenated path string */
export async function makeIfNotAndJoin(...paths: string[]): Promise<string> {
    const pathJoin = join(...paths);
    const isJsonPath = extname(pathJoin).toLowerCase() === ".json";
    if (!existsSync(pathJoin)) {
        if (isJsonPath) {
            await mkdir(dirname(pathJoin), { recursive: true });
        } else {
            await mkdir(pathJoin, { recursive: true });
        }
    }
    return pathJoin;
}

/** Ensures that the directory name specified by the given path exists. Synchronous version
 * @returns the concatenated path string */
export function makeIfNotAndJoinSync(...paths: string[]): string {
    const pathJoin = join(...paths);
    const isJsonPath = extname(pathJoin).toLowerCase() === ".json";
    if (!existsSync(pathJoin)) {
        if (isJsonPath) {
            mkdirSync(dirname(pathJoin), { recursive: true });
        } else {
            mkdirSync(pathJoin, { recursive: true });
        }
    }
    return pathJoin;
}

export function validateAndJoinPaths(...paths: string[]): string {
    const pathJoin = join(...paths);
    if (!existsSync(pathJoin)) {
        throw new Error(`Path ${pathJoin} does not exist`);
    }
    return pathJoin;
}
