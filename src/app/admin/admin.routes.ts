import { mainAuthenticationMiddleware } from "#/middlewares/authentication-middleware.js";
import { createConfiguredRouter } from "#/utilities/express-core-middlewares.js";
import { administratorSectionController } from "./admin.controller.js";
export const Administrator_Router = (() => {
    const r = createConfiguredRouter();
    r.get("/get_all_users", mainAuthenticationMiddleware, administratorSectionController.get_all_users);
    return r;
})();
