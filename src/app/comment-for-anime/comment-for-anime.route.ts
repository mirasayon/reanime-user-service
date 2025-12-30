import { mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { commentToAnimeRouteController as c } from "#src/app/comment-for-anime/comment-for-anime.controller.ts";
import { Comment_ReqPipes as v } from "#src/app/comment-for-anime/comment-for-anime.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";

export const commentForAnimeSectionRouter = (() => {
    const r = createConfiguredRouter();

    r.get(e.commentAboutAnime.allCommentsForAnime, v.get_all_for_anime, c.get_all_for_anime);

    r.get(e.commentAboutAnime.getAllMyComments, v.all_my_comments, mainAuthenticationMiddleware, c.all_my_comments);
    r.get(e.commentAboutAnime.getAllCommentsFromAnyProfile, v.all_for_public_profile, c.all_for_public_profile);
    r.post(e.commentAboutAnime.createComment, v.create, mainAuthenticationMiddleware, c.create_comment);
    r.patch(e.commentAboutAnime.updateComment, v.update, mainAuthenticationMiddleware, c.update_comment);
    r.delete(e.commentAboutAnime.deleteComment, v.delete_comment, mainAuthenticationMiddleware, c.delete_comment);
    r.post(e.commentAboutAnime.reportTheComment, v.report, mainAuthenticationMiddleware, c.report);

    r.post(e.commentAboutAnime.addLike, v.add_like, mainAuthenticationMiddleware, c.add_like);
    r.delete(e.commentAboutAnime.deleteLike, v.delete_like, mainAuthenticationMiddleware, c.delete_like);

    r.post(e.commentAboutAnime.addDislike, v.add_dislike, mainAuthenticationMiddleware, c.add_dislike);
    r.delete(e.commentAboutAnime.deleteDislike, v.delete_dislike, mainAuthenticationMiddleware, c.delete_dislike);
    return r;
})();
