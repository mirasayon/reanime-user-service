import { mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { accountRouteController as c } from "#src/app/user-account/user-account.controller.ts";
import { accountSectionValidatorMiddlewares as v } from "#src/app/user-account/user-account.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";

export const userAccountSectionRouter = (() => {
    const r = createConfiguredRouter();
    // Get general information about the currently authenticated accounts
    r.get(e.userAccount.exploreMe, mainAuthenticationMiddleware, c.explore_me);

    r.post(e.userAccount.setEmail, v.set_email, mainAuthenticationMiddleware, c.set_email);
    r.patch(e.userAccount.updateEmail, v.update_email, mainAuthenticationMiddleware, c.update_email);
    r.patch(e.userAccount.updatePassword, v.update_password, mainAuthenticationMiddleware, c.update_password);
    r.patch(e.userAccount.updateUsername, v.update_username, mainAuthenticationMiddleware, c.update_username);

    // Retrieve a list of the account active sessions
    r.get(e.userAccount.allSessions, mainAuthenticationMiddleware, c.get_sessions);

    // Terminate a specific account session (Logout)
    r.delete(e.userAccount.terminateOtherSessions, v.terminate_other_sessions, mainAuthenticationMiddleware, c.terminate_other_sessions);
    r.delete(e.userAccount.terminateSpecificSession, v.terminate_specific_session, mainAuthenticationMiddleware, c.terminate_specific_session);
    // Delete account fully
    r.delete(e.userAccount.deleteAccount, mainAuthenticationMiddleware, c.delete_account);
    return r;
})();
