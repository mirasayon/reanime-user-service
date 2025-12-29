import { userServiceHttpResponseConventionalCodes } from "#src/shared/user-service-response-types-for-all.routes.ts";

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
    public readonly response_code = userServiceHttpResponseConventionalCodes.BAD_REQUEST;
    public readonly errors: string[];
    constructor(errors: string[]) {
        this.errors = errors;
    }
}

export class TooManyRequestsException {
    public readonly response_code = userServiceHttpResponseConventionalCodes.TOO_MANY_REQUESTS;
    public readonly message: string;
    constructor(message: string) {
        this.message = message;
    }
}

export class ConflictException {
    public readonly response_code = userServiceHttpResponseConventionalCodes.CONFLICT;
    public readonly errors: string[];
    constructor(errors: string[]) {
        this.errors = errors;
    }
}
export class PayloadTooLargeException {
    public readonly response_code = userServiceHttpResponseConventionalCodes.PAYLOAD_TOO_LARGE;
    public readonly message: string;
    constructor(message: string) {
        this.message = message;
    }
}

export class ImATeapotException {
    public readonly response_code = userServiceHttpResponseConventionalCodes.I_AM_A_TEAPOT;
}

export class NotFoundException {
    public readonly response_code = userServiceHttpResponseConventionalCodes.NOT_FOUND;
    public readonly errors: string[];
    constructor(errors?: string[] | undefined) {
        this.errors = errors || [];
    }
}

export class UseSecureHTTPException {
    public readonly response_code = userServiceHttpResponseConventionalCodes.USE_SECURE_HTTP;
}

export class UnauthorizedException {
    public readonly response_code = userServiceHttpResponseConventionalCodes.UNAUTHORIZED;
    public readonly errors: string[];
    constructor(errors?: string[]) {
        this.errors = errors || [];
    }
}

export class ForbiddenException {
    public readonly response_code = userServiceHttpResponseConventionalCodes.FORBIDDEN;
    public readonly errors: string[];
    constructor(errors: string[]) {
        this.errors = errors;
    }
}
