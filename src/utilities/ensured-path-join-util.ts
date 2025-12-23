import { existsSync, mkdirSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
/** Гарантирует, что имя каталога, указанное в заданном пути, существует. Асинхронная версия
 * @returns объединенная строка пути */
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

/** Гарантирует, что имя каталога, указанное в заданном пути, существует. Синхронная версия
 * @returns объединенная строка пути  */
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
