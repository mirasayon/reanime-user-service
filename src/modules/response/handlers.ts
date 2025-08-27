import type e from "express";
import { ResponseCode } from "../../shared/constants/response.constants.js";
import { handle_response } from "./utils.js";
import type { optionalMessage, optionalMessageAndData, optionalMessageAndErrors } from "../../shared/response-patterns/response-json-body-shape.js";

export const Reply = new (class xReply_Service {
    ok = <T>(res: e.Response, { message = "OK", data }: optionalMessageAndData<T>) => {
        return handle_response({ res, response_code: ResponseCode.OK, message, data });
    };
    created = <T>(res: e.Response, { message = "Created", data }: optionalMessageAndData<T>) => {
        return handle_response({ res, response_code: ResponseCode.CREATED, message, data });
    };
    accepted = <T>(res: e.Response, { data, message = "Accepted" }: optionalMessageAndData<T>) => {
        return handle_response({ res, response_code: ResponseCode.ACCEPTED, message, data });
    };
    bad_request = (res: e.Response, { errors, message = "Bad Request" }: optionalMessageAndErrors) => {
        return handle_response({ res, response_code: ResponseCode.BAD_REQUEST, message, errors });
    };
    unauthorized = (res: e.Response, { message = "Unauthorized", errors }: optionalMessageAndErrors) => {
        return handle_response({ res, response_code: ResponseCode.UNAUTHORIZED, message, errors });
    };
    forbidden = (res: e.Response, { message = "Forbidden", errors }: optionalMessageAndErrors) => {
        return handle_response({ res, response_code: ResponseCode.FORBIDDEN, message, errors });
    };
    not_found = (res: e.Response, { message = "Not Found", errors }: optionalMessageAndErrors) => {
        return handle_response({ res, response_code: ResponseCode.NOT_FOUND, message, errors });
    };
    conflict = (res: e.Response, { message = "Conflict", errors }: optionalMessageAndErrors) => {
        return handle_response({ res, response_code: ResponseCode.CONFLICT, message, errors });
    };
    payload_too_large = (res: e.Response, { message = "Payload Too Large" }: optionalMessage) => {
        return handle_response({ res, response_code: ResponseCode.PAYLOAD_TOO_LARGE, message });
    };
    too_many_reqeusts = (res: e.Response, { message = "Too Many Requests" }: optionalMessage) => {
        return handle_response({ res, response_code: ResponseCode.TOO_MANY_REQUESTS, message });
    };
    not_implemented = (res: e.Response, { message = "Not Implemented" }: optionalMessage) => {
        return handle_response({ res, response_code: ResponseCode.NOT_IMPLEMENTED, message });
    };
    internal_server_error = (res: e.Response, { message = "Internal Server Error" }: optionalMessage) => {
        return handle_response({ res, response_code: ResponseCode.INTERNAL_ERROR, message });
    };
    service_unavailable = (res: e.Response, { message = "Service Unavailable" }: optionalMessage) => {
        return handle_response({ res, response_code: ResponseCode.SERVICE_UNAVAILABLE, message });
    };
    media_sevice_unavailable = (res: e.Response, { message = "Media Service Unavailable" }: optionalMessage) => {
        return handle_response({ res, response_code: ResponseCode.MEDIA_SERVICE_NOT_AVAILABLE, message });
    };
    media_sevice_error = (res: e.Response, { message = "Media Service Error" }: optionalMessage) => {
        return handle_response({ res, response_code: ResponseCode.MEDIA_SERVICE_ERROR, message });
    };
    i_am_a_teapot = (res: e.Response) => {
        const message = "I'm a teapot";
        return handle_response({ res, response_code: ResponseCode.I_AM_A_TEAPOT, message });
    };
})();

