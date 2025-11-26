import { cRouter } from "#/utils/tools/express.js";
import { Ping_Controller } from "../ping/ping.controller.js";
export const Admin_Router = (() => {
    const r = cRouter();
    r.get("/get-all-usernames", Ping_Controller.get);
    return r;
})();
