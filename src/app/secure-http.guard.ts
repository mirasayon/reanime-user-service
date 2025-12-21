import { EnvConfig } from "#/configs/environment-variables.js";
import type { default as ExpressJS } from "express";
import { UseSecureHTTPException } from "#/errors/client-side-exceptions.js";
export function secureHttpGuard(req: ExpressJS.Request, res: ExpressJS.Response, next: ExpressJS.NextFunction) {
    if (EnvConfig.is_prod) {
        if (!(req.secure || req.get("x-forwarded-proto") === "https")) {
            throw new UseSecureHTTPException();
        }
    }
    return next();
}
