import { mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { voteToAnimeRouteController as c } from "#src/app/vote-to-anime/vote-to-anime.controller.ts";
import { voteToAnimesSectionRequestValidatorMiddlewares as v } from "#src/app/vote-to-anime/vote-to-anime.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";
export const voteToAnimeSectionRouter = (() => {
    const r = createConfiguredRouter();
    r.get(e.voteToAnime.exploreLikes, v.explore_likes, mainAuthenticationMiddleware, c.explore_likes);
    r.get(e.voteToAnime.exploreDislikes, v.explore_dislikes, mainAuthenticationMiddleware, c.explore_dislikes);

    r.get(e.voteToAnime.viewVoteOnAnime, v.view_vote_on_anime, mainAuthenticationMiddleware, c.view_vote_on_anime);

    r.post(e.voteToAnime.addLikeToAnime, v.add_like_to_anime, mainAuthenticationMiddleware, c.add_like_to_anime);
    r.delete(e.voteToAnime.deleteLikeFromAnime, v.delete_like_from_anime, mainAuthenticationMiddleware, c.delete_like_from_anime);

    r.post(e.voteToAnime.addDislikeToAnime, v.add_dislike_to_anime, mainAuthenticationMiddleware, c.add_dislike_to_anime);
    r.delete(e.voteToAnime.deleteDislikeFromAnime, v.delete_dislike_from_anime, mainAuthenticationMiddleware, c.delete_dislike_from_anime);

    return r;
})();
