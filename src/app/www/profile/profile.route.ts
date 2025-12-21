import { mainAuthenticationMiddleware } from "#/middlewares/authentication.js";
import { createConfiguredRouter } from "#/utils/tools/express.js";
import { Profile_Controller as c } from "[www]/profile/profile.controller.js";
import { Profile_ReqPipes as vm } from "[www]/profile/profile.pipes.js";
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

    // Set User Avatar
    r.post("/avatar/set", vm.set_avatar, mainAuthenticationMiddleware, upload.single("one_avatar_image_file"), c.set_avatar);

    // Update User Avatar
    r.patch("/avatar/update", vm.update_avatar, mainAuthenticationMiddleware, upload.single("one_avatar_image_file"), c.update_avatar);

    r.get("/avatar/view/:username", vm.avatar_view, c.avatar_view);
    // Upload User Avatar
    r.delete("/avatar/delete", vm.delete_avatar, mainAuthenticationMiddleware, c.delete_avatar);
    return r;
})();
