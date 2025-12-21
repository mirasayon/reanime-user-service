import { existsSync, mkdirSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
/**
 * Ensures that the dirname of the inputted `path` does exist
 * @param paths paths
 * @returns joined path string
 */
export async function ensuredJoin<T extends string>(...paths: T[]): Promise<T> {
    const __path = join(...paths);
    const isJson = extname(__path).toLowerCase() === ".json";
    if (!existsSync(__path)) {
        if (isJson) {
            await mkdir(dirname(__path), { recursive: true });
        } else {
            await mkdir(__path, { recursive: true });
            /** only if path is direct json path */
        }
    }
    return __path as T;
}

/**
 * Ensures that the dirname of the inputted `path` does exist
 * @param paths paths
 * @returns joined path string
 */
export function ensuredJoinSync<T extends string>(...paths: T[]): T {
    const __path = join(...paths);
    const isJson = extname(__path).toLowerCase() === ".json";
    if (!existsSync(__path)) {
        if (isJson) {
            mkdirSync(dirname(__path), { recursive: true });
        } else {
            mkdirSync(__path, { recursive: true });
            /** only if path is direct json path */
        }
    }
    return __path as T;
}
