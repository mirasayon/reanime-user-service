import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { pingSectionController } from "./ping.controller.ts";
export const pingSectionRouter = (() => {
    const r = createConfiguredRouter();
    r.get("/", pingSectionController.get);
    return r;
})();
