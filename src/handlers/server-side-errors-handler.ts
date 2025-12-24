import consola from "consola";
import type { default as ExpressJS } from "express";
import {
    BadGatewayException,
    ExpectedInternalServerErrorException,
    NotImplementedException,
    ServiceUnavailableException,
    UnexpectedInternalServerErrorException,
    type ServerSideExceptionClasses,
} from "../errors/server-side-exceptions.js";
import { goReplyHttp } from "./all-http-responder.js";
/** Unknown Server Side Exception Handler */
export const unknownServerSideExceptionHandlerLastMiddleware = (
    error: unknown,
    _req: ExpressJS.Request,
    res: ExpressJS.Response,
    next: ExpressJS.NextFunction,
): void => {
    consola.fatal("[last error handler]: Unknown error: ", error);
    return goReplyHttp.internal_server_error(res, { message: "Внутренняя ошибка сервера. Пожалуйста, попробуйте позже" });
};

/** Expected Server Side Error Handler */
export function serverSideExceptionHandlerMiddleware(
    error: ServerSideExceptionClasses,
    req: ExpressJS.Request,
    res: ExpressJS.Response,
    next: ExpressJS.NextFunction,
): void {
    if (error instanceof ExpectedInternalServerErrorException) {
        return goReplyHttp.internal_server_error(res, { message: error.errorMessage });
    }
    if (error instanceof UnexpectedInternalServerErrorException) {
        return goReplyHttp.internal_server_error(res, { message: "Непредвиденная ошибка сервера" });
    }
    if (error instanceof BadGatewayException) {
        return goReplyHttp.internal_server_error(res, { message: "Ошибка прокси-сервера (Bad Gateway). Пожалуйста, попробуйте позже" });
    }
    if (error instanceof NotImplementedException) {
        return goReplyHttp.not_implemented(res, { message: "Не реализован. Пожалуйста, попробуйте позже" });
    }
    if (error instanceof ServiceUnavailableException) {
        return goReplyHttp.service_unavailable(res, { message: "Сервис недоступен. Пожалуйста, попробуйте позже" });
    }
    return next(error);
}
