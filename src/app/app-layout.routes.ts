import { apiKeyToServiceGuard } from "#src/app/api-key.guard.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { accountSectionRouter } from "#src/app/user-account/user-account.route.ts";
import { administratorSectionRouter } from "#src/app/administrator/administrator.routes.ts";
import { authenticationSectionRouter } from "#src/app/authentication/authentication.route.ts";
import { commentForAnimeSectionRouter } from "#src/app/comment-for-anime/comment-for-anime.route.ts";
import { voteToAnimeSectionRouter } from "#src/app/vote-to-anime/vote-to-anime.route.ts";
import { animeBookmarkSectionRouter } from "#src/app/anime-bookmark-collection/anime-bookmark-collection.route.ts";
import { pingSectionRouter } from "#src/app/ping/ping.route.ts";
import { profileSectionRouter } from "#src/app/user-profile/user-profile.route.ts";
import { replyToCommentSectionRouter } from "#src/app/reply-to-comment/reply-to-comment.route.ts";
import { secureHttpGuardMiddleware } from "./secure-http.guard.ts";
import { mediaSectionRouter } from "#src/app/media/media.route.ts";
/** Entry Point Router */
export const appLayoutRouter = (() => {
    const router = createConfiguredRouter();
    router.use(secureHttpGuardMiddleware);
    router.use("/authentication", apiKeyToServiceGuard, authenticationSectionRouter);
    router.use("/administration", apiKeyToServiceGuard, administratorSectionRouter);
    router.use("/comment-to-anime", apiKeyToServiceGuard, commentForAnimeSectionRouter);
    router.use("/reply-to-comment", apiKeyToServiceGuard, replyToCommentSectionRouter);
    router.use("/user-profile", apiKeyToServiceGuard, profileSectionRouter);
    router.use("/media", mediaSectionRouter);
    router.use("/user-account", apiKeyToServiceGuard, accountSectionRouter);
    router.use("/anime/anime-bookmark-collection", apiKeyToServiceGuard, animeBookmarkSectionRouter);
    router.use("/anime/vote-to-anime", apiKeyToServiceGuard, voteToAnimeSectionRouter);
    router.use("/ping", apiKeyToServiceGuard, pingSectionRouter);
    return router;
})();
