import { cRouter } from "#/utils/tools/express.js";
import { Ping_Controller } from "./ping.controller.js";
export const Ping_Router = (() => {
    const r = cRouter();
    r.get("/", Ping_Controller.get);
    return r;
})();
