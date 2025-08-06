import { Reply } from "@reanime.art/user-service/user-service/response/handlers.js";
import type e from "express";

export namespace Ping_ResponseTypes {
    export type get = "pong";
}

export const Ping_Controller = new (class Ping_Controller {
    get = (req: e.Request, res: e.Response) => {
        const data: Ping_ResponseTypes.get = "pong";
        const message = "OK";
        return Reply.ok(res, { data, message });
    };
})();
