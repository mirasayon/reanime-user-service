import { envConfig } from "#src/configs/env-variables-config.ts";
import { UnauthorizedException } from "#src/errors/client-side-exceptions.ts";
import type ExpressJS from "express";
import { timingSafeEqual } from "node:crypto";
/** Middleware for API key validation. Throws 404 if not valid */
export function apiKeyToServiceGuard(request: ExpressJS.Request, _res: ExpressJS.Response, next: ExpressJS.NextFunction) {
    const headerVal = request.headers["x-reanime-user-service-key"];
    if (!headerVal || typeof headerVal !== "string" || headerVal.length === 0) {
        throw new UnauthorizedException(["No API key provided"]);
    }
    const keyFromHeader = Buffer.from(headerVal, "utf8");
    const keyExpected = Buffer.from(envConfig.internalApiKey, "utf8");

    if (keyFromHeader.length !== keyExpected.length) {
        throw new UnauthorizedException(["No API key provided"]);
    }
    if (timingSafeEqual(keyFromHeader, keyExpected)) {
        return next();
    }
    throw new UnauthorizedException(["No API key provided"]);
}
