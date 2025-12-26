import type { default as ExpressJS } from "express";
import type { BodyOptionalMessage, BodyOptionalMessageAndData, BodyOptionalMessageAndErrors } from "#/shared/types/response-json-body-shape.js";
import { allHttpResponseHandler } from "./all-http-responder-utils.js";
import { responseHTTPCodes } from "#/shared/response-codes-constants.shared.js";

export const goReplyHttp = new (class goReplyHttpServiceClass {
    ok = <T>(res: ExpressJS.Response, { message = "OK", data }: BodyOptionalMessageAndData<T>) => {
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.OK, message, data, ok: true });
    };
    created = <T>(res: ExpressJS.Response, { message = "Created", data }: BodyOptionalMessageAndData<T>) => {
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.CREATED, message, data, ok: true });
    };
    accepted = <T>(res: ExpressJS.Response, { data, message = "Accepted" }: BodyOptionalMessageAndData<T>) => {
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.ACCEPTED, message, data, ok: true });
    };
    bad_request = (res: ExpressJS.Response, { errors, message = "Bad Request Error" }: BodyOptionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.BAD_REQUEST, message, errors, ok: false });
    };
    use_secure_http = (res: ExpressJS.Response) => {
        const message = "Use Secure HTTP";
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.USE_SECURE_HTTP, message, ok: false });
    };
    unauthorized = (res: ExpressJS.Response, { message = "Unauthorized Error", errors }: BodyOptionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.UNAUTHORIZED, message, errors, ok: false });
    };
    forbidden = (res: ExpressJS.Response, { message = "Forbidden Error", errors }: BodyOptionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.FORBIDDEN, message, errors, ok: false });
    };
    not_found = (res: ExpressJS.Response, { message = "Not Found Error", errors }: BodyOptionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.NOT_FOUND, message, errors, ok: false });
    };
    conflict = (res: ExpressJS.Response, { message = "Conflict Error", errors }: BodyOptionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.CONFLICT, message, errors, ok: false });
    };
    payload_too_large = (res: ExpressJS.Response, { message = "Payload Too Large Error" }: BodyOptionalMessage) => {
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.PAYLOAD_TOO_LARGE, message, ok: false });
    };
    too_many_requests = (res: ExpressJS.Response, { message = "Too Many Requests Error" }: BodyOptionalMessage) => {
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.TOO_MANY_REQUESTS, message, ok: false });
    };
    not_implemented = (res: ExpressJS.Response, { message = "Not Implemented" }: BodyOptionalMessage) => {
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.NOT_IMPLEMENTED, message, ok: false });
    };
    internal_server_error = (res: ExpressJS.Response, { message = "Internal Server Error" }: BodyOptionalMessage) => {
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.UNEXPECTED_INTERNAL_ERROR, message, ok: false });
    };
    service_unavailable = (res: ExpressJS.Response, { message = "Service Unavailable Error" }: BodyOptionalMessage) => {
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.SERVICE_UNAVAILABLE, message, ok: false });
    };
    i_am_a_teapot = (res: ExpressJS.Response) => {
        const message = "I'm a teapot";
        return allHttpResponseHandler({ res, response_code: responseHTTPCodes.I_AM_A_TEAPOT, message, ok: false });
    };
})();
