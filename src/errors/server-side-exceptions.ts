import { ResponseHTTPCodes } from "#/shared/constants/response.constants.js";
import consola from "consola";
type UnexpectedInternalServerErrorExceptionOptions = {
    service_name: string;
    errorMessageToClient: string;
    errorItselfOrPrivateMessageToServer: unknown;
};
export type ServerSideExceptionClasses =
    | UnexpectedInternalServerErrorException
    | ExpectedInternalServerErrorException
    | BadGatewayException
    | NotImplementedException
    | ServiceUnavailableException;

export class UnexpectedInternalServerErrorException {
    readonly response_code = ResponseHTTPCodes.UNEXPECTED_INTERNAL_ERROR;
    readonly name = UnexpectedInternalServerErrorException.name;
    readonly service_name: string;
    readonly errorMessageToClient: string;
    readonly errorItselfOrPrivateMessageToServer: unknown;
    constructor({ errorItselfOrPrivateMessageToServer, errorMessageToClient, service_name }: UnexpectedInternalServerErrorExceptionOptions) {
        this.errorItselfOrPrivateMessageToServer = errorItselfOrPrivateMessageToServer;
        this.errorMessageToClient = errorMessageToClient;
        this.service_name = service_name;
        consola.error(`Error ${this.name}. From ${service_name} function/method: `, errorItselfOrPrivateMessageToServer);
    }
}

export class ExpectedInternalServerErrorException {
    readonly response_code = ResponseHTTPCodes.EXPECTED_INTERNAL_ERROR;
    readonly name = ExpectedInternalServerErrorException.name;

    constructor(readonly errorMessage: string) {
        consola.error(`Error ${this.name}: `, errorMessage);
    }
}
export class BadGatewayException {
    readonly response_code = ResponseHTTPCodes.BAD_GATEWAY;
    readonly name = BadGatewayException.name;
    constructor(
        readonly error: unknown,
        readonly service_name?: string,
    ) {
        consola.error(`${this.name}: `, error);
    }
}
export class NotImplementedException {
    readonly response_code = ResponseHTTPCodes.NOT_IMPLEMENTED;
    readonly name = NotImplementedException.name;
    constructor(
        readonly error: unknown,
        readonly service_name?: string,
    ) {
        consola.error(`${this.name}: `, error);
    }
}
export class ServiceUnavailableException {
    readonly response_code = ResponseHTTPCodes.SERVICE_UNAVAILABLE;
    readonly name = ServiceUnavailableException.name;
    constructor(
        readonly error: unknown,
        readonly service_name?: string,
    ) {
        consola.error(`${this.name}: `, error);
    }
}
