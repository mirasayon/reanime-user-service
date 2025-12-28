import { mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { voteToAnimeRouteController as c } from "#src/app/vote-to-anime/vote-to-anime.controller.ts";
import { voteToAnimesSectionRequestValidatorMiddlewares as v } from "#src/app/vote-to-anime/vote-to-anime.pipes.ts";
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
