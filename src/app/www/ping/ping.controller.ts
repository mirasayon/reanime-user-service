import { xResponse } from "@xamarin.city/reanime/user-service/patterns/response/handlers.js";
import type e from "express";

export const Ping_Controller = new (class Ping_Controller {
    get = (req: e.Request, res: e.Response) => {
        return xResponse.ok(res, {
            data: "pong",
            message: "OK",
        });
    };
})();
