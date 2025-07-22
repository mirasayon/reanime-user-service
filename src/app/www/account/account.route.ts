import { Account_Controller as c } from "[www]/account/account.controller.js";
import { Account_ReqPipes as rp } from "[www]/account/account.pipes.js";
import { Auth_middleware } from "[www]/authentication/authentication.middleware.js";
import { create_router } from "#/utils/tools/express.js";
import { ControllerUtils } from "#/utils/controller.js";

export const Account_Router = (() => {
    const r = create_router();
    // Get general information about the currently authenticated user
    r.get("/explore/me", Auth_middleware, c.explore_me);

    // Update user's email address
    r.post("/set/email", rp.set_email, Auth_middleware, c.set_email);
    r.patch("/update/email", rp.update_email, Auth_middleware, c.update_email);

    // Update user's password
    r.patch("/update/password", rp.update_password, Auth_middleware, c.update_password);

    // Update user's username
    r.patch("/update/username", rp.update_username, Auth_middleware, c.update_username);

    // Retrieve a list of the user's active sessions
    r.get("/all/sessions", Auth_middleware, c.get_sessions);

    // Terminate a specific user session (Logout)
    r.delete("/sessions/delete_all_other_sessions", rp.terminate_other_sessions, Auth_middleware, c.terminate_other_sessions);

    // Deletes the user's account
    r.delete("/delete_account", ControllerUtils.ping_the_media_service_middleware, Auth_middleware, c.delete_account);
    return r;
})();

