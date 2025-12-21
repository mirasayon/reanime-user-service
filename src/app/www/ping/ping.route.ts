import { createConfiguredRouter } from "#/utilities/tools/express.js";
import { Ping_Controller } from "./ping.controller.js";
export const Ping_Router = (() => {
    const r = createConfiguredRouter();
    r.get("/", Ping_Controller.get);
    return r;
})();
