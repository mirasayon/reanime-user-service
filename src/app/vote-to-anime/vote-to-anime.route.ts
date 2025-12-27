import { mainAuthenticationMiddleware } from "#/middlewares/authentication-middleware.js";
import { createConfiguredRouter } from "#/utilities/express-core-middlewares.js";
import { voteToAnimeRouteController as c } from "#/app/vote-to-anime/vote-to-anime.controller.js";
import { voteToAnimesSectionRequestValidatorMiddlewares as v } from "#/app/vote-to-anime/vote-to-anime.pipes.js";
export const voteToAnimeSectionRouter = (() => {
    const r = createConfiguredRouter();
    r.get("/get/list/likes", v.explore_likes, mainAuthenticationMiddleware, c.explore_likes);
    r.get("/get/list/dislikes", v.explore_dislikes, mainAuthenticationMiddleware, c.explore_dislikes);

    r.get("/view/vote/:anime_id", v.view_vote_on_anime, mainAuthenticationMiddleware, c.view_vote_on_anime);

    r.post("/add/like/:anime_id", v.add_like_to_anime, mainAuthenticationMiddleware, c.add_like_to_anime);
    r.delete("/delete/like/:anime_id", v.delete_like_from_anime, mainAuthenticationMiddleware, c.delete_like_from_anime);

    r.post("/add/dislike/:anime_id", v.add_dislike_to_anime, mainAuthenticationMiddleware, c.add_dislike_to_anime);
    r.delete("/delete/dislike/:anime_id", v.delete_dislike_from_anime, mainAuthenticationMiddleware, c.delete_dislike_from_anime);

    return r;
})();
