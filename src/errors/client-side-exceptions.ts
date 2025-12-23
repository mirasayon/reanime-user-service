import { responseHTTPCodes } from "../shared/response-codes-constants.shared.js";

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
    public readonly response_code = responseHTTPCodes.BAD_REQUEST;
    constructor(public readonly errors: string[]) {}
}

export class TooManyRequestsException {
    public readonly response_code = responseHTTPCodes.TOO_MANY_REQUESTS;
    constructor(public readonly message: string) {}
}

export class ConflictException {
    public readonly response_code = responseHTTPCodes.CONFLICT;
    constructor(public readonly errors: string[]) {}
}
export class PayloadTooLargeException {
    public readonly response_code = responseHTTPCodes.PAYLOAD_TOO_LARGE;
    constructor(public readonly error: string) {}
}

export class ImATeapotException {
    public readonly response_code = responseHTTPCodes.I_AM_A_TEAPOT;
}

export class NotFoundException {
    public readonly response_code = responseHTTPCodes.NOT_FOUND;
    constructor(public readonly errors: string[] = []) {}
}

export class UseSecureHTTPException {
    public readonly response_code = responseHTTPCodes.USE_SECURE_HTTP;
}

export class UnauthorizedException {
    public readonly response_code = responseHTTPCodes.UNAUTHORIZED;
    constructor(public readonly errors: string[] = []) {}
}

export class ForbiddenException {
    public readonly response_code = responseHTTPCodes.FORBIDDEN;
    constructor(public readonly errors: string[]) {}
}
