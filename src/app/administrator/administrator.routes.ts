import { mainAuthenticationMiddleware } from "#/middlewares/authentication-middleware.js";
import { createConfiguredRouter } from "#/utilities/express-core-middlewares.js";
import { administratorSectionController } from "./administrator.controller.js";
export const administratorSectionRouter = (() => {
    const r = createConfiguredRouter();
    r.get("/get_all_users", mainAuthenticationMiddleware, administratorSectionController.get_all_users);
    return r;
})();
