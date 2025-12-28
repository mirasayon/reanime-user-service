import { mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { replyToCommentRouteController as c } from "#src/app/reply-to-comment/reply-to-comment.controller.ts";
import { replyForCommentSectionValidatorMiddlewares as vm } from "#src/app/reply-to-comment/reply-to-comment.pipes.ts";

export const replyToCommentSectionRouter = (() => {
    const r = createConfiguredRouter();
    r.get("/get/one/:reply_id", vm.get_1_reply_by_its_id, c.get_1_reply_by_its_id);
    r.get("/get/all/:comment_id", vm.get_replies_by_comment_id, c.get_replies_by_comment_id);

    r.post("/create", vm.create_reply, mainAuthenticationMiddleware, c.create_reply);
    r.patch("/edit", vm.edit_reply, mainAuthenticationMiddleware, c.edit_reply);
    r.delete("/delete/:reply_id", vm.delete_reply, mainAuthenticationMiddleware, c.delete_reply);
    r.post("/report/:type/:reply_id", vm.report_reply, mainAuthenticationMiddleware, c.report);

    r.post("/vote/add/dislike/:reply_id", vm.add_dislike, mainAuthenticationMiddleware, c.add_dislike);
    r.post("/vote/add/like/:reply_id", vm.add_like, mainAuthenticationMiddleware, c.add_like);
    r.delete("/vote/delete/dislike/:reply_id", vm.delete_dislike, mainAuthenticationMiddleware, c.delete_dislike);
    r.delete("/vote/delete/like/:reply_id", vm.delete_like, mainAuthenticationMiddleware, c.delete_like);
    return r;
})();
