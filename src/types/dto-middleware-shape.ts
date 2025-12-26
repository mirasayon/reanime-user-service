import type { DtoTypeForAuthSession } from "#/types/auth-middleware-shape.js";
import type ExpressJS from "express";
export type RequestDtoTypeFactory<DtoType, Params extends { [key: string]: string } = {}> = ExpressJS.Request<Params> & {
    dto?: DtoType;
    sessionDto?: DtoTypeForAuthSession;
};
