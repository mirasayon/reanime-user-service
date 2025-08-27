import type { mid_auth_dto } from "#/types/auth-middleware-shape.js";
import type e from "express";

export type Request_dto_auth<DTO_Type, Params extends { [key: string]: string } = {}> = e.Request<Params> & {
    dto?: DTO_Type;
    auth?: mid_auth_dto;
};

