import { cEnv } from "#/configs/environment.js";
import { ImATeapotException } from "@xamarin.city/reanime/user-service/errors/client-side/exceptions.js";
import type e from "express";
/** Class for guard middlewares */
export const ApiKeyGuard = new (class ApiKeyGuard_Middleware {
    /** Middleware for all routes that checks for the presence of an API key to access services. Middleware for all routes, checking for the presence of an API key to access services. If there is no API-key in the request header, it will return a static route with status 418 */
    middleware = (req: e.Request, res: e.Response, next: e.NextFunction) => {
        if (req.headers["x-reanime-user-service-key"] === cEnv.api_keys.api_key_to_this_service) {
            return next();
        }
        throw new ImATeapotException();
    };
})();
