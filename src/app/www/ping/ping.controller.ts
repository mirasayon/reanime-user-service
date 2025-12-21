import { goReplyHttp } from "#/modules/response/handlers.js";
import type { default as ExpressJS } from "express";
export namespace Ping_ResponseTypes {
    export type get = "pong";
}

export const Ping_Controller = new (class Ping_Controller {
    get = (req: ExpressJS.Request, res: ExpressJS.Response) => {
        const data: Ping_ResponseTypes.get = "pong";
        const message = "OK";
        return goReplyHttp.ok(res, { data, message });
    };
})();
