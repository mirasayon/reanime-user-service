import { userServiceHttpResponseConventionalCodes } from "#/shared/user-service-response-codes-constants.js";
import consola from "consola";

export type ServerSideExceptionClasses =
    | UnexpectedInternalServerErrorException
    | ExpectedInternalServerErrorException
    | BadGatewayException
    | NotImplementedException
    | ServiceUnavailableException;

export class UnexpectedInternalServerErrorException {
    readonly response_code = userServiceHttpResponseConventionalCodes.UNEXPECTED_INTERNAL_ERROR;
    readonly name = UnexpectedInternalServerErrorException.name;
    constructor(
        readonly messageToServer: string,
        readonly service_name: string,
    ) {
        consola.error(`Error ${this.name}. From ${service_name}():`, messageToServer);
    }
}

export class ExpectedInternalServerErrorException {
    readonly response_code = userServiceHttpResponseConventionalCodes.EXPECTED_INTERNAL_ERROR;
    readonly name = ExpectedInternalServerErrorException.name;

    constructor(readonly errorMessage: string) {
        consola.error(`Error ${this.name}: `, errorMessage);
    }
}
export class BadGatewayException {
    readonly response_code = userServiceHttpResponseConventionalCodes.BAD_GATEWAY;
    readonly name = BadGatewayException.name;
    constructor(
        readonly error: unknown,
        readonly service_name?: string,
    ) {
        consola.error(`${this.name}: `, error);
    }
}
export class NotImplementedException {
    readonly response_code = userServiceHttpResponseConventionalCodes.NOT_IMPLEMENTED;
    readonly name = NotImplementedException.name;
    constructor(
        readonly error: unknown,
        readonly service_name?: string,
    ) {
        consola.error(`${this.name}: `, error);
    }
}
export class ServiceUnavailableException {
    readonly response_code = userServiceHttpResponseConventionalCodes.SERVICE_UNAVAILABLE;
    readonly name = ServiceUnavailableException.name;
    constructor(
        readonly error: unknown,
        readonly service_name?: string,
    ) {
        consola.error(`${this.name}: `, error);
    }
}
