import { goReplyHttp } from "#src/handlers/all-http-responder.ts";
import type { ResponseTypesFor_Ping_Section } from "#src/shared/user-service-response-types-for-all.routes.ts";
import type ExpressJS from "express";

class PingSectionControllerClass {
    get = (req: ExpressJS.Request, res: ExpressJS.Response) => {
        const data: ResponseTypesFor_Ping_Section["get"] = "pong";
        const message = "OK";
        return goReplyHttp.ok(res, { data, message });
    };
}
export const pingSectionController = new PingSectionControllerClass();
