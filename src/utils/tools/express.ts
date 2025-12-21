import { PathsConfig } from "#/configs/paths.config.js";
import type { Application } from "express";
import { default as expressJs } from "express";
/**
 * Created new ExpressJS.js Router with configured settings
 * @returns ExpressJS.js Router
 */
export function createConfiguredRouter(): ReturnType<typeof expressJs.Router> {
    return expressJs.Router({ caseSensitive: true, strict: true });
}
/** Static Folder middleware */
export const mainStaticServerMiddleware = expressJs.static(PathsConfig.static, {
    etag: false,
    index: false,
    lastModified: false,
});

/** Json Body-parser middleware */
export const jsonBodyParserMiddleware = expressJs.json({
    strict: true,
    limit: "100kb",
    inflate: true,
    type: "application/json",
});
/**
 * Starts the server and returns the instance
 * @param port Port number
 * @param host Hostname
 */
export async function startListeningTheServer(
    app: Application,
    { port, host }: { port: number; host: string },
): Promise<ReturnType<Application["listen"]>> {
    return await new Promise((resolve, reject) => {
        const server = app.listen({ port, host }, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(server);
        });
    });
}
