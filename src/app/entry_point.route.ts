import { ApiKeyGuard } from "#/guards/api-key.guard.js";
import { Account_Router } from "[www]/account/account.route.js";
import { Authentication_Router } from "[www]/authentication/authentication.route.js";
import { Comment_Router } from "[www]/comment/comment.route.js";
import { Profile_Router } from "[www]/profile/profile.route.js";
import { cRouter } from "#/utils/tools/express.js";
import { Ping_Router } from "[www]/ping/ping.route.js";
import { MarkedAnimeCollection_Router } from "[www]/marked_anime_collection/marked_anime_collection.route.js";
import { FavoriteAnimes_Router } from "[www]/favorite_animes/favorite_animes.route.js";
import { Reply_Router } from "[www]/reply/reply.route.js";
/** Entry Point Router */
export const mainServicesRouter = (() => {
    const router = cRouter();
    router.use(ApiKeyGuard("/profile/avatar/view/"));
    router.use("/authentication", Authentication_Router);
    router.use("/comment", Comment_Router);
    router.use("/reply", Reply_Router);
    router.use("/profile", Profile_Router);
    router.use("/account", Account_Router);
    router.use("/anime/marked_collection", MarkedAnimeCollection_Router);
    router.use("/favorite_animes", FavoriteAnimes_Router);
    router.use("/ping", Ping_Router);
    return router;
})();
