import { checkIfAccountAlreadyLoggedMiddleware, mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { authenticationSectionController as c } from "#src/app/authentication/authentication.controller.ts";
import { authenticationSectionRequestValidatorMiddlewares as vm } from "#src/app/authentication/authentication.pipes.ts";

export const authenticationSectionRouter = (() => {
    const r = createConfiguredRouter();
    r.post("/registration", vm.registration, checkIfAccountAlreadyLoggedMiddleware, c.registration);

    r.post("/login/by/email", vm.login_by_email, checkIfAccountAlreadyLoggedMiddleware, c.login_by_email);
    r.post("/login/by/username", vm.login_by_username, checkIfAccountAlreadyLoggedMiddleware, c.login_by_username);

    r.get("/check_username_availability/:username", vm.check_username_availability, c.check_username_availability);

    r.delete("/logout", vm.logout, mainAuthenticationMiddleware, c.logout);
    r.post("/check_session", vm.check_session, mainAuthenticationMiddleware, c.check_session);

    return r;
})();
