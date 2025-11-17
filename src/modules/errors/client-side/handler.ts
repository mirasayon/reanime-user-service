import type e from "express";
import { MulterError } from "multer";
import { Reply } from "../../response/handlers.js";
import {
    BadRequestException,
    type ClientSideExceptionClasses,
    ConflictException,
    ForbiddenException,
    ImATeapotException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
} from "./exceptions.js";
export const client_error_handler = (
    error: Error | SyntaxError | MulterError | ClientSideExceptionClasses,
    _req: e.Request,
    res: e.Response,
    next: e.NextFunction,
) => {
    if (error instanceof SyntaxError) {
        return Reply.bad_request(res, {
            errors: ["Недопустимое тело JSON. Убедитесь, что тело запроса отформатировано правильно"],
        });
    }

    if (error instanceof MulterError) {
        return Reply.bad_request(res, {
            errors: [`Убедитесь, что файл имеет правильный формат и не поврежден`],
        });
    }

    if (error instanceof BadRequestException) {
        return Reply.bad_request(res, {
            errors: error.errors,
        });
    }
    if (error instanceof ConflictException) {
        return Reply.conflict(res, {
            errors: error.errors,
        });
    }
    if (error instanceof ForbiddenException) {
        return Reply.forbidden(res, {
            errors: error.errors,
        });
    }
    if (error instanceof ImATeapotException) {
        return Reply.i_am_a_teapot(res);
    }
    if (error instanceof NotFoundException) {
        return Reply.not_found(res, {
            errors: error.errors,
        });
    }
    if (error instanceof TooManyRequestsException) {
        return Reply.too_many_requests(res, {
            message: error.message,
        });
    }
    if (error instanceof UnauthorizedException) {
        return Reply.unauthorized(res, {
            errors: error.errors,
        });
    }
    return next(error);
};

export const not_found_route = (req: e.Request, res: e.Response, next: e.NextFunction): void => {
    return Reply.not_found(res, { errors: [] });
};
