import consola from "consola";
import type e from "express";
import { Reply } from "../../response/handlers.js";
import {
    BadGatewayException,
    InternalServerErrorException,
    MediaServerErrorException,
    MediaServerNotAvalableException,
    NotImplementedException,
} from "./exceptions.js";

export const unknown_exception_handler = (error: unknown, req: e.Request, res: e.Response, next: e.NextFunction): void => {
    consola.fatal("Unknown error: ", error);
    return Reply.internal_server_error(res, {});
};

/** Expected Internal Error Handler */
export const server_exception_handler = (error: unknown, req: e.Request, res: e.Response, next: e.NextFunction) => {
    if (error instanceof MediaServerErrorException) {
        return Reply.media_sevice_error(res, {});
    }

    if (error instanceof InternalServerErrorException) {
        return Reply.internal_server_error(res, {});
    }
    if (error instanceof BadGatewayException) {
        return Reply.internal_server_error(res, {});
    }
    if (error instanceof NotImplementedException) {
        return Reply.not_implemented(res, {});
    }
    if (error instanceof MediaServerNotAvalableException) {
        return Reply.media_sevice_unavailable(res, {});
    }
    return next(error);
};

