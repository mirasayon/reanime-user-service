import { mainAuthenticationMiddleware as auth } from "#src/middlewares/authentication-middleware.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { AdministrationSectionController as c } from "./administration.controller.ts";
export const administrationSectionRouter = createConfiguredRouter().get(e.administration.getAllUsersInfo, auth, c.get_all_users);
