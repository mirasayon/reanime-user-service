import type { AuthMiddlewareDTO } from "#/types/auth-middleware-shape.js";
import type { default as ExpressJS } from "express";
export type Request_dto_auth<DTO_Type, Params extends { [key: string]: string } = {}> = ExpressJS.Request<Params> & {
    dto?: DTO_Type;
    sessionDto?: AuthMiddlewareDTO;
};
