import { ApiKeyGuard } from "#/guards/api-key.js";
import { Account_Router } from "[www]/account/account.route.js";
import { Authentication_Router } from "[www]/authentication/authentication.route.js";
import { Comment_Router } from "[www]/comment/comment.route.js";
import { Profile_Router } from "[www]/profile/profile.route.js";
import { create_router } from "#/utils/tools/express.js";
import { Ping_Router } from "[www]/ping/ping.route.js";
import { MarkedAnimeCollection_Router } from "[www]/marked_anime_collection/marked_anime_collection.route.js";
import { FavoriteAnimes_Router } from "[www]/favorite_animes/favorite_animes.route.js";
import { Reply_Router } from "[www]/reply/reply.route.js";
/** Main Application Router. (Entry Point) */
export const Entry_Point_Router = (() => {
    const app = create_router();
    /** */
    app.use(ApiKeyGuard.middleware);
    app.use("/authentication", Authentication_Router);
    app.use("/comment", Comment_Router);
    app.use("/reply", Reply_Router);
    app.use("/profile", Profile_Router);
    app.use("/account", Account_Router);
    app.use("/anime/marked_collection/my", MarkedAnimeCollection_Router);
    app.use("/favorite_animes", FavoriteAnimes_Router);
    app.use("/ping", Ping_Router);
    /** */
    return app;
})();
