import type { default as ExpressJS } from "express";
import { Logger } from "log-it-colored";
export function mainDevServerLogger(req: ExpressJS.Request, res: ExpressJS.Response, next: ExpressJS.NextFunction) {
    Logger.slate("------START------");
    console.info(`Body: `, req.body);
    console.info(`Headers: `, req.headers);
    Logger.slate("------END------");

    return next();
}
