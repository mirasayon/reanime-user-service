import { EnvConfig } from "#/configs/environment-variables.js";
import { ImATeapotException } from "#/modules/errors/client-side/exceptions.js";
import { ExpectedInternalServerErrorException } from "#/modules/errors/server-side/exceptions.js";
import type e from "express";
import { createHash, timingSafeEqual } from "node:crypto";
/** Middleware for all routes that checks for the presence of an API key to access services. Middleware for all routes, checking for the presence of an API key to access services. If there is no API-key in the request header, it will return a static route with status 418 */
export const ApiKeyGuard = (req: e.Request, res: e.Response, next: e.NextFunction) => {
    if (req.method === "GET") {
        return next();
    }
    const headerVal = req.headers["x-reanime-user-service-key"];
    if (typeof headerVal !== "string" || headerVal.length === 0) {
        throw new ImATeapotException();
    }
    const expected = EnvConfig.api_key_to_this_service;
    if (!expected) {
        throw new ExpectedInternalServerErrorException("Сервер неправильно сконфигурирован. Попробуйте позже");
    }
    const hashProvided = createHash("sha256").update(headerVal, "utf8").digest();
    const hashExpected = createHash("sha256").update(expected, "utf8").digest();
    const key_passes = timingSafeEqual(hashProvided, hashExpected);
    if (key_passes) {
        return next();
    }
    throw new ImATeapotException();
};
