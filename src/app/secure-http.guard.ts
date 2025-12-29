import { envConfig } from "#src/configs/env-variables-config.ts";
import type ExpressJS from "express";
import { UseSecureHTTPException } from "#src/errors/client-side-exceptions.ts";
export function secureHttpGuardMiddleware(req: ExpressJS.Request, res: ExpressJS.Response, next: ExpressJS.NextFunction) {
    if (envConfig.isProd) {
        if (!(req.secure || req.get("x-forwarded-proto") === "https")) {
            throw new UseSecureHTTPException();
        }
    }
    return next();
}
