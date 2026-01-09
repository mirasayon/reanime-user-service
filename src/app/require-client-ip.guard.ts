import { ForbiddenException } from "#src/errors/client-side-exceptions.ts";
import type ExpressJS from "express";
export const USER_IP_HEADER_NAME = "x-user-ip";
export const USER_AGENT_HEADER_NAME = "x-user-agent";
/** Middleware for checking client IP */
export function requireClientIpMiddleware(req: ExpressJS.Request, res: ExpressJS.Response, next: ExpressJS.NextFunction) {
    if (!req.ip) {
        throw new ForbiddenException(["Forbidden"]);
    }
    if (req.headers[USER_IP_HEADER_NAME]) {
        return next();
    }
    throw new ForbiddenException(["Forbidden"]);
}
