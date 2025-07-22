import { Auth_middleware } from "[www]/authentication/authentication.middleware.js";
import { Profile_Controller as c } from "[www]/profile/profile.controller.js";
import { Profile_ReqPipes as vm } from "[www]/profile/profile.pipes.js";
import { create_router } from "#/utils/tools/express.js";
import multer from "multer";
import { ControllerUtils } from "#/utils/controller.js";
import { too_many_request_to_media_service } from "./profile.middlewares.js";

export const Profile_Router = (() => {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            files: 1,
        },
    });
    const r = create_router();
    r.get("/explore_the_profile/:username", vm.other_profiles, Auth_middleware, c.other_profiles); // Open basic data of someone else's profile by username.

    r.get("/view_my_profile", vm.my_profile, Auth_middleware, c.my_profile); // Открыть свой профиль.

    r.patch("/update/bio", vm.update_bio, Auth_middleware, c.update_bio);

    r.patch("/update/nickname", vm.update_nickname, Auth_middleware, c.update_nickname);

    // Set User Avatar
    r.post(
        "/avatar/set",
        ControllerUtils.ping_the_media_service_middleware,
        vm.set_avatar,
        Auth_middleware,
        too_many_request_to_media_service,
        upload.single("one_avatar_image_file"),
        c.set_avatar,
    );

    // Update User Avatar
    r.patch(
        "/avatar/update",
        ControllerUtils.ping_the_media_service_middleware,
        vm.update_avatar,
        Auth_middleware,
        too_many_request_to_media_service,
        upload.single("one_avatar_image_file"),
        c.update_avatar,
    );

    // Upload User Avatar
    r.delete(
        "/avatar/delete",
        ControllerUtils.ping_the_media_service_middleware,
        vm.delete_avatar,
        Auth_middleware,
        too_many_request_to_media_service,
        c.delete_avatar,
    );
    return r;
})();

