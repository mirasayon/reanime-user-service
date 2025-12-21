import { mainAuthenticationMiddleware } from "#/middlewares/authentication-middleware.js";
import { createConfiguredRouter } from "#/utilities/tools/express.js";
import { Administrator_Controller } from "./admin.controller.js";
export const Administrator_Router = (() => {
    const r = createConfiguredRouter();
    r.get("/get_all_users", mainAuthenticationMiddleware, Administrator_Controller.get_all_users);
    return r;
})();
