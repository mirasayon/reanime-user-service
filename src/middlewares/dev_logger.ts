import type e from "express";
import { Logger } from "log-it-colored";
export function mainDevServerLogger(req: e.Request, res: e.Response, next: e.NextFunction) {
    Logger.violet("------START");
    console.info(`Body: ${JSON.stringify(req.body, null, 4)}`);
    console.info(`Headers: ${JSON.stringify(req.headers, null, 4)}`);
    Logger.violet("------END------");

    return next();
}
