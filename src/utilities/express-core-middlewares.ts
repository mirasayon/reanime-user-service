import { pathsMainConfig } from "#/configs/file-system-path-config.js";
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
export const mainStaticServerMiddleware = expressJs.static(pathsMainConfig.static, {
    etag: false,
    index: false,
    lastModified: false,
});

/** Промежуточный обработчик запросов для парсинга JSON-тела в запросе */
export const jsonBodyParserMiddleware = expressJs.json({
    strict: true,
    limit: "100kb",
    inflate: true,
    type: "application/json",
});
/**
 * Запускает сервер и возвращает экземпляр сервера.
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
