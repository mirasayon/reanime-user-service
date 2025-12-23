import type { default as ExpressJS } from "express";
import { BadRequestException, PayloadTooLargeException } from "#/errors/client-side-exceptions.js";
import { PAYLOAD_MAX_SIZE, maxAvatarPayloadInMB } from "#/configs/application-rules-config.js";

/**
 * Промежуточный обработчик запросов для проверки размера файла для загрузки
 */
export function mediaFileValidatorMiddleware(req: ExpressJS.Request, _res: ExpressJS.Response, next: ExpressJS.NextFunction) {
    if (!req.headers["content-type"]) {
        throw new BadRequestException(["Отсутствуют значения заголовка типа контента. Проверьте правильность загрузки файла"]);
    }
    const size = Number(req.headers["content-length"]) ?? 0;
    if (size === 0) {
        throw new BadRequestException(["Размер файла для загрузки равен 0"]);
    }
    if (size > PAYLOAD_MAX_SIZE) {
        throw new PayloadTooLargeException(`Размер файла для загрузки превышает максимально допустимый предел в ${maxAvatarPayloadInMB} МБ`);
    }
    return next();
}
