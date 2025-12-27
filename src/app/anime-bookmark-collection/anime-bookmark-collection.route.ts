import { mainAuthenticationMiddleware } from "#/middlewares/authentication-middleware.js";
import { createConfiguredRouter } from "#/utilities/express-core-middlewares.js";
import { animeBookmarkSectionController } from "#/app/anime-bookmark-collection/anime-bookmark-collection.controller.js";
import { animeBookmarkSectionReqPipes } from "#/app/anime-bookmark-collection/anime-bookmark-collection.pipes.js";
export const animeBookmarkSectionRouter = (() => {
    const r = createConfiguredRouter();

    r.get("/list/all", animeBookmarkSectionReqPipes.get_all_list, mainAuthenticationMiddleware, animeBookmarkSectionController.get_all_list);

    r.get("/get/:anime_id", animeBookmarkSectionReqPipes.get_for_anime, mainAuthenticationMiddleware, animeBookmarkSectionController.get_for_anime);

    r.get(
        "/list/watching",
        animeBookmarkSectionReqPipes.get_list_of_watching,
        mainAuthenticationMiddleware,
        animeBookmarkSectionController.get_list_of_watching,
    );
    r.get(
        "/list/abandoned",
        animeBookmarkSectionReqPipes.get_list_of_abandoned,
        mainAuthenticationMiddleware,
        animeBookmarkSectionController.get_list_of_abandoned,
    );
    r.get(
        "/list/planned",
        animeBookmarkSectionReqPipes.get_list_of_planned,
        mainAuthenticationMiddleware,
        animeBookmarkSectionController.get_list_of_planned,
    );
    r.get(
        "/list/completed",
        animeBookmarkSectionReqPipes.get_list_of_completed,
        mainAuthenticationMiddleware,
        animeBookmarkSectionController.get_list_of_completed,
    );

    r.post(
        "/add/watching/:anime_id",
        animeBookmarkSectionReqPipes.create_watching,
        mainAuthenticationMiddleware,
        animeBookmarkSectionController.create_watching,
    );
    r.post(
        "/add/abandoned/:anime_id",
        animeBookmarkSectionReqPipes.create_abandoned,
        mainAuthenticationMiddleware,
        animeBookmarkSectionController.create_abandoned,
    );
    r.post(
        "/add/planned/:anime_id",
        animeBookmarkSectionReqPipes.create_planned,
        mainAuthenticationMiddleware,
        animeBookmarkSectionController.create_planned,
    );
    r.post(
        "/add/completed/:anime_id",
        animeBookmarkSectionReqPipes.create_completed,
        mainAuthenticationMiddleware,
        animeBookmarkSectionController.create_completed,
    );

    r.delete(
        "/delete/watching/:anime_id",
        animeBookmarkSectionReqPipes.delete_watching,
        mainAuthenticationMiddleware,
        animeBookmarkSectionController.delete_watching,
    );
    r.delete(
        "/delete/abandoned/:anime_id",
        animeBookmarkSectionReqPipes.delete_abandoned,
        mainAuthenticationMiddleware,
        animeBookmarkSectionController.delete_abandoned,
    );
    r.delete(
        "/delete/planned/:anime_id",
        animeBookmarkSectionReqPipes.delete_planned,
        mainAuthenticationMiddleware,
        animeBookmarkSectionController.delete_planned,
    );
    r.delete(
        "/delete/completed/:anime_id",
        animeBookmarkSectionReqPipes.delete_completed,
        mainAuthenticationMiddleware,
        animeBookmarkSectionController.delete_completed,
    );
    return r;
})();
