import type { DtoTypeForAuthSession } from "#src/types/auth-middleware-shape.ts";
import type ExpressJS from "express";
export type RequestDtoTypeFactory<DtoType, Params extends { [key: string]: string } = {}> = ExpressJS.Request<Params> & {
    dto?: DtoType;
    sessionDto?: DtoTypeForAuthSession;
};
