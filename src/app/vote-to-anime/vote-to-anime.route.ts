import { mainAuthenticationMiddleware as auth } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { voteToAnimeRouteController as c } from "#src/app/vote-to-anime/vote-to-anime.controller.ts";
import { voteToAnimesSectionRequestValidatorMiddlewares as v } from "#src/app/vote-to-anime/vote-to-anime.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";
export const voteToAnimeSectionRouter = createConfiguredRouter()
    .get(e.voteToAnime.exploreLikes, v.explore_likes, auth, c.explore_likes)
    .get(e.voteToAnime.exploreDislikes, v.explore_dislikes, auth, c.explore_dislikes)

    .get(e.voteToAnime.viewVoteOnAnime(":anime_id"), v.view_vote_on_anime, auth, c.view_vote_on_anime)

    .post(e.voteToAnime.addLikeToAnime(":anime_id"), v.add_like_to_anime, auth, c.add_like_to_anime)
    .delete(e.voteToAnime.deleteLikeFromAnime(":anime_id"), v.delete_like_from_anime, auth, c.delete_like_from_anime)

    .post(e.voteToAnime.addDislikeToAnime(":anime_id"), v.add_dislike_to_anime, auth, c.add_dislike_to_anime)
    .delete(e.voteToAnime.deleteDislikeFromAnime(":anime_id"), v.delete_dislike_from_anime, auth, c.delete_dislike_from_anime);
