import { goReplyHttp } from "#/handlers/all-http-responder.js";
import type { ResponseTypesFor_Ping_Section } from "#/shared/response-patterns-shared/ping.response-types.routes.js";
import type { default as ExpressJS } from "express";

class PingSectionControllerClass {
    get = (req: ExpressJS.Request, res: ExpressJS.Response) => {
        const data: ResponseTypesFor_Ping_Section.get = "pong";
        const message = "OK";
        return goReplyHttp.ok(res, { data, message });
    };
}
export const pingSectionController = new PingSectionControllerClass();
