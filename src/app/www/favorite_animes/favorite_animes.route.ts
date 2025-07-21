import { create_router } from "#/utils/tools/express.js";
import { FavoriteAnimes_Controller as c } from "[www]/favorite_animes/favorite_animes.controller.js";
import { Favorite_Animes_ReqPipes as v } from "[www]/favorite_animes/favorite_animes.pipes.js";
import { Auth_middleware } from "[www]/authentication/authentication.middleware.js";
export const FavoriteAnimes_Router = (() => {
    const r = create_router();
    r.get("/get/list/likes", v.explore_my_likes, Auth_middleware, c.explore_my_likes);
    r.get("/get/list/dislikes", v.explore_my_dislikes, Auth_middleware, c.explore_my_dislikes);

    r.get("/view/vote/:anime_id", v.view_my_vote_on_anime, Auth_middleware, c.view_my_vote_on_anime);

    r.post("/add/like/:anime_id", v.add_my_like_to_anime, Auth_middleware, c.add_my_like_to_anime);
    r.delete("/delete/like/:anime_id", v.delete_my_like_from_anime, Auth_middleware, c.delete_my_like_from_anime);

    r.post("/add/dislike/:anime_id", v.add_my_dislike_to_anime, Auth_middleware, c.add_dislike_to_anime);
    r.delete(
        "/delete/dislike/:anime_id",
        v.delete_my_dislike_from_anime,
        Auth_middleware,
        c.delete_my_dislike_from_anime,
    );

    return r;
})();
