import type { mid_auth_dto } from "#/types/auth-middleware-shape.js";
import { default as ExpressJS } from "express";
export type Request_dto_auth<DTO_Type, Params extends { [key: string]: string } = {}> = ExpressJS.Request<Params> & {
    dto?: DTO_Type;
    auth?: mid_auth_dto;
};
