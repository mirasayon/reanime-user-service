import { envMainConfig } from "#src/configs/environment-variables-config.ts";
import { NotFoundException } from "#src/errors/client-side-exceptions.ts";
import { ExpectedInternalServerErrorException } from "#src/errors/server-side-exceptions.ts";
import type ExpressJS from "express";
import { timingSafeEqual } from "node:crypto";
const expectedApiKeyValue = envMainConfig.api_key_to_this_service;
/** Middleware for API key validation. Throws 404 if not valid */
export function apiKeyToServiceGuard(request: ExpressJS.Request, _res: ExpressJS.Response, next: ExpressJS.NextFunction) {
    const headerVal = request.headers["x-reanime-user-service-key"];
    if (!headerVal || typeof headerVal !== "string" || headerVal.length === 0) {
        throw new NotFoundException([]);
    }
    if (!expectedApiKeyValue) {
        throw new ExpectedInternalServerErrorException("Сервер неправильно сконфигурирован. Пожалуйста, попробуйте позже");
    }
    const keyFromHeader = Buffer.from(headerVal, "utf8");
    const keyExpected = Buffer.from(expectedApiKeyValue, "utf8");

    if (keyFromHeader.length !== keyExpected.length) {
        throw new NotFoundException();
    }
    if (timingSafeEqual(keyFromHeader, keyExpected)) {
        return next();
    }
    throw new NotFoundException();
}
