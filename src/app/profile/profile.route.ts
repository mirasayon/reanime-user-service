import { mainAuthenticationMiddleware } from "#/middlewares/authentication-middleware.js";
import { createConfiguredRouter } from "#/utilities/express-core-middlewares.js";
import { Profile_Controller as c } from "#/app/profile/profile.controller.js";
import { profileRequestValidatorMiddlewares as vm } from "#/app/profile/profile.pipes.js";
import multer from "multer";

export const Profile_Router = (() => {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            files: 1,
        },
    });
    const r = createConfiguredRouter();

    r.get("/explore_others_profile/:username", vm.other_profiles, c.other_profiles); // Open basic data of someone else's profile by username.

    r.get("/view_my_profile", vm.my_profile, mainAuthenticationMiddleware, c.view_my_profile); // Открыть свой профиль.

    r.patch("/update/bio", vm.update_bio, mainAuthenticationMiddleware, c.update_bio);

    r.patch("/update/nickname/to/:nickname", vm.update_nickname, mainAuthenticationMiddleware, c.update_nickname);

    return r;
})();
