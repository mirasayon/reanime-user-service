import { apiKeyToServiceGuard } from "#/app/api-key.guard.js";
import { createConfiguredRouter } from "#/utilities/express-core-middlewares.js";
import { Account_Router } from "[www]/account/account.route.js";
import { Administrator_Router } from "[www]/admin/admin.routes.js";
import { Authentication_Router } from "[www]/authentication/authentication.route.js";
import { Comment_Router } from "[www]/comment-for-anime/comment-for-anime.route.js";
import { FavoriteAnimes_Router } from "[www]/vote-to-anime/vote-to-anime.route.js";
import { MarkedAnimeCollection_Router } from "[www]/anime-bookmark-collection/anime-bookmark-collection.route.js";
import { Ping_Router } from "[www]/ping/ping.route.js";
import { Profile_Router } from "[www]/profile/profile.route.js";
import { Reply_Router } from "[www]/reply/reply.route.js";
import { secureHttpGuard } from "./secure-http.guard.js";
/** Entry Point Router */
export const mainServicesRouter = (() => {
    const router = createConfiguredRouter();
    router.use(apiKeyToServiceGuard);
    router.use(secureHttpGuard);
    router.use("/authentication", Authentication_Router);
    router.use("/administrator", Administrator_Router);
    router.use("/comment", Comment_Router);
    router.use("/reply", Reply_Router);
    router.use("/profile", Profile_Router);
    router.use("/account", Account_Router);
    router.use("/anime/marked_collection", MarkedAnimeCollection_Router);
    router.use("/favorite_animes", FavoriteAnimes_Router);
    router.use("/ping", Ping_Router);
    return router;
})();
