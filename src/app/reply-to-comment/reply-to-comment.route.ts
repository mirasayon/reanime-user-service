import { mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { replyToCommentRouteController as c } from "#src/app/reply-to-comment/reply-to-comment.controller.ts";
import { replyForCommentSectionValidatorMiddlewares as v } from "#src/app/reply-to-comment/reply-to-comment.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";

export const replyToCommentSectionRouter = (() => {
    const r = createConfiguredRouter();
    r.get(e.replyToComment.getOneById, v.get_1_reply_by_its_id, c.get_1_reply_by_its_id);
    r.get(e.replyToComment.getRepliesByCommentId, v.get_replies_by_comment_id, c.get_replies_by_comment_id);

    r.post(e.replyToComment.createReply, v.create_reply, mainAuthenticationMiddleware, c.create_reply);
    r.patch(e.replyToComment.editReply, v.edit_reply, mainAuthenticationMiddleware, c.edit_reply);
    r.delete(e.replyToComment.deleteReply, v.delete_reply, mainAuthenticationMiddleware, c.delete_reply);
    r.post(e.replyToComment.reportReply, v.report_reply, mainAuthenticationMiddleware, c.report);

    r.post(e.replyToComment.addDislike, v.add_dislike, mainAuthenticationMiddleware, c.add_dislike);
    r.post(e.replyToComment.addLike, v.add_like, mainAuthenticationMiddleware, c.add_like);
    r.delete(e.replyToComment.deleteDislike, v.delete_dislike, mainAuthenticationMiddleware, c.delete_dislike);
    r.delete(e.replyToComment.deleteLike, v.delete_like, mainAuthenticationMiddleware, c.delete_like);
    return r;
})();
