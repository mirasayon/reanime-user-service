import { mainAuthenticationMiddleware } from "#/middlewares/authentication-middleware.js";
import { createConfiguredRouter } from "#/utilities/express-core-middlewares.js";
import { commentToAnimeRouteController as c } from "#/app/comment-for-anime/comment-for-anime.controller.js";
import { Comment_ReqPipes as rp } from "#/app/comment-for-anime/comment-for-anime.pipes.js";

export const Comment_Router = (() => {
    const r = createConfiguredRouter();

    // Get comments by anime ID with pagination
    r.get("/get/all_comments_for_anime/:anime_id", rp.get_all_for_anime, c.get_all_for_anime);

    r.get("/get/all_my_comments", rp.all_my_comments, mainAuthenticationMiddleware, c.all_my_comments);
    r.get("/get/all_for_public_profile/:username", rp.all_for_public_profile, c.all_for_public_profile);
    // Create a new comment for anime
    r.post("/create/:anime_id", rp.create, mainAuthenticationMiddleware, c.create_comment);
    r.patch("/update/:comment_id", rp.update, mainAuthenticationMiddleware, c.update_comment);
    // Delete a comment
    r.delete("/delete/:comment_id", rp.delete_comment, mainAuthenticationMiddleware, c.delete_comment);
    // Report a comment
    r.post("/report", rp.report, mainAuthenticationMiddleware, c.report);

    // modified 2025.11.24 +/:comment_id
    r.post("/add/like/:comment_id", rp.add_like, mainAuthenticationMiddleware, c.add_like);
    r.delete("/delete/like/:comment_id", rp.delete_like, mainAuthenticationMiddleware, c.delete_like);

    r.post("/add/dislike/:comment_id", rp.add_dislike, mainAuthenticationMiddleware, c.add_dislike);
    r.delete("/delete/dislike/:comment_id", rp.delete_dislike, mainAuthenticationMiddleware, c.delete_dislike);
    return r;
})();
