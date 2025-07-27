import { ApiKeyGuard } from "#/guards/api-key.js";
import { Account_Router } from "[www]/account/account.route.js";
import { Authentication_Router } from "[www]/authentication/authentication.route.js";
import { Comment_Router } from "[www]/comment/comment.route.js";
import { Profile_Router } from "[www]/profile/profile.route.js";
import { cRouter } from "#/utils/tools/express.js";
import { Ping_Router } from "[www]/ping/ping.route.js";
import { MarkedAnimeCollection_Router } from "[www]/marked_anime_collection/marked_anime_collection.route.js";
import { FavoriteAnimes_Router } from "[www]/favorite_animes/favorite_animes.route.js";
import { Reply_Router } from "[www]/reply/reply.route.js";
/** Main Application Router. (Entry Point) */
export const Entry_Point_Router = (() => {
    const r = cRouter();
    /** */
    r.use(ApiKeyGuard);
    r.use("/authentication", Authentication_Router);
    r.use("/comment", Comment_Router);
    r.use("/reply", Reply_Router);
    r.use("/profile", Profile_Router);
    r.use("/account", Account_Router);
    r.use("/anime/marked_collection", MarkedAnimeCollection_Router);
    r.use("/favorite_animes", FavoriteAnimes_Router);
    r.use("/ping", Ping_Router);
    /** */
    return r;
})();

