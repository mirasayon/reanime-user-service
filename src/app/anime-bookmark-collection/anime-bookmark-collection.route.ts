import { mainAuthenticationMiddleware as auth } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { animeBookmarkSectionController as c } from "#src/app/anime-bookmark-collection/anime-bookmark-collection.controller.ts";
import { animeBookmarkSectionReqPipes as v } from "#src/app/anime-bookmark-collection/anime-bookmark-collection.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";
export const animeBookmarkSectionRouter = (() => {
    const r = createConfiguredRouter();

    r.get(e.animeBookmarks.getAllList, v.get_all_list, auth, c.get_all_list);

    r.get(e.animeBookmarks.getForAnime, v.get_for_anime, auth, c.get_for_anime);

    r.get(e.animeBookmarks.getListOfWatching, v.get_list_of_watching, auth, c.get_list_of_watching);
    r.get(e.animeBookmarks.getListOfAbandoned, v.get_list_of_abandoned, auth, c.get_list_of_abandoned);
    r.get(e.animeBookmarks.getListOfPlanned, v.get_list_of_planned, auth, c.get_list_of_planned);
    r.get(e.animeBookmarks.getListOfCompleted, v.get_list_of_completed, auth, c.get_list_of_completed);

    r.post(e.animeBookmarks.createWatching, v.create_watching, auth, c.create_watching);
    r.post(e.animeBookmarks.createAbandoned, v.create_abandoned, auth, c.create_abandoned);
    r.post(e.animeBookmarks.createPlanned, v.create_planned, auth, c.create_planned);
    r.post(e.animeBookmarks.createCompleted, v.create_completed, auth, c.create_completed);

    r.delete(e.animeBookmarks.deleteWatching, v.delete_watching, auth, c.delete_watching);
    r.delete(e.animeBookmarks.deleteAbandoned, v.delete_abandoned, auth, c.delete_abandoned);
    r.delete(e.animeBookmarks.deletePlanned, v.delete_planned, auth, c.delete_planned);
    r.delete(e.animeBookmarks.deleteCompleted, v.delete_completed, auth, c.delete_completed);
    return r;
})();
