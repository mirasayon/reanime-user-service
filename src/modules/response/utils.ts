import type { default as ExpressJS } from "express";
import { type I_UserServiceResponseStatusCodes, type ResponseHTTPCodes, ResponseHTTPStatusCodes } from "../../shared/constants/response.constants.js";
import type { HTTPResponseBodyPattern } from "../../shared/response-patterns/response-json-body-shape.js";

export function allHttpResponseHandler<T>({
    res,
    response_code,
    message,
    ok,
    errors,
    data,
}: {
    res: ExpressJS.Response;
    response_code: ResponseHTTPCodes;
    message: string;
    errors?: string[];
    ok: boolean;
    data?: T;
}): void {
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
