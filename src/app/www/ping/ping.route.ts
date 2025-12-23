import { createConfiguredRouter } from "#/utilities/express-core-middlewares.js";
import { Ping_Controller } from "./ping.controller.js";
export const Ping_Router = (() => {
    const r = createConfiguredRouter();
    r.get("/", Ping_Controller.get);
    return r;
})();
