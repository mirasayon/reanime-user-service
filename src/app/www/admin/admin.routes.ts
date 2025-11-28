import { mainAuthenticationMiddleware } from "#/middlewares/authentication.js";
import { cRouter } from "#/utils/tools/express.js";
import { Administrator_Controller } from "./admin.controller.js";
export const Administrator_Router = (() => {
    const r = cRouter();
    r.get("/get_all_users", mainAuthenticationMiddleware, Administrator_Controller.get_all_users);
    return r;
})();
