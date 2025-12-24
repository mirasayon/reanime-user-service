import type { default as ExpressJS } from "express";
import { BadRequestException, PayloadTooLargeException } from "#/errors/client-side-exceptions.js";
import { PAYLOAD_MAX_SIZE, maxAvatarPayloadInMB } from "#/configs/application-rules-config.js";

/**
 * Промежуточный обработчик запросов для проверки размера файла для загрузки
 */
export function requestContentLengthValidatorMiddleware(req: ExpressJS.Request, _res: ExpressJS.Response, next: ExpressJS.NextFunction) {
    const contentLength = req.headers["content-length"];
    if (!contentLength) {
        throw new BadRequestException(["Отсутствуют значения заголовка длины контента. Проверьте правильность файла для загрузки"]);
    }
    if (!req.headers["content-type"]) {
        throw new BadRequestException(["Отсутствуют значения заголовка типа контента. Проверьте правильность файла для загрузки"]);
    }
    const size = Number(contentLength) ?? 0;
    if (!size || size === 0) {
        throw new BadRequestException(["Нету размера загружаемого файла"]);
    }
    if (size > PAYLOAD_MAX_SIZE) {
        throw new PayloadTooLargeException(`Размер файла для загрузки превышает максимально допустимый предел в ${maxAvatarPayloadInMB} МБ`);
    }
    return next();
}

export function mediaFileValidatorValidatorMiddleware(req: ExpressJS.Request, _res: ExpressJS.Response, next: ExpressJS.NextFunction) {
    const mimetype = req.file?.mimetype;
    if (!mimetype || typeof mimetype !== "string") {
        throw new BadRequestException(["Нету MIME-типа файла"]);
    }
    if (!mimetype.startsWith("image/")) {
        throw new BadRequestException(["Недопустимый MIME-тип файла"]);
    }
    const ext = mimetype.split("/")[1];
    if (!ext) {
        throw new BadRequestException(["Нету расширения загружаемого файла"]);
    }
    return next();
}
