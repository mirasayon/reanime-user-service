import consola from "consola";
import type { default as ExpressJS } from "express";
import { goReplyHttp } from "../../response/handlers.js";
import {
    BadGatewayException,
    ExpectedInternalServerErrorException,
    NotImplementedException,
    UnexpectedInternalServerErrorException,
} from "./exceptions.js";

export const unknown_exception_handler = (error: unknown, req: ExpressJS.Request, res: ExpressJS.Response, next: ExpressJS.NextFunction): void => {
    consola.fatal("[last error handler]: Unknown error: ", error);
    return goReplyHttp.internal_server_error(res, {});
};

/** Expected Internal Error Handler */
export const server_exception_handler = (error: unknown, req: ExpressJS.Request, res: ExpressJS.Response, next: ExpressJS.NextFunction) => {
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
