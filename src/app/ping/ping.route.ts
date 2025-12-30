import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { pingSectionController as c } from "./ping.controller.ts";

export const pingSectionRouter = createConfiguredRouter().get(e.ping.get, c.get);
