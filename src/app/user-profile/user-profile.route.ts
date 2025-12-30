import { mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { profileSectionController as c } from "#src/app/user-profile/user-profile.controller.ts";
import { profileRequestValidatorMiddlewares as v } from "#src/app/user-profile/user-profile.pipes.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";

export const profileSectionRouter = (() => {
    const r = createConfiguredRouter();

    r.get(e.userProfile.exploreOthersProfile, v.other_profiles, c.other_profiles);

    r.get(e.userProfile.viewMyProfile, v.my_profile, mainAuthenticationMiddleware, c.view_my_profile);

    r.patch(e.userProfile.updateBio, v.update_bio, mainAuthenticationMiddleware, c.update_bio);

    r.patch(e.userProfile.updateNickname, v.update_nickname, mainAuthenticationMiddleware, c.update_nickname);

    return r;
})();
