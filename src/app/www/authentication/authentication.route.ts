import { Authentication_Controller as c } from "[www]/authentication/authentication.controller.js";
import { mainAuthenticationMiddleware, has_client_already_logged } from "#/middlewares/authentication.js";
import { Authentication_ReqPipes as vm } from "[www]/authentication/authentication.pipes.js";
import { cRouter } from "#/utils/tools/express.js";

export const Authentication_Router = (() => {
    const r = cRouter();
    r.post("/registration", vm.registration, has_client_already_logged, c.registration);

    r.post("/login/via/email", vm.login_via_email, has_client_already_logged, c.login_via_email);
    r.post("/login/via/username", vm.login_via_username, has_client_already_logged, c.login_via_username);

    r.get("/check_username_availability/:username", vm.check_username_availability, c.check_username_availability);

    r.delete("/logout", vm.logout, mainAuthenticationMiddleware, c.logout);
    r.post("/check_session", vm.check_session, mainAuthenticationMiddleware, c.check_session);

    return r;
})();
