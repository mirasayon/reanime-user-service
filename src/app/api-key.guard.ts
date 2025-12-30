import { API_KEY_HEADER_NAME } from "#src/configs/application-rules-config.ts";
import { envConfig } from "#src/configs/env-variables-config.ts";
import { UnauthorizedException } from "#src/errors/client-side-exceptions.ts";
import type ExpressJS from "express";
import { timingSafeEqual } from "node:crypto";
/** Middleware for API key validation */
export function apiKeyToServiceGuard(request: ExpressJS.Request, _res: ExpressJS.Response, next: ExpressJS.NextFunction) {
    const headerVal = request.headers[API_KEY_HEADER_NAME];
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
