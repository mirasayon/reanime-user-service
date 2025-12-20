import type { optionalMessage, optionalMessageAndData, optionalMessageAndErrors } from "#/shared/response-patterns/response-json-body-shape.js";
import type e from "express";
import { ResponseHTTPCodes } from "../../shared/constants/response.constants.js";
import { allHttpResponseHandler } from "./utils.js";

export const goReplyHttp = new (class goReplyHttpServiceClass {
    ok = <T>(res: e.Response, { message = "OK", data }: optionalMessageAndData<T>) => {
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.OK, message, data, ok: true });
    };
    created = <T>(res: e.Response, { message = "Created", data }: optionalMessageAndData<T>) => {
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.CREATED, message, data, ok: true });
    };
    accepted = <T>(res: e.Response, { data, message = "Accepted" }: optionalMessageAndData<T>) => {
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.ACCEPTED, message, data, ok: true });
    };
    bad_request = (res: e.Response, { errors, message = "Bad Request Error" }: optionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.BAD_REQUEST, message, errors, ok: false });
    };
    use_secure_http = (res: e.Response) => {
        const message = "Use Secure HTTP";
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.USE_SECURE_HTTP, message, ok: false });
    };
    unauthorized = (res: e.Response, { message = "Unauthorized Error", errors }: optionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.UNAUTHORIZED, message, errors, ok: false });
    };
    forbidden = (res: e.Response, { message = "Forbidden Error", errors }: optionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.FORBIDDEN, message, errors, ok: false });
    };
    not_found = (res: e.Response, { message = "Not Found Error", errors }: optionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.NOT_FOUND, message, errors, ok: false });
    };
    conflict = (res: e.Response, { message = "Conflict Error", errors }: optionalMessageAndErrors) => {
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.CONFLICT, message, errors, ok: false });
    };
    payload_too_large = (res: e.Response, { message = "Payload Too Large Error" }: optionalMessage) => {
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.PAYLOAD_TOO_LARGE, message, ok: false });
    };
    too_many_requests = (res: e.Response, { message = "Too Many Requests Error" }: optionalMessage) => {
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.TOO_MANY_REQUESTS, message, ok: false });
    };
    not_implemented = (res: e.Response, { message = "Not Implemented" }: optionalMessage) => {
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.NOT_IMPLEMENTED, message, ok: false });
    };
    internal_server_error = (res: e.Response, { message = "Internal Server Error" }: optionalMessage) => {
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.UNEXPECTED_INTERNAL_ERROR, message, ok: false });
    };
    service_unavailable = (res: e.Response, { message = "Service Unavailable Error" }: optionalMessage) => {
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.SERVICE_UNAVAILABLE, message, ok: false });
    };
    i_am_a_teapot = (res: e.Response) => {
        const message = "I'm a teapot";
        return allHttpResponseHandler({ res, response_code: ResponseHTTPCodes.I_AM_A_TEAPOT, message, ok: false });
    };
})();
