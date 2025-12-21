import consola from "consola";
import type { default as ExpressJS } from "express";
import {
    BadGatewayException,
    ExpectedInternalServerErrorException,
    NotImplementedException,
    UnexpectedInternalServerErrorException,
} from "../../errors/server-side-exceptions.js";
import { goReplyHttp } from "../final-responder/all-http-responder.js";
/**
 * Unknown Server Side Exception Handler
 */
export const unknownServerSideExceptionHandlerMiddleware = (
    error: unknown,
    _req: ExpressJS.Request,
    res: ExpressJS.Response,
    next: ExpressJS.NextFunction,
): void => {
    consola.fatal("[last error handler]: Unknown error: ", error);
    return goReplyHttp.internal_server_error(res, { message: "Default Internal Server Error" });
};

/** Expected Server Side Error Handler */
export const serverSideExceptionHandlerMiddleware = (
    error: unknown,
    req: ExpressJS.Request,
    res: ExpressJS.Response,
    next: ExpressJS.NextFunction,
) => {
    if (error instanceof ExpectedInternalServerErrorException) {
        return goReplyHttp.internal_server_error(res, { message: error.errorMessage });
    }
    if (error instanceof UnexpectedInternalServerErrorException) {
        return goReplyHttp.internal_server_error(res, { message: "Непредвиденная ошибка сервера" });
    }
    if (error instanceof BadGatewayException) {
        return goReplyHttp.internal_server_error(res, { message: "Bad Gateway" });
    }
    if (error instanceof NotImplementedException) {
        return goReplyHttp.not_implemented(res, { message: "Не реализован" });
    }
    return next(error);
};
