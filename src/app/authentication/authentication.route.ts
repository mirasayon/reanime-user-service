import { alreadyLoggedMiddleware, mainAuthenticationMiddleware as auth } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { authenticationSectionController as c } from "#src/app/authentication/authentication.controller.ts";
import { authenticationSectionRequestValidatorMiddlewares as v } from "#src/app/authentication/authentication.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";

export const authenticationSectionRouter = createConfiguredRouter()
    .post(e.authentication.registration, v.registration, alreadyLoggedMiddleware, c.registration)

    .post(e.authentication.loginByEmail, v.login_by_email, alreadyLoggedMiddleware, c.login_by_email)
    .post(e.authentication.loginByUsername, v.login_by_username, alreadyLoggedMiddleware, c.login_by_username)

    .get(e.authentication.checkUsernameAvailability, v.check_username_availability, c.check_username_availability)

    .post(e.authentication.checkSession, v.check_session, auth, c.check_session)
    .delete(e.authentication.logout, v.logout, auth, c.logout);
