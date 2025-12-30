import { mainAuthenticationMiddleware as auth } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { animeBookmarkSectionController as c } from "#src/app/anime-bookmark-collection/anime-bookmark-collection.controller.ts";
import { animeBookmarkSectionReqPipes as v } from "#src/app/anime-bookmark-collection/anime-bookmark-collection.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";
export const animeBookmarkSectionRouter = createConfiguredRouter()
    .get(e.animeBookmarks.getAllList, v.get_all_list, auth, c.get_all_list)

    .get(e.animeBookmarks.getStatusForAnime, v.get_for_anime, auth, c.get_for_anime)

    .get(e.animeBookmarks.getListOfWatching, v.get_list_of_watching, auth, c.get_list_of_watching)
    .get(e.animeBookmarks.getListOfAbandoned, v.get_list_of_abandoned, auth, c.get_list_of_abandoned)
    .get(e.animeBookmarks.getListOfPlanned, v.get_list_of_planned, auth, c.get_list_of_planned)
    .get(e.animeBookmarks.getListOfCompleted, v.get_list_of_completed, auth, c.get_list_of_completed)

    .post(e.animeBookmarks.createWatching, v.create_watching, auth, c.create_watching)
    .post(e.animeBookmarks.createAbandoned, v.create_abandoned, auth, c.create_abandoned)
    .post(e.animeBookmarks.createPlanned, v.create_planned, auth, c.create_planned)
    .post(e.animeBookmarks.createCompleted, v.create_completed, auth, c.create_completed)

    .delete(e.animeBookmarks.deleteWatching, v.delete_watching, auth, c.delete_watching)
    .delete(e.animeBookmarks.deleteAbandoned, v.delete_abandoned, auth, c.delete_abandoned)
    .delete(e.animeBookmarks.deletePlanned, v.delete_planned, auth, c.delete_planned)
    .delete(e.animeBookmarks.deleteCompleted, v.delete_completed, auth, c.delete_completed);
