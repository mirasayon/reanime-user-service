import { cRouter } from "#/utils/tools/express.js";
import { MarkedAnimeCollection_Controller as cont } from "[www]/marked_anime_collection/marked_anime_collection.controller.js";
import { MarkedAnimeCollection_ReqPipes } from "[www]/marked_anime_collection/marked_anime_collection.pipes.js";
import { Auth_middleware } from "#/middlewares/authentication.middleware.js";
export const MarkedAnimeCollection_Router = (() => {
    const r = cRouter();

    r.get("/list/all", MarkedAnimeCollection_ReqPipes.get_all_list, Auth_middleware, cont.get_all_list);

    r.get("/get/:anime_id", MarkedAnimeCollection_ReqPipes.get_for_anime, Auth_middleware, cont.get_for_anime);

    r.get("/list/watching", MarkedAnimeCollection_ReqPipes.get_list_of_watching, Auth_middleware, cont.get_list_of_watching);
    r.get("/list/abandoned", MarkedAnimeCollection_ReqPipes.get_list_of_abandoned, Auth_middleware, cont.get_list_of_abandoned);
    r.get("/list/planned", MarkedAnimeCollection_ReqPipes.get_list_of_planned, Auth_middleware, cont.get_list_of_planned);
    r.get("/list/completed", MarkedAnimeCollection_ReqPipes.get_list_of_completed, Auth_middleware, cont.get_list_of_completed);

    r.post("/add/watching/:anime_id", MarkedAnimeCollection_ReqPipes.create_watching, Auth_middleware, cont.create_watching);
    r.post("/add/abandoned/:anime_id", MarkedAnimeCollection_ReqPipes.create_abandoned, Auth_middleware, cont.create_abandoned);
    r.post("/add/planned/:anime_id", MarkedAnimeCollection_ReqPipes.create_planned, Auth_middleware, cont.create_planned);
    r.post("/add/completed/:anime_id", MarkedAnimeCollection_ReqPipes.create_completed, Auth_middleware, cont.create_completed);

    r.delete("/delete/watching/:anime_id", MarkedAnimeCollection_ReqPipes.delete_watching, Auth_middleware, cont.delete_watching);
    r.delete("/delete/abandoned/:anime_id", MarkedAnimeCollection_ReqPipes.delete_abandoned, Auth_middleware, cont.delete_abandoned);
    r.delete("/delete/planned/:anime_id", MarkedAnimeCollection_ReqPipes.delete_planned, Auth_middleware, cont.delete_planned);
    r.delete("/delete/completed/:anime_id", MarkedAnimeCollection_ReqPipes.delete_completed, Auth_middleware, cont.delete_completed);

    return r;
})();

