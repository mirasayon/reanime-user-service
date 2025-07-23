import { cRouter } from "#/utils/tools/express.js";
import { FavoriteAnimes_Controller as c } from "[www]/favorite_animes/favorite_animes.controller.js";
import { Favorite_Animes_ReqPipes as v } from "[www]/favorite_animes/favorite_animes.pipes.js";
import { Auth_middleware } from "[www]/authentication/authentication.middleware.js";
export const FavoriteAnimes_Router = (() => {
    const r = cRouter();
    r.get("/get/list/likes", v.explore_likes, Auth_middleware, c.explore_likes);
    r.get("/get/list/dislikes", v.explore_dislikes, Auth_middleware, c.explore_dislikes);

    r.get("/view/vote/:anime_id", v.view_vote_on_anime, Auth_middleware, c.view_vote_on_anime);

    r.post("/add/like/:anime_id", v.add_like_to_anime, Auth_middleware, c.add_like_to_anime);
    r.delete("/delete/like/:anime_id", v.delete_like_from_anime, Auth_middleware, c.delete_like_from_anime);

    r.post("/add/dislike/:anime_id", v.add_dislike_to_anime, Auth_middleware, c.add_dislike_to_anime);
    r.delete("/delete/dislike/:anime_id", v.delete_dislike_from_anime, Auth_middleware, c.delete_dislike_from_anime);

    return r;
})();

