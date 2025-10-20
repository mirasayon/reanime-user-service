import { NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import type e from "express";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname } from "node:path";
// Supported mime types
export const MIME_TYPES = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
} as const;

/** Static File Hander for each request */
export async function serveFile(req: e.Request, res: e.Response, full_path: string) {
    if (!existsSync(full_path) || !statSync(full_path).isFile()) {
        throw new NotFoundException(["File not found"]);
    }
    // const stat = statSync(fullPath);
    const ext = extname(full_path).slice(1).toLowerCase();
    const mime = MIME_TYPES[ext as keyof typeof MIME_TYPES] || "application/octet-stream";
    // const etag = `W/"${stat.size.toString(16)}-${stat.mtimeMs.toString(16)}"` as const;
    res.setHeader("Content-Type", mime);
    // res.setHeader("ETag", etag);
    // res.setHeader("Last-Modified", stat.mtime.toUTCString());
    // const max_age_seconds = 60 * 60 * 24 * 1; // 1 Day
    // res.setHeader("Cache-Control", `public, max-age=${max_age_seconds}, immutable`);
    // if (req.headers["if-none-match"] === etag) {
    //     return res.status(304).end();
    // }
    const stream = createReadStream(full_path);
    stream.pipe(res);
}
