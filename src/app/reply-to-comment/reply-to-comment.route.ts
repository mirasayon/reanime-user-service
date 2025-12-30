import { mainAuthenticationMiddleware as auth } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { replyToCommentRouteController as c } from "#src/app/reply-to-comment/reply-to-comment.controller.ts";
import { replyForCommentSectionValidatorMiddlewares as v } from "#src/app/reply-to-comment/reply-to-comment.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";

export const replyToCommentSectionRouter = createConfiguredRouter()
    .get(e.replyToComment.getOneById, v.get_1_reply_by_its_id, c.get_1_reply_by_its_id)
    .get(e.replyToComment.getRepliesByCommentId, v.get_replies_by_comment_id, c.get_replies_by_comment_id)

    .post(e.replyToComment.createReply, v.create_reply, auth, c.create_reply)
    .patch(e.replyToComment.editReply, v.edit_reply, auth, c.edit_reply)
    .delete(e.replyToComment.deleteReply, v.delete_reply, auth, c.delete_reply)
    .post(e.replyToComment.reportReply, v.report_reply, auth, c.report)

    .post(e.replyToComment.addDislike, v.add_dislike, auth, c.add_dislike)
    .post(e.replyToComment.addLike, v.add_like, auth, c.add_like)
    .delete(e.replyToComment.deleteDislike, v.delete_dislike, auth, c.delete_dislike)
    .delete(e.replyToComment.deleteLike, v.delete_like, auth, c.delete_like);
