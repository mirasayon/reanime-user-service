import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { userAccountSectionRouter } from "#src/app/user-account/user-account.route.ts";
import { administrationSectionRouter } from "#src/app/administration/administrator.routes.ts";
import { authenticationSectionRouter } from "#src/app/authentication/authentication.route.ts";
import { commentForAnimeSectionRouter } from "#src/app/comment-for-anime/comment-for-anime.route.ts";
import { voteToAnimeSectionRouter } from "#src/app/vote-to-anime/vote-to-anime.route.ts";
import { animeBookmarkSectionRouter } from "#src/app/anime-bookmark-collection/anime-bookmark-collection.route.ts";
import { pingSectionRouter } from "#src/app/ping/ping.route.ts";
import { profileSectionRouter } from "#src/app/user-profile/user-profile.route.ts";
import { replyToCommentSectionRouter } from "#src/app/reply-to-comment/reply-to-comment.route.ts";
import { secureHttpGuardMiddleware } from "./secure-http.guard.ts";
import { mediaSectionRouter } from "#src/app/media/media.route.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";

export const appLayoutRouter = createConfiguredRouter()
    .use(secureHttpGuardMiddleware)
    .use(e.authentication.baseUrl, authenticationSectionRouter)
    .use(e.administration.baseUrl, administrationSectionRouter)
    .use(e.userAccount.baseUrl, userAccountSectionRouter)
    .use(e.userProfile.baseUrl, profileSectionRouter)
    .use(e.commentAboutAnime.baseUrl, commentForAnimeSectionRouter)
    .use(e.replyToComment.baseUrl, replyToCommentSectionRouter)
    .use(e.media.baseUrl, mediaSectionRouter)
    .use(e.animeBookmarks.baseUrl, animeBookmarkSectionRouter)
    .use(e.voteToAnime.baseUrl, voteToAnimeSectionRouter)
    .use(e.ping.baseUrl, pingSectionRouter);
