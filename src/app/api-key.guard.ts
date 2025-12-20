import { EnvConfig } from "#/configs/environment-variables.js";
import { NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import { ExpectedInternalServerErrorException } from "#/modules/errors/server-side/exceptions.js";
import type Express from "express";
import { timingSafeEqual } from "node:crypto";
const expectedApiKeyValue = EnvConfig.api_key_to_this_service;
/**
 * Промежуточный обработчик запросов для всех маршрутов, проверяющий наличие ключа API в заголовке запроса.
 *
 * Для всех маршрутов, проверяющее наличие ключа API для доступа к сервисам.
 *
 * При отсутствии ключа API в заголовке запроса, он вернет статус 418
 */
export function apiKeyToServiceGuard(request: Express.Request, _res: Express.Response, next: Express.NextFunction) {
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
