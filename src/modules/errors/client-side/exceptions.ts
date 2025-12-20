import { ResponseHTTPCodes } from "../../../shared/constants/response.constants.js";

export type ClientSideExceptionClasses =
    | BadRequestException
    | TooManyRequestsException
    | ConflictException
    | ImATeapotException
    | NotFoundException
    | UnauthorizedException
    | ForbiddenException
    | UseSecureHTTPException;

export class BadRequestException {
    public readonly response_code = ResponseHTTPCodes.BAD_REQUEST;
    constructor(public readonly errors: string[]) {}
}

export class TooManyRequestsException {
    public readonly response_code = ResponseHTTPCodes.TOO_MANY_REQUESTS;
    constructor(public readonly message: string) {}
}

export class ConflictException {
    public readonly response_code = ResponseHTTPCodes.CONFLICT;
    constructor(public readonly errors: string[]) {}
}
export class PayloadTooLargeException {
    public readonly response_code = ResponseHTTPCodes.PAYLOAD_TOO_LARGE;
    constructor(public readonly error: string) {}
}

export class ImATeapotException {
    public readonly response_code = ResponseHTTPCodes.I_AM_A_TEAPOT;
}

export class NotFoundException {
    public readonly response_code = ResponseHTTPCodes.NOT_FOUND;
    constructor(public readonly errors: string[] = []) {}
}

export class UseSecureHTTPException {
    public readonly response_code = ResponseHTTPCodes.USE_SECURE_HTTP;
}

export class UnauthorizedException {
    public readonly response_code = ResponseHTTPCodes.UNAUTHORIZED;
    constructor(public readonly errors: string[] = []) {}
}

export class ForbiddenException {
    public readonly response_code = ResponseHTTPCodes.FORBIDDEN;
    constructor(public readonly errors: string[]) {}
}
