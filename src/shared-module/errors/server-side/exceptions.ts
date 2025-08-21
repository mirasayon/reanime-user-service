import consola from "consola";
import { ResponseCode } from "../../response/constants.js";
export type ServerSideExceptionClasses =
    | MediaServerErrorException
    | InternalServerErrorException
    | BadGatewayException
    | NotImplementedException
    | MediaServerNotAvalableException;

export class MediaServerErrorException {
    readonly response_code = ResponseCode.MEDIA_SERVICE_ERROR;
    readonly name = MediaServerErrorException.name;
    constructor(readonly error: unknown, readonly service_name?: string) {
        consola.error(`${this.name}: `, error);
    }
}
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
export class MediaServerNotAvalableException {
    readonly response_code = ResponseCode.MEDIA_SERVICE_NOT_AVAILABLE;
    constructor(readonly error: unknown, readonly service_name?: string) {
        consola.error(`${MediaServerNotAvalableException.name}: `, error);
    }
}
