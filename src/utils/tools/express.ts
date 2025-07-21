import type e from "express";
import cookie from "cookie";
import Express, { Router } from "express";
import { PathsConfig } from "#/configs/paths.js";

/** Creates New Router with alredy configured settings */
export const create_router = () => Router({ caseSensitive: true, strict: true });
/** Cookie Parser middleware  */
export const cookie_parser = (req: e.Request, _res: e.Response, next: e.NextFunction) => {
    if (!req.headers.cookie) {
        req.cookies = {};
        return next();
    }
    req.cookies = cookie.parse(req.headers.cookie, {});
    return next();
};

/** Static Folder middleware */
export const static_serve = Express.static(PathsConfig.static, {
    etag: false,
    index: false,
    lastModified: false,
});

/** Json Body-parser middleware */
export const json_parser = Express.json({
    strict: true,
    limit: "100kb",
    inflate: true,
    type: "application/json",
});
/** x-www-urlencoded parser middleware */
export const x_www_urlencoded_parser = Express.urlencoded({
    extended: false,
    type: "application/x-www-form-urlencoded",
});
