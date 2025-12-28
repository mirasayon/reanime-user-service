import { UnexpectedInternalServerErrorException } from "#src/errors/server-side-exceptions.ts";
import type ExpressJS from "express";
/** Возвращает исключение `UnexpectedInternalServerErrorException`, если DTO не заполнен. */
export function checkRequestForValidity<CustomReq extends ExpressJS.Request, Fields extends ("dto" | "sessionDto" | "file")[]>(
    req: CustomReq,
    dtos: Fields,
) {
    for (const neededDto of dtos) {
        if (!Object.hasOwn(req, neededDto)) {
            throw new UnexpectedInternalServerErrorException(`Нет поля: "${neededDto}" в теле запроса`, checkRequestForValidity.name);
        }
    }
    return req as Required<CustomReq>;
}
