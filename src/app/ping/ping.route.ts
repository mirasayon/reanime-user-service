import { endpointsConfig } from "#src/shared/endpoints-config.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { pingSectionController } from "./ping.controller.ts";
export const pingSectionRouter = (() => {
    const r = createConfiguredRouter();
    r.get(endpointsConfig.ping.get, pingSectionController.get);
    return r;
})();
