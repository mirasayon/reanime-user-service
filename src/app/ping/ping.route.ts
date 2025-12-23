import { createConfiguredRouter } from "#/utilities/express-core-middlewares.js";
import { pingSectionController } from "./ping.controller.js";
export const Ping_Router = (() => {
    const r = createConfiguredRouter();
    r.get("/", pingSectionController.get);
    return r;
})();
