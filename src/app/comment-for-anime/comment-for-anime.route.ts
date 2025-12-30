import { mainAuthenticationMiddleware as auth } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { commentToAnimeRouteController as c } from "#src/app/comment-for-anime/comment-for-anime.controller.ts";
import { Comment_ReqPipes as v } from "#src/app/comment-for-anime/comment-for-anime.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";

export const commentForAnimeSectionRouter = createConfiguredRouter()
    .get(e.commentAboutAnime.allCommentsForAnime(":anime_id"), v.get_all_for_anime, c.get_all_for_anime)

    .get(e.commentAboutAnime.getAllMyComments, v.all_my_comments, auth, c.all_my_comments)
    .get(e.commentAboutAnime.getAllCommentsFromAnyProfile(":username"), v.all_for_public_profile, c.all_for_public_profile)
    .post(e.commentAboutAnime.createComment(":anime_id"), v.create, auth, c.create_comment)
    .patch(e.commentAboutAnime.updateComment(":commend_id"), v.update, auth, c.update_comment)
    .delete(e.commentAboutAnime.deleteComment(":commend_id"), v.delete_comment, auth, c.delete_comment)
    .post(e.commentAboutAnime.reportTheComment, v.report, auth, c.report)

    .post(e.commentAboutAnime.addLike(":comment_id"), v.add_like, auth, c.add_like)
    .delete(e.commentAboutAnime.deleteLike(":comment_id"), v.delete_like, auth, c.delete_like)

    .post(e.commentAboutAnime.addDislike(":comment_id"), v.add_dislike, auth, c.add_dislike)
    .delete(e.commentAboutAnime.deleteDislike(":comment_id"), v.delete_dislike, auth, c.delete_dislike);
