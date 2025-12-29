import type ExpressJS from "express";
import { allHttpResponseHandler } from "./all-http-responder-utils.ts";
import {
    userServiceHttpResponseConventionalCodes,
    type UserServiceHttpResponseBodyOptionalMessage,
    type UserServiceHttpResponseBodyOptionalMessageAndData,
    type UserServiceHttpResponseBodyOptionalMessageAndErrors,
} from "#src/shared/user-service-response-types-for-all.routes.ts";

export const goReplyHttp = new (class goReplyHttpServiceClass {
    ok = <T>(res: ExpressJS.Response, { message = "OK", data }: UserServiceHttpResponseBodyOptionalMessageAndData<T>) => {
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.OK, message, data, ok: true });
    };
    created = <T>(res: ExpressJS.Response, { message = "Created", data }: UserServiceHttpResponseBodyOptionalMessageAndData<T>) => {
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.CREATED, message, data, ok: true });
    };
    accepted = <T>(res: ExpressJS.Response, { data, message = "Accepted" }: UserServiceHttpResponseBodyOptionalMessageAndData<T>) => {
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.ACCEPTED, message, data, ok: true });
    };
    bad_request = (res: ExpressJS.Response, { errors, message = "Bad Request Error" }: UserServiceHttpResponseBodyOptionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.BAD_REQUEST, message, errors, ok: false });
    };
    use_secure_http = (res: ExpressJS.Response) => {
        const message = "Use Secure HTTP";
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.USE_SECURE_HTTP, message, ok: false });
    };
    unauthorized = (res: ExpressJS.Response, { message = "Unauthorized Error", errors }: UserServiceHttpResponseBodyOptionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.UNAUTHORIZED, message, ok: false, errors });
    };
    forbidden = (res: ExpressJS.Response, { message = "Forbidden Error", errors }: UserServiceHttpResponseBodyOptionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.FORBIDDEN, message, errors, ok: false });
    };
    not_found = (res: ExpressJS.Response, { message = "Not Found Error", errors }: UserServiceHttpResponseBodyOptionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.NOT_FOUND, message, errors, ok: false });
    };
    conflict = (res: ExpressJS.Response, { message = "Conflict Error", errors }: UserServiceHttpResponseBodyOptionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.CONFLICT, message, errors, ok: false });
    };
    payload_too_large = (res: ExpressJS.Response, { message = "Payload Too Large Error" }: UserServiceHttpResponseBodyOptionalMessage) => {
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.PAYLOAD_TOO_LARGE, message, ok: false });
    };
    too_many_requests = (res: ExpressJS.Response, { message = "Too Many Requests Error" }: UserServiceHttpResponseBodyOptionalMessage) => {
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.TOO_MANY_REQUESTS, message, ok: false });
    };
    not_implemented = (res: ExpressJS.Response, { message = "Not Implemented" }: UserServiceHttpResponseBodyOptionalMessage) => {
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.NOT_IMPLEMENTED, message, ok: false });
    };
    internal_server_error = (res: ExpressJS.Response, { message = "Internal Server Error" }: UserServiceHttpResponseBodyOptionalMessage) => {
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.UNEXPECTED_INTERNAL_ERROR, message, ok: false });
    };
    service_unavailable = (res: ExpressJS.Response, { message = "Service Unavailable Error" }: UserServiceHttpResponseBodyOptionalMessage) => {
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.SERVICE_UNAVAILABLE, message, ok: false });
    };
    i_am_a_teapot = (res: ExpressJS.Response) => {
        const message = "I'm a teapot";
        return allHttpResponseHandler({ res, response_code: userServiceHttpResponseConventionalCodes.I_AM_A_TEAPOT, message, ok: false });
    };
})();
