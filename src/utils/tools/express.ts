import { PathsConfig } from "#/configs/paths.config.js";
import { parseCookie } from "cookie";
import type { Application, NextFunction, Request, Response } from "express";
import express, { Router } from "express";

/** Creates New Router with already configured settings */
export const cRouter = () => Router({ caseSensitive: true, strict: true });
/** Cookie Parser middleware  */
export const cookie_parser = (req: Request, _res: Response, next: NextFunction) => {
    if (!req.headers.cookie) {
        req.cookies = {};
        return next();
    }
    req.cookies = parseCookie(req.headers.cookie, {});
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
export const listenExpressApp = (app: Application, { port, host }: { port: number; host: string }): Promise<ReturnType<Application["listen"]>> => {
    return new Promise((resolve, reject) => {
        const server = app.listen({ port, host }, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(server);
        });
    });
};
