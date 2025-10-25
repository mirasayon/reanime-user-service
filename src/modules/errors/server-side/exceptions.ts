import consola from "consola";
import { ResponseCode } from "#/shared/constants/response.constants.js";
export type ServerSideExceptionClasses = InternalServerErrorException | BadGatewayException | NotImplementedException;

export class InternalServerErrorException {
    readonly response_code = ResponseCode.INTERNAL_ERROR;
    readonly name = InternalServerErrorException.name;
    constructor(readonly error: unknown, readonly service_name?: string) {
        consola.error(`Error ${this.name} From ${service_name}`, error);
    }
}
export class BadGatewayException {
    readonly response_code = ResponseCode.BAD_GATEWAY;
    readonly name = BadGatewayException.name;
    constructor(readonly error: unknown, readonly service_name?: string) {
        consola.error(`${this.name}: `, error);
    }
}
export class NotImplementedException {
    readonly response_code = ResponseCode.NOT_IMPLEMENTED;
    readonly name = NotImplementedException.name;
    constructor(readonly error: unknown, readonly service_name?: string) {
        consola.error(`${this.name}: `, error);
    }
}
