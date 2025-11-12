import type e from "express";
import {
    type I_UserServiceResponseStatusCodes,
    type ResponseCode,
    UserServiceResponseStatusCodes,
} from "../../shared/constants/response.constants.js";
import type { UserServiceResponseBodyPattern } from "../../shared/response-patterns/response-json-body-shape.js";

export function all_responses_handler<T>({
    res,
    response_code,
    message,
    ok,
    errors,
    data,
}: {
    res: e.Response;
    response_code: ResponseCode;
    message: string;
    errors?: string[];
    ok: boolean;
    data?: T;
}): void {
    const status_code: I_UserServiceResponseStatusCodes = UserServiceResponseStatusCodes[response_code];

    const paylaod: UserServiceResponseBodyPattern<T> = {
        data: data ?? null,
        errors: errors ?? [],
        ok,
        message,
        status_code: status_code,
        response_code: response_code,
    };
    res.status(status_code).json(paylaod);
    return;
}
