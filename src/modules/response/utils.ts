import type e from "express";
import { type I_UserServiceResponseStatusCodes, type ResponseCode, UserServiceResponseStatusCodes } from "./response.constants.js";
import type { UserServiceResponceBodyPattern } from "../../shared/types/responses/json-body-type.js";

export function handle_response<T>({
    res,
    response_code,
    message,
    errors,
    data,
}: {
    res: e.Response;
    response_code: ResponseCode;
    message: string;
    errors?: string[];
    data?: T;
}): void {
    const status_code: I_UserServiceResponseStatusCodes = UserServiceResponseStatusCodes[response_code];

    const paylaod: UserServiceResponceBodyPattern<T> = {
        data: data ?? null,
        errors: errors ?? [],
        message,
        status_code: status_code,
        response_code: response_code,
    };
    res.status(status_code).json(paylaod);
    return;
}
