import type { AuthMiddlewareDTO } from "#/types/auth-middleware-shape.js";
import type { default as ExpressJS } from "express";
export type RequestDtoTypeFactory<DtoType, Params extends { [key: string]: string } = {}> = ExpressJS.Request<Params> & {
    dto?: DtoType;
    sessionDto?: AuthMiddlewareDTO;
};
