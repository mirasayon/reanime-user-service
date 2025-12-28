import { mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { administratorSectionController } from "./administrator.controller.ts";
export const administratorSectionRouter = (() => {
    const r = createConfiguredRouter();
    r.get("/get_all_users", mainAuthenticationMiddleware, administratorSectionController.get_all_users);
    return r;
})();
