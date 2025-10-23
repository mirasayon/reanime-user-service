import { Auth_middleware } from "#/middlewares/authentication.js";
import { Profile_Controller as c } from "[www]/profile/profile.controller.js";
import { Profile_ReqPipes as vm } from "[www]/profile/profile.pipes.js";
import { cRouter } from "#/utils/tools/express.js";
import multer from "multer";
import { too_many_request_to_media_service } from "./profile.middlewares.js";

export const Profile_Router = (() => {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            files: 1,
        },
    });
    const r = cRouter();
    r.get("/explore_others_profile/:username", vm.other_profiles, c.other_profiles); // Open basic data of someone else's profile by username.

    r.get("/view_my_profile", vm.my_profile, Auth_middleware, c.view_my_profile); // Открыть свой профиль.

    r.patch("/update/bio", vm.update_bio, Auth_middleware, c.update_bio);

    r.patch("/update/nickname", vm.update_nickname, Auth_middleware, c.update_nickname);

    // Set User Avatar
    r.post("/avatar/set", vm.set_avatar, Auth_middleware, too_many_request_to_media_service, upload.single("one_avatar_image_file"), c.set_avatar);

    // Update User Avatar
    r.patch(
        "/avatar/update",
        vm.update_avatar,
        Auth_middleware,
        too_many_request_to_media_service,
        upload.single("one_avatar_image_file"),
        c.update_avatar,
    );

    // Upload User Avatar
    r.delete("/avatar/delete", vm.delete_avatar, Auth_middleware, too_many_request_to_media_service, c.delete_avatar);
    return r;
})();
