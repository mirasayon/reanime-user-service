import type e from "express";
import cookie from "cookie";
import express, { Router } from "express";
import { PathsConfig } from "#/configs/paths.config.js";

/** Creates New Router with alredy configured settings */
export const cRouter = () => Router({ caseSensitive: true, strict: true });
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
export const static_serve = express.static(PathsConfig.static, {
    etag: false,
    index: false,
    lastModified: false,
});

/** Json Body-parser middleware */
export const json_parser = express.json({
    strict: true,
    limit: "100kb",
    inflate: true,
    type: "application/json",
});
/** x-www-urlencoded parser middleware */
export const x_www_urlencoded_parser = express.urlencoded({
    extended: false,
    type: "application/x-www-form-urlencoded",
});

/**
 * Starts the server and returns the instance
 * @param port Port number
 * @param host Hostname
 */
export const listen = (app: e.Application, { port, host }: { port: number; host: string }): Promise<ReturnType<e.Application["listen"]>> => {
    return new Promise((resolve, reject) => {
        const server = app.listen({ port, host }, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(server);
        });
    });
};

