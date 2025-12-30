import { mainAuthenticationMiddleware as auth } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { accountRouteController as c } from "#src/app/user-account/user-account.controller.ts";
import { accountSectionValidatorMiddlewares as v } from "#src/app/user-account/user-account.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";

export const userAccountSectionRouter = createConfiguredRouter()
    .get(e.userAccount.exploreMe, auth, c.explore_me)

    .post(e.userAccount.setEmail, v.set_email, auth, c.set_email)
    .patch(e.userAccount.updateEmail, v.update_email, auth, c.update_email)
    .patch(e.userAccount.updatePassword, v.update_password, auth, c.update_password)
    .patch(e.userAccount.updateUsername(":username"), v.update_username, auth, c.update_username)
    .get(e.userAccount.allSessions, auth, c.get_sessions)

    .delete(e.userAccount.terminateOtherSessions, v.terminate_other_sessions, auth, c.terminate_other_sessions)
    .delete(e.userAccount.terminateSpecificSession(":session_id"), v.terminate_specific_session, auth, c.terminate_specific_session)
    .delete(e.userAccount.deleteAccount, auth, c.delete_account);
