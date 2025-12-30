import { mainAuthenticationMiddleware as auth } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { profileSectionController as c } from "#src/app/user-profile/user-profile.controller.ts";
import { profileRequestValidatorMiddlewares as v } from "#src/app/user-profile/user-profile.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";

export const profileSectionRouter = createConfiguredRouter()
    .get(e.userProfile.exploreOthersProfile, v.other_profiles, c.other_profiles)

    .get(e.userProfile.viewMyProfile, v.my_profile, auth, c.view_my_profile)

    .patch(e.userProfile.updateBio, v.update_bio, auth, c.update_bio)

    .patch(e.userProfile.updateNickname, v.update_nickname, auth, c.update_nickname);
