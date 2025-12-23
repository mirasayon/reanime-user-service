import { goReplyHttp } from "#/handlers/all-http-responder.js";
import type { PingSectionResponseTypes } from "#/shared/response-patterns-shared/ping.routes.js";
import type { default as ExpressJS } from "express";

class PingSectionControllerClass {
    get = (req: ExpressJS.Request, res: ExpressJS.Response) => {
        const data: PingSectionResponseTypes.get = "pong";
        const message = "OK";
        return goReplyHttp.ok(res, { data, message });
    };
}
export const pingSectionController = new PingSectionControllerClass();
