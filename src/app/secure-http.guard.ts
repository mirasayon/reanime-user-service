import { EnvConfig } from "#/configs/environment-variables.js";
import { UseSecureHTTPException } from "#/modules/errors/client-side/exceptions.js";
import type Express from "express";
export function secureHttpGuard(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    if (EnvConfig.is_prod) {
        if (!(req.secure || req.get("x-forwarded-proto") === "https")) {
            throw new UseSecureHTTPException();
        }
    }
    return next();
}
