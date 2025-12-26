import { ForbiddenException } from "#/errors/client-side-exceptions.js";
import type ExpressJS from "express";

/** Middleware for checking client IP */
export function requireClientIpMiddleware(req: ExpressJS.Request, res: ExpressJS.Response, next: ExpressJS.NextFunction) {
    if (!req.ip) {
        throw new ForbiddenException(["Запрещено: требуется IP-адрес клиента."]);
    }
    next();
}
