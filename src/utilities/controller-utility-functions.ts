import { UnexpectedInternalServerErrorException } from "#/errors/server-side-exceptions.js";
import { default as ExpressJS } from "express";
/** Возвращает исключение `UnexpectedInternalServerErrorException`, если DTO не заполнен. */
export function checkRequestForValidity<CustomReq extends ExpressJS.Request>(req: CustomReq, dtos: ("dto" | "sessionDto" | "file")[]) {
    for (const neededDto of dtos) {
        if (!Object.hasOwn(req, neededDto)) {
            throw new UnexpectedInternalServerErrorException(`Нет поля: "${neededDto}" в теле запроса`, checkRequestForValidity.name);
        }
    }
    return req as Required<CustomReq>;
}
