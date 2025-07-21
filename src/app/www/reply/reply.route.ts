import { Auth_middleware } from "[www]/authentication/authentication.middleware.js";
import { Reply_Controller as c } from "[www]/reply/reply.controller.js";
import { Reply_ReqPipes as vm } from "[www]/reply/reply.pipes.js";
import { create_router } from "#/utils/tools/express.js";

export const Reply_Router = (() => {
    const r = create_router();
    r.get("/get/one/:reply_id", vm.get_1_reply_by_its_id, c.get_1_reply_by_its_id);
    r.get("/get/all/:comment_id", vm.get_replies_by_comment_id, c.get_replies_by_comment_id);

    r.post("/create", vm.create, Auth_middleware, c.create_reply);
    r.patch("/edit", vm.edit_reply, Auth_middleware, c.edit_reply);
    r.delete("/delete/:reply_id", vm.delete_reply, Auth_middleware, c.delete_reply);
    r.post("/report/:type/:reply_id", vm.report, Auth_middleware, c.report);

    r.post("/vote/add/dislike/:reply_id", vm.add_dislike, Auth_middleware, c.add_dislike);
    r.post("/vote/add/like/:reply_id", vm.add_like, Auth_middleware, c.add_like);
    r.delete("/vote/delete/dislike/:reply_id", vm.delete_dislike, Auth_middleware, c.delete_dislike);
    r.delete("/vote/delete/like/:reply_id", vm.delete_like, Auth_middleware, c.delete_like);
    return r;
})();
