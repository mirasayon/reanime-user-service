import { MulterError } from "multer";
import type ExpressJS from "express";
import { goReplyHttp } from "#/handlers/all-http-responder.js";
import {
    BadRequestException,
    type ClientSideExceptionClasses,
    ConflictException,
    ForbiddenException,
    ImATeapotException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
    UseSecureHTTPException,
} from "#/errors/client-side-exceptions.js";
export function clientSideErrorMiddleware(
    error: Error | SyntaxError | MulterError | ClientSideExceptionClasses,
    _req: ExpressJS.Request,
    res: ExpressJS.Response,
    next: ExpressJS.NextFunction,
): void {
    if (error instanceof SyntaxError) {
        return goReplyHttp.bad_request(res, {
            errors: ["Недопустимое тело JSON. Убедитесь, что тело запроса отформатировано правильно"],
        });
    }

    if (error instanceof MulterError) {
        return goReplyHttp.bad_request(res, {
            errors: [`Убедитесь, что файл имеет правильный формат и не поврежден`],
        });
    }

    if (error instanceof BadRequestException) {
        return goReplyHttp.bad_request(res, {
            errors: error.errors,
        });
    }
    if (error instanceof ConflictException) {
        return goReplyHttp.conflict(res, {
            errors: error.errors,
        });
    }
    if (error instanceof ForbiddenException) {
        return goReplyHttp.forbidden(res, {
            errors: error.errors,
        });
    }
    if (error instanceof ImATeapotException) {
        return goReplyHttp.i_am_a_teapot(res);
    }
    if (error instanceof NotFoundException) {
        return goReplyHttp.not_found(res, {
            errors: error.errors,
        });
    }
    if (error instanceof TooManyRequestsException) {
        return goReplyHttp.too_many_requests(res, {
            message: error.message,
        });
    }
    if (error instanceof UnauthorizedException) {
        return goReplyHttp.unauthorized(res, {
            errors: error.errors,
        });
    }
    if (error instanceof UseSecureHTTPException) {
        return goReplyHttp.use_secure_http(res);
    }
    return next(error);
}

export function notFoundRouteErrorMiddleware(req: ExpressJS.Request, res: ExpressJS.Response, next: ExpressJS.NextFunction): void {
    return goReplyHttp.not_found(res, { errors: ['Ошибка "Не найдено"'] });
}
