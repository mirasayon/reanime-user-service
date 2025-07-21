import type e from "express";
export function dev_logger(req: e.Request, res: e.Response, next: e.NextFunction) {
    console.info(`Body: ${JSON.stringify(req.body, null, 4)}`);
    console.info(`Cookies: ${JSON.stringify(req.cookies, null, 4)}`);
    console.info(`Headers: ${JSON.stringify(req.headers, null, 4)}`);
    return next();
}

