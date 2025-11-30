import { Account_Controller as c } from "[www]/account/account.controller.js";
import { Account_ReqPipes as rp } from "[www]/account/account.pipes.js";
import { mainAuthenticationMiddleware } from "#/middlewares/authentication.js";
import { cRouter } from "#/utils/tools/express.js";

export const Account_Router = (() => {
    const r = cRouter();
    // Get general information about the currently authenticated accounts
    r.get("/explore/me", mainAuthenticationMiddleware, c.explore_me);

    // Update account email address
    r.post("/set/email", rp.set_email, mainAuthenticationMiddleware, c.set_email);
    r.patch("/update/email", rp.update_email, mainAuthenticationMiddleware, c.update_email);

    // Update account password
    r.patch("/update/password", rp.update_password, mainAuthenticationMiddleware, c.update_password);

    // Update account username
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
