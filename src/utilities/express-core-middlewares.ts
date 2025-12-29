import { pathsConfigs } from "#src/configs/file-system-path-config.ts";
import type { Application } from "express";
import expressJs from "express";
/** Created new ExpressJS.js Router with configured settings  */
export function createConfiguredRouter(): ReturnType<typeof expressJs.Router> {
    return expressJs.Router({ caseSensitive: true, strict: true });
}
/** Static Folder middleware */
export const mainStaticServerMiddleware = expressJs.static(pathsConfigs.static, {
    etag: false,
    index: false,
    lastModified: false,
});

/** An middleware for parsing the JSON body in a request */
export const jsonBodyParserMiddleware = expressJs.json({
    strict: true,
    limit: "100kb",
    inflate: true,
    type: "application/json",
});
/** Starts the server and returns the server instance */
export async function startListeningTheServer(app: Application, host: string, port: number): Promise<ReturnType<Application["listen"]>> {
    return await new Promise((resolve, reject) => {
        const server = app.listen({ port, host }, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(server);
        });
    });
}
