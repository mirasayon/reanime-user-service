import { NotFoundException } from "#/errors/client-side-exceptions.js";
import { mediaRouteModel } from "#/app/media/media.model.js";
import type { default as ExpressJS } from "express";
import { extname } from "node:path";
import { AVATAR_IMAGE_FILE_HEIGHT_PIXELS, AVATAR_IMAGE_FILE_WIDTH_PIXELS } from "#/constants/media-module-config.js";
import sharp from "sharp";
import { AVATAR_IMAGE_FILE_ALLOWED_MIME_TYPES } from "#/constants/media-module-config.js";
import { createReadStream, statSync, existsSync } from "node:fs";
import { unlink, writeFile } from "node:fs/promises";
import { mediaHashService } from "#/utilities/cryptography-services/media-filename-hashing.service.js";
import type { DbCuidType } from "#/shared/types-shared/informative-input-types-shared.js";

/** Removes a file if it exists. */
async function removeFileIfExists(path: string): Promise<void> {
    if (existsSync(path)) {
        await unlink(path);
    }
}

export async function editForProdTheImageSharp(reqBuffer: Buffer<ArrayBufferLike>, prodFilePath: string) {
    const editedImageFile = await sharp(reqBuffer)
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
    return { hash, size_bytes: editedImageFile.length };
}
export async function destroyFilesAfterTrigger(trigger: boolean, profile_id: DbCuidType, prodPath: string): Promise<boolean> {
    if (!trigger) {
        return false;
    }
    if (trigger === true) {
        await mediaRouteModel.delete_avatar_from_profile_if_exists(profile_id);
        await removeFileIfExists(prodPath);
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
