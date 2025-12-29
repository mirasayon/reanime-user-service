import { existsSync, mkdirSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
/** Ensures that the directory name specified by the given path exists. Asynchronous version
 * @returns the concatenated path string */
export async function ensuredJoin<T extends string>(...paths: T[]): Promise<T> {
    const _path = join(...paths);
    const isJson = extname(_path).toLowerCase() === ".json";
    if (!existsSync(_path)) {
        if (isJson) {
            await mkdir(dirname(_path), { recursive: true });
        } else {
            await mkdir(_path, { recursive: true });
        }
    }
    return _path as T;
}

/** Ensures that the directory name specified by the given path exists. Synchronous version
 * @returns the concatenated path string */
export function ensuredJoinSync<T extends string>(...paths: T[]): T {
    const _path = join(...paths);
    const isJson = extname(_path).toLowerCase() === ".json";
    if (!existsSync(_path)) {
        if (isJson) {
            mkdirSync(dirname(_path), { recursive: true });
        } else {
            mkdirSync(_path, { recursive: true });
        }
    }
    return _path as T;
}

export function validatorJoinPath<T extends string>(...paths: T[]): T {
    const _path = join(...paths);
    if (!existsSync(_path)) {
        throw new Error(`Path ${_path} does not exist`);
    }
    return _path as T;
}
