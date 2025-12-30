import { mainAuthenticationMiddleware } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { mediaSectionController as c } from "#src/app/media/media.controller.ts";
import { mediaRoutePipesMiddlewares as v } from "#src/app/media/media.pipes.ts";
import multer from "multer";
import { mediaFileStrictValidatorMiddleware, requestContentLengthValidatorMiddleware } from "./media.middleware.ts";
import expressJs from "express";
import { fsPathsConfig } from "#src/configs/file-system-path-config.ts";
import { apiKeyToServiceGuard } from "../api-key.guard.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";
export const mediaSectionRouter = (() => {
    const r = createConfiguredRouter();
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            files: 1,
        },
    });
    r.post(
        e.media.setAvatar,
        apiKeyToServiceGuard,
        requestContentLengthValidatorMiddleware,
        v.set_avatar,
        mainAuthenticationMiddleware,
        upload.single("one_image_file"),
        mediaFileStrictValidatorMiddleware,
        c.set_avatar,
    );
    r.patch(
        e.media.updateAvatar,
        apiKeyToServiceGuard,
        requestContentLengthValidatorMiddleware,
        v.update_avatar,
        mainAuthenticationMiddleware,
        upload.single("one_image_file"),
        mediaFileStrictValidatorMiddleware,
        c.update_avatar,
    );

    r.get(e.media.avatarViewByUsername, v.avatar_view_by_username, c.avatar_view_by_username);
    r.use(
        e.media.viewAvatarByFs,
        expressJs.static(fsPathsConfig.profileAvatars, {
            etag: false,
            index: false,
            lastModified: false,
        }),
    );
    r.delete(e.media.deleteAvatar, apiKeyToServiceGuard, v.delete_avatar, mainAuthenticationMiddleware, c.delete_avatar);
    return r;
})();
