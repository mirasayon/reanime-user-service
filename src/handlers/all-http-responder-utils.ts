import type ExpressJS from "express";
import {
    type UserServiceHttpResponseBodyPatternType,
    type UserServiceHttpResponseStatusCodeType,
    type UserServiceHttpResponseConventionalCodeType,
    userServiceHttpResponseStatusCodes,
} from "#src/shared/user-service-response-types-for-all.routes.ts";

type AllHTTPResponseBody<T> = {
    res: ExpressJS.Response;
    /** HTTP status */
    response_code: UserServiceHttpResponseConventionalCodeType;
    message: string;
    errors?: string[];
    ok: boolean;
    data?: T;
};
export function allHttpResponseHandler<T>({ res, response_code, message, ok, errors, data }: AllHTTPResponseBody<T>): void {
    const status_code: UserServiceHttpResponseStatusCodeType = userServiceHttpResponseStatusCodes[response_code];

    const payload: UserServiceHttpResponseBodyPatternType<T> = {
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
