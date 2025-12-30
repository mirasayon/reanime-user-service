import { mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { endpointsConfig } from "#src/shared/endpoints-config.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { AdministrationSectionController } from "./administration.controller.ts";
export const administrationSectionRouter = (() => {
    const r = createConfiguredRouter();
    r.get(endpointsConfig.administration.getAllUsersInfo, mainAuthenticationMiddleware, AdministrationSectionController.get_all_users);
    return r;
})();
