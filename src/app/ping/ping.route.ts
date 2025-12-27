import { createConfiguredRouter } from "#/utilities/express-core-middlewares.js";
import { pingSectionController } from "./ping.controller.js";
export const pingSectionRouter = (() => {
    const r = createConfiguredRouter();
    r.get("/", pingSectionController.get);
    return r;
})();
