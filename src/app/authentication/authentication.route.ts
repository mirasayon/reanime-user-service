import { checkIfAccountAlreadyLoggedMiddleware, mainAuthenticationMiddleware } from "#/middlewares/authentication-middleware.js";
import { createConfiguredRouter } from "#/utilities/express-core-middlewares.js";
import { Authentication_Controller as c } from "#/app/authentication/authentication.controller.js";
import { Authentication_ReqPipes as vm } from "#/app/authentication/authentication.pipes.js";

export const Authentication_Router = (() => {
    const r = createConfiguredRouter();
    r.post("/registration", vm.registration, checkIfAccountAlreadyLoggedMiddleware, c.registration);

    r.post("/login/by/email", vm.login_by_email, checkIfAccountAlreadyLoggedMiddleware, c.login_by_email);
    r.post("/login/by/username", vm.login_by_username, checkIfAccountAlreadyLoggedMiddleware, c.login_by_username);

    r.get("/check_username_availability/:username", vm.check_username_availability, c.check_username_availability);

    r.delete("/logout", vm.logout, mainAuthenticationMiddleware, c.logout);
    r.post("/check_session", vm.check_session, mainAuthenticationMiddleware, c.check_session);

    return r;
})();
