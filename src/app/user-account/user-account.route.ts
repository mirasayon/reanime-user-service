import { mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { accountRouteController as c } from "#src/app/user-account/user-account.controller.ts";
import { accountSectionValidatorMiddlewares as rp } from "#src/app/user-account/user-account.pipes.ts";

export const accountSectionRouter = (() => {
    const r = createConfiguredRouter();
    // Get general information about the currently authenticated accounts
    r.get("/explore/me", mainAuthenticationMiddleware, c.explore_me);

    r.post("/set/email", rp.set_email, mainAuthenticationMiddleware, c.set_email);
    r.patch("/update/email", rp.update_email, mainAuthenticationMiddleware, c.update_email);
    r.patch("/update/password", rp.update_password, mainAuthenticationMiddleware, c.update_password);
    r.patch("/update/username", rp.update_username, mainAuthenticationMiddleware, c.update_username);

    // Retrieve a list of the account active sessions
    r.get("/all/sessions", mainAuthenticationMiddleware, c.get_sessions);

    // Terminate a specific account session (Logout)
    r.delete("/sessions/delete_all_other_sessions", rp.terminate_other_sessions, mainAuthenticationMiddleware, c.terminate_other_sessions);
    r.delete(
        "/sessions/terminate_specific_session/:session_id",
        rp.terminate_specific_session,
        mainAuthenticationMiddleware,
        c.terminate_specific_session,
    );
    // Delete account fully
    r.delete("/delete_account", mainAuthenticationMiddleware, c.delete_account);
    return r;
})();
