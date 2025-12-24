import { BadRequestException, NotFoundException, ConflictException } from "#/errors/client-side-exceptions.js";
import { mediaRouteModel } from "#/app/media/media.model.js";
import type { default as ExpressJS } from "express";
import { profileRouteModel } from "#/app/profile/profile.model.js";
import { pathsMainConfig } from "#/configs/file-system-path-config.js";
import { Logger } from "log-it-colored";
import path, { extname, join } from "node:path";
import { AVATAR_IMAGE_FILE_HEIGHT_PIXELS, AVATAR_IMAGE_FILE_WIDTH_PIXELS } from "#/constants/media-module-config.js";
import { baseProcessPathForAvatar, tempProcessPathForAvatar } from "#/configs/file-system-path-config.js";
import { BadGatewayException } from "#/errors/server-side-exceptions.js";
import consola from "consola";
import { setTimeout as delay } from "node:timers/promises";
import sharp from "sharp";
import type { ExpressJSMulterFileType } from "#/types/util-expressjs-types.js";
import { AVATAR_IMAGE_FILE_ALLOWED_MIME_TYPES } from "#/constants/media-module-config.js";
import { createReadStream, statSync, existsSync } from "node:fs";
import { readFile, unlink, writeFile } from "node:fs/promises";
import { mediaHashService } from "#/utilities/cryptography-services/media-filename-hashing.service.js";

/** Removes a file with a delay if it exists. */
export async function removeFileIfExistsWithDelay(path: string, seconds: number = 2000) {
    if (existsSync(path)) {
        await delay(seconds);
        await unlink(path);
    }
}
/** Removes a file if it exists. */
export async function removeFileIfExists(path: string): Promise<void> {
    if (existsSync(path)) {
        await unlink(path);
    }
}

export async function editForProdTheImageSharp(tempFilePath: string, prodFilePath: string) {
    const inputBuffer = await readFile(tempFilePath);
    const sharpInstance = sharp(inputBuffer);
    const editedImageFile = await sharpInstance
        .rotate()
        .resize({
            width: AVATAR_IMAGE_FILE_WIDTH_PIXELS,
            height: AVATAR_IMAGE_FILE_HEIGHT_PIXELS,
            fit: "cover",
        })
        .webp()
        .rotate()
        .toBuffer();
    await writeFile(prodFilePath, editedImageFile);
    const hash = mediaHashService.hashFileB64Url(editedImageFile);
    removeFileIfExistsWithDelay(tempFilePath);
    return hash;
}
export async function destroyFilesAfterTrigger(trigger: boolean, paths: string[]): Promise<boolean> {
    if (!trigger || !paths?.length) {
        return false;
    }
    if (trigger === true) {
        for await (const path of paths) {
            await removeFileIfExists(path);
        }
        return true;
    }
    return false;
}

/** Static File Handler*/
export async function serveMediaFile(req: ExpressJS.Request, res: ExpressJS.Response, filePath: string) {
    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
        throw new NotFoundException(["Аватарка не найдена"]);
    }
    // const stat = statSync(fullPath);
    const ext = extname(filePath).slice(1).toLowerCase();
    const mime = AVATAR_IMAGE_FILE_ALLOWED_MIME_TYPES[ext as keyof typeof AVATAR_IMAGE_FILE_ALLOWED_MIME_TYPES];
    if (!mime) {
        throw new NotFoundException(["Неподдерживаемый формат аватарки"]);
    }
    // const etag = `W/"${stat.size.toString(16)}-${stat.mtimeMs.toString(16)}"` as const;
    res.setHeader("Content-Type", mime);
    // res.setHeader("ETag", etag);
    // res.setHeader("Last-Modified", stat.mtime.toUTCString());
    // const max_age_seconds = 60 * 60 * 24 * 1; // 1 Day
    // res.setHeader("Cache-Control", `public, max-age=${max_age_seconds}, immutable`);
    // if (req.headers["if-none-match"] === etag) {
    //     return res.status(304).end();
    // }
    const stream = createReadStream(filePath);
    return stream.pipe(res);
}
