import { mainAuthenticationMiddleware } from "#/middlewares/authentication-middleware.js";
import { createConfiguredRouter } from "#/utilities/express-core-middlewares.js";
import { animeBookmarkSectionController as cont } from "#/app/anime-bookmark-collection/anime-bookmark-collection.controller.js";
import { animeBookmarkSectionReqPipes } from "#/app/anime-bookmark-collection/anime-bookmark-collection.pipes.js";
export const animeBookmarkSectionRouter = (() => {
    const r = createConfiguredRouter();

    r.get("/list/all", animeBookmarkSectionReqPipes.get_all_list, mainAuthenticationMiddleware, cont.get_all_list);

    r.get("/get/:anime_id", animeBookmarkSectionReqPipes.get_for_anime, mainAuthenticationMiddleware, cont.get_for_anime);

    r.get("/list/watching", animeBookmarkSectionReqPipes.get_list_of_watching, mainAuthenticationMiddleware, cont.get_list_of_watching);
    r.get("/list/abandoned", animeBookmarkSectionReqPipes.get_list_of_abandoned, mainAuthenticationMiddleware, cont.get_list_of_abandoned);
    r.get("/list/planned", animeBookmarkSectionReqPipes.get_list_of_planned, mainAuthenticationMiddleware, cont.get_list_of_planned);
    r.get("/list/completed", animeBookmarkSectionReqPipes.get_list_of_completed, mainAuthenticationMiddleware, cont.get_list_of_completed);

    r.post("/add/watching/:anime_id", animeBookmarkSectionReqPipes.create_watching, mainAuthenticationMiddleware, cont.create_watching);
    r.post("/add/abandoned/:anime_id", animeBookmarkSectionReqPipes.create_abandoned, mainAuthenticationMiddleware, cont.create_abandoned);
    r.post("/add/planned/:anime_id", animeBookmarkSectionReqPipes.create_planned, mainAuthenticationMiddleware, cont.create_planned);
    r.post("/add/completed/:anime_id", animeBookmarkSectionReqPipes.create_completed, mainAuthenticationMiddleware, cont.create_completed);

    r.delete("/delete/watching/:anime_id", animeBookmarkSectionReqPipes.delete_watching, mainAuthenticationMiddleware, cont.delete_watching);
    r.delete("/delete/abandoned/:anime_id", animeBookmarkSectionReqPipes.delete_abandoned, mainAuthenticationMiddleware, cont.delete_abandoned);
    r.delete("/delete/planned/:anime_id", animeBookmarkSectionReqPipes.delete_planned, mainAuthenticationMiddleware, cont.delete_planned);
    r.delete("/delete/completed/:anime_id", animeBookmarkSectionReqPipes.delete_completed, mainAuthenticationMiddleware, cont.delete_completed);
    return r;
})();
