import { ResponseCode } from "../../../shared/constants/response.constants.js";

export type ClientSideExceptionClasses =
    | BadRequestException
    | TooManyRequestsException
    | ConflictException
    | ImATeapotException
    | NotFoundException
    | UnauthorizedException
    | ForbiddenException;

export class BadRequestException {
    public readonly response_code = ResponseCode.BAD_REQUEST;
    constructor(public readonly errors: string[]) {}
}

export class TooManyRequestsException {
    public readonly response_code = ResponseCode.TOO_MANY_REQUESTS;
    constructor(public readonly message: string) {}
}

export class ConflictException {
    public readonly response_code = ResponseCode.CONFLICT;
    constructor(public readonly errors: string[]) {}
}
export class PayloadTooLargeException {
    public readonly response_code = ResponseCode.PAYLOAD_TOO_LARGE;
    constructor(public readonly error: string) {}
}

export class ImATeapotException {
    public readonly response_code = ResponseCode.I_AM_A_TEAPOT;
    constructor() {}
}

export class NotFoundException {
    public readonly response_code = ResponseCode.NOT_FOUND;
    constructor(public readonly errors: string[]) {}
}

export class UnauthorizedException {
    public readonly response_code = ResponseCode.UNAUTHORIZED;
    constructor(public readonly errors: string[]) {}
}

export class ForbiddenException {
    public readonly response_code = ResponseCode.FORBIDDEN;
    constructor(public readonly errors: string[]) {}
}
