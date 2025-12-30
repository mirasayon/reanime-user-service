import { checkIfAccountAlreadyLoggedMiddleware, mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { authenticationSectionController as c } from "#src/app/authentication/authentication.controller.ts";
import { authenticationSectionRequestValidatorMiddlewares as v } from "#src/app/authentication/authentication.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";

export const authenticationSectionRouter = (() => {
    const r = createConfiguredRouter();
    r.post(e.authentication.registration, v.registration, checkIfAccountAlreadyLoggedMiddleware, c.registration);

    r.post(e.authentication.loginByEmail, v.login_by_email, checkIfAccountAlreadyLoggedMiddleware, c.login_by_email);
    r.post(e.authentication.loginByUsername, v.login_by_username, checkIfAccountAlreadyLoggedMiddleware, c.login_by_username);

    r.get(e.authentication.checkUsernameAvailability, v.check_username_availability, c.check_username_availability);

    r.post(e.authentication.checkSession, v.check_session, mainAuthenticationMiddleware, c.check_session);
    r.delete(e.authentication.logout, v.logout, mainAuthenticationMiddleware, c.logout);

    return r;
})();
