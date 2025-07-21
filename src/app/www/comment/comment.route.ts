import { Auth_middleware } from "[www]/authentication/authentication.middleware.js";
import { Comment_Controller as c } from "[www]/comment/comment.controller.js";
import { Comment_ReqPipes as rp } from "[www]/comment/comment.pipes.js";
import { create_router } from "#/utils/tools/express.js";

export const Comment_Router = (() => {
    const r = create_router();
    // Get comments by anime ID with pagination
    r.get("/get/all/:anime_id", rp.get_all_for_anime, c.get_all_for_anime);
    // Create a new comment for anime
    r.post("/create/:anime_id", rp.create, Auth_middleware, c.create);
    r.patch("/update", rp.update, Auth_middleware, c.update);
    // Delete a comment
    r.delete("/delete/:comment_id", rp.delete_comment, Auth_middleware, c.delete_comment);
    // Report a comment
    r.post("/report", rp.report, Auth_middleware, c.report);

    r.post("/add/like", rp.add_like, Auth_middleware, c.add_like);
    r.delete("/delete/like", rp.delete_like, Auth_middleware, c.delete_like);

    r.post("/add/dislike", rp.add_dislike, Auth_middleware, c.add_dislike);
    r.delete("/delete/dislike", rp.delete_dislike, Auth_middleware, c.delete_dislike);
    return r;
})();
