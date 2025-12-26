import type ExpressJS from "express";
import {
    type HTTPResponseBodyPattern,
    type I_UserServiceResponseStatusCodes,
    type responseHTTPCodes,
    ResponseHTTPStatusCodes,
} from "#/shared/response-codes-constants.shared.js";

type AllHTTPResponseBody<T> = {
    res: ExpressJS.Response;
    /** HTTP status */
    response_code: responseHTTPCodes;
    message: string;
    errors?: string[];
    ok: boolean;
    data?: T;
};
export function allHttpResponseHandler<T>({ res, response_code, message, ok, errors, data }: AllHTTPResponseBody<T>): void {
    const status_code: I_UserServiceResponseStatusCodes = ResponseHTTPStatusCodes[response_code];

    const payload: HTTPResponseBodyPattern<T> = {
        data: data ?? null,
        errors: errors ?? [],
        ok,
        message,
        status_code: status_code,
        response_code: response_code,
    };
    res.status(status_code).json(payload);
    return;
}
