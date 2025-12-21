import type { default as ExpressJS } from "express";
import { Logger } from "log-it-colored";
export function mainDevServerLogger(req: ExpressJS.Request, res: ExpressJS.Response, next: ExpressJS.NextFunction) {
    Logger.violet("------START");
    console.info(`Body: ${JSON.stringify(req.body, null, 4)}`);
    console.info(`Headers: ${JSON.stringify(req.headers, null, 4)}`);
    Logger.violet("------END------");

    return next();
}
