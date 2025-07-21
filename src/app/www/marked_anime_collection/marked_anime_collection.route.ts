import { create_router } from "#/utils/tools/express.js";
import { MarkedAnimeCollection_Controller as cont } from "[www]/marked_anime_collection/marked_anime_collection.controller.js";
import { MarkedAnimeCollection_ReqPipes } from "[www]/marked_anime_collection/marked_anime_collection.pipes.js";
import { Auth_middleware } from "[www]/authentication/authentication.middleware.js";
export const MarkedAnimeCollection_Router = (() => {
    const r = create_router();

    r.get("/list/all", MarkedAnimeCollection_ReqPipes.get_all_list, Auth_middleware, cont.get_all_list);

    r.get("/get/:anime_id", MarkedAnimeCollection_ReqPipes.get_for_anime, Auth_middleware, cont.get_for_anime);

    r.get(
        "/list/watching",
        MarkedAnimeCollection_ReqPipes.get_list_of_watching,
        Auth_middleware,
        cont.get_list_of_watching,
    );
    r.get(
        "/list/abandoned",
        MarkedAnimeCollection_ReqPipes.get_list_of_abandoned,
        Auth_middleware,
        cont.get_list_of_abandoned,
    );
    r.get(
        "/list/planned",
        MarkedAnimeCollection_ReqPipes.get_list_of_planned,
        Auth_middleware,
        cont.get_list_of_planned,
    );
    r.get(
        "/list/completed",
        MarkedAnimeCollection_ReqPipes.get_list_of_completed,
        Auth_middleware,
        cont.get_list_of_completed,
    );

    r.post(
        "/add/watching/:anime_id",
        MarkedAnimeCollection_ReqPipes.create_1_watching,
        Auth_middleware,
        cont.create_1_watching_by_profile_id,
    );
    r.post(
        "/add/abandoned/:anime_id",
        MarkedAnimeCollection_ReqPipes.create_1_abandoned,
        Auth_middleware,
        cont.create_1_abandoned_by_profile_id,
    );
    r.post(
        "/add/planned/:anime_id",
        MarkedAnimeCollection_ReqPipes.create_1_planned,
        Auth_middleware,
        cont.create_1_planned_by_profile_id,
    );
    r.post(
        "/add/completed/:anime_id",
        MarkedAnimeCollection_ReqPipes.create_1_completed,
        Auth_middleware,
        cont.create_1_completed_by_profile_id,
    );

    r.delete(
        "/delete/watching/:anime_id",
        MarkedAnimeCollection_ReqPipes.delete_watching,
        Auth_middleware,
        cont.delete_watching,
    );
    r.delete(
        "/delete/abandoned/:anime_id",
        MarkedAnimeCollection_ReqPipes.delete_abandoned,
        Auth_middleware,
        cont.delete_abandoned,
    );
    r.delete(
        "/delete/planned/:anime_id",
        MarkedAnimeCollection_ReqPipes.delete_planned,
        Auth_middleware,
        cont.delete_planned,
    );
    r.delete(
        "/delete/completed/:anime_id",
        MarkedAnimeCollection_ReqPipes.delete_completed,
        Auth_middleware,
        cont.delete_completed,
    );

    return r;
})();
