import { mainAuthenticationMiddleware as auth } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { replyToCommentRouteController as c } from "#src/app/reply-to-comment/reply-to-comment.controller.ts";
import { replyForCommentSectionValidatorMiddlewares as v } from "#src/app/reply-to-comment/reply-to-comment.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";

export const replyToCommentSectionRouter = createConfiguredRouter()
    .get(e.replyToComment.getOneById(":reply_id"), v.get_1_reply_by_its_id, c.get_1_reply_by_its_id)
    .get(e.replyToComment.getRepliesByCommentId(":comment_id"), v.get_replies_by_comment_id, c.get_replies_by_comment_id)

    .post(e.replyToComment.createReply, v.create_reply, auth, c.create_reply)
    .patch(e.replyToComment.editReply, v.edit_reply, auth, c.edit_reply)
    .delete(e.replyToComment.deleteReply(":reply_id"), v.delete_reply, auth, c.delete_reply)
    .post(e.replyToComment.reportReply(":type", ":reply_id"), v.report_reply, auth, c.report)

    .post(e.replyToComment.addDislike(":reply_id"), v.add_dislike, auth, c.add_dislike)
    .post(e.replyToComment.addLike(":reply_id"), v.add_like, auth, c.add_like)
    .delete(e.replyToComment.deleteDislike(":reply_id"), v.delete_dislike, auth, c.delete_dislike)
    .delete(e.replyToComment.deleteLike(":reply_id"), v.delete_like, auth, c.delete_like);
