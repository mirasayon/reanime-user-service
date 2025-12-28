import { userServiceHttpResponseConventionalCodes } from "#src/shared/user-service-response-types-for-all.routes.ts";
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
    readonly messageToServer: string;
    readonly service_name: string;
    constructor(messageToServer: string, service_name: string) {
        this.messageToServer = messageToServer;
        this.service_name = service_name;
        consola.error(`Error ${this.name}. From ${service_name}():`, messageToServer);
    }
}

export class ExpectedInternalServerErrorException {
    readonly response_code = userServiceHttpResponseConventionalCodes.EXPECTED_INTERNAL_ERROR;
    readonly name = ExpectedInternalServerErrorException.name;
    readonly errorMessage: string;
    constructor(errorMessage: string) {
        this.errorMessage = errorMessage;
        consola.error(`Error ${this.name}: `, errorMessage);
    }
}
export class BadGatewayException {
    readonly response_code = userServiceHttpResponseConventionalCodes.BAD_GATEWAY;
    readonly name = BadGatewayException.name;
    readonly error: unknown;
    readonly service_name?: string | undefined;
    constructor(error: unknown, service_name?: string) {
        this.error = error;
        this.service_name = service_name || undefined;
        consola.error(`${this.name}: `, error);
    }
}
export class NotImplementedException {
    readonly response_code = userServiceHttpResponseConventionalCodes.NOT_IMPLEMENTED;
    readonly name = NotImplementedException.name;
    readonly error: unknown;
    readonly service_name?: string | undefined;
    constructor(error: unknown, service_name?: string) {
        this.error = error;
        this.service_name = service_name || undefined;
        consola.error(`${this.name}: `, error);
    }
}
export class ServiceUnavailableException {
    readonly response_code = userServiceHttpResponseConventionalCodes.SERVICE_UNAVAILABLE;
    readonly name = ServiceUnavailableException.name;
    readonly error: unknown;
    readonly service_name?: string | undefined;
    constructor(error: unknown, service_name?: string) {
        this.error = error;
        this.service_name = service_name || undefined;
        consola.error(`${this.name}: `, error);
    }
}
