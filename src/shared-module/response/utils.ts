import type { Response as Res } from "express";
import { ResponseCode, UserServiceResponseStatusCodes } from "./constants.js";
import { UserServiceResponceBodyPattern } from "../types/responses/json-body-type.js";

export function handle_response<T>({
    res,
    response_code,
    message,
    errors,
    data,
}: {
    res: Res;
    response_code: ResponseCode;
    message: string;
    errors?: string[];
    data?: T;
}): void {
    const status_code = UserServiceResponseStatusCodes[response_code];

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
