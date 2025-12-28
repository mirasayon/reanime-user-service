import { mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { mediaSectionController as c } from "#src/app/media/media.controller.ts";
import { mediaRoutePipesMiddlewares as pm } from "#src/app/media/media.pipes.ts";
import multer from "multer";
import { mediaFileStrictValidatorMiddleware, requestContentLengthValidatorMiddleware } from "./media.middleware.ts";
export const mediaSectionRouter = (() => {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            files: 1,
        },
    });
    const r = createConfiguredRouter();

    // Set User Avatar
    r.post(
        "/avatar/set",
        requestContentLengthValidatorMiddleware,
        pm.set_avatar,
        mainAuthenticationMiddleware,
        upload.single("one_image_file"),
        mediaFileStrictValidatorMiddleware,
        c.set_avatar,
    );

    // Update User Avatar
    r.patch(
        "/avatar/update",
        requestContentLengthValidatorMiddleware,
        pm.update_avatar,
        mainAuthenticationMiddleware,
        upload.single("one_image_file"),
        mediaFileStrictValidatorMiddleware,
        c.update_avatar,
    );

    r.get("/avatar/view/:username", pm.avatar_view, c.avatar_view);
    // Upload User Avatar
    r.delete("/avatar/delete", pm.delete_avatar, mainAuthenticationMiddleware, c.delete_avatar);
    return r;
})();
