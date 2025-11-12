import type e from "express";
import { ResponseCode } from "../../shared/constants/response.constants.js";
import { all_responses_handler } from "./utils.js";
import type { optionalMessage, optionalMessageAndData, optionalMessageAndErrors } from "#/shared/response-patterns/response-json-body-shape.js";

export const Reply = new (class xReply_Service {
    ok = <T>(res: e.Response, { message = "OK", data }: optionalMessageAndData<T>) => {
        return all_responses_handler({ res, response_code: ResponseCode.OK, message, data, ok: true });
    };
    created = <T>(res: e.Response, { message = "Created", data }: optionalMessageAndData<T>) => {
        return all_responses_handler({ res, response_code: ResponseCode.CREATED, message, data, ok: true });
    };
    accepted = <T>(res: e.Response, { data, message = "Accepted" }: optionalMessageAndData<T>) => {
        return all_responses_handler({ res, response_code: ResponseCode.ACCEPTED, message, data, ok: true });
    };
    bad_request = (res: e.Response, { errors, message = "Bad Request" }: optionalMessageAndErrors) => {
        return all_responses_handler({ res, response_code: ResponseCode.BAD_REQUEST, message, errors, ok: false });
    };
    unauthorized = (res: e.Response, { message = "Unauthorized", errors }: optionalMessageAndErrors) => {
        return all_responses_handler({ res, response_code: ResponseCode.UNAUTHORIZED, message, errors, ok: false });
    };
    forbidden = (res: e.Response, { message = "Forbidden", errors }: optionalMessageAndErrors) => {
        return all_responses_handler({ res, response_code: ResponseCode.FORBIDDEN, message, errors, ok: false });
    };
    not_found = (res: e.Response, { message = "Not Found", errors }: optionalMessageAndErrors) => {
        return all_responses_handler({ res, response_code: ResponseCode.NOT_FOUND, message, errors, ok: false });
    };
    conflict = (res: e.Response, { message = "Conflict", errors }: optionalMessageAndErrors) => {
        return all_responses_handler({ res, response_code: ResponseCode.CONFLICT, message, errors, ok: false });
    };
    payload_too_large = (res: e.Response, { message = "Payload Too Large" }: optionalMessage) => {
        return all_responses_handler({ res, response_code: ResponseCode.PAYLOAD_TOO_LARGE, message, ok: false });
    };
    too_many_requests = (res: e.Response, { message = "Too Many Requests" }: optionalMessage) => {
        return all_responses_handler({ res, response_code: ResponseCode.TOO_MANY_REQUESTS, message, ok: false });
    };
    not_implemented = (res: e.Response, { message = "Not Implemented" }: optionalMessage) => {
        return all_responses_handler({ res, response_code: ResponseCode.NOT_IMPLEMENTED, message, ok: false });
    };
    internal_server_error = (res: e.Response, { message = "Internal Server Error" }: optionalMessage) => {
        return all_responses_handler({ res, response_code: ResponseCode.UNEXPECTED_INTERNAL_ERROR, message, ok: false });
    };
    service_unavailable = (res: e.Response, { message = "Service Unavailable" }: optionalMessage) => {
        return all_responses_handler({ res, response_code: ResponseCode.SERVICE_UNAVAILABLE, message, ok: false });
    };
    i_am_a_teapot = (res: e.Response) => {
        const message = "I'm a teapot";
        return all_responses_handler({ res, response_code: ResponseCode.I_AM_A_TEAPOT, message, ok: false });
    };
})();
