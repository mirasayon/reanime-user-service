import { mainAuthenticationMiddleware as auth } from "#src/middlewares/authentication-middleware.ts";
import { createConfiguredRouter } from "#src/utilities/express-core-middlewares.ts";
import { mediaSectionController as c } from "#src/app/media/media.controller.ts";
import { mediaRoutePipesMiddlewares as v } from "#src/app/media/media.pipes.ts";
import multer from "multer";
import { mediaFileStrictValidatorMiddleware, requestContentLengthValidatorMiddleware } from "./media.middleware.ts";
import expressJs from "express";
import { fsPathsConfig } from "#src/configs/file-system-path-config.ts";
import { apiKeyToServiceGuard } from "../api-key.guard.ts";
import { endpointsConfig as e } from "#src/shared/endpoints-config.ts";
const uploadOneFileMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 1,
    },
}).single(e.media.UPLOAD_IMAGE_FILENAME);
export const mediaSectionRouter = createConfiguredRouter()
    .post(
        e.media.setAvatar,
        apiKeyToServiceGuard,
        requestContentLengthValidatorMiddleware,
        v.set_avatar,
        auth,
        uploadOneFileMiddleware,
        mediaFileStrictValidatorMiddleware,
        c.set_avatar,
    )
    .patch(
        e.media.updateAvatar,
        apiKeyToServiceGuard,
        requestContentLengthValidatorMiddleware,
        v.update_avatar,
        auth,
        uploadOneFileMiddleware,
        mediaFileStrictValidatorMiddleware,
        c.update_avatar,
    )
    .get(e.media.avatarViewByUsername, v.avatar_view_by_username, c.avatar_view_by_username)
    .use(
        e.media.viewAvatarByFs,
        expressJs.static(fsPathsConfig.profileAvatars, {
            etag: false,
            index: false,
            lastModified: false,
        }),
    )
    .delete(e.media.deleteAvatar, apiKeyToServiceGuard, v.delete_avatar, auth, c.delete_avatar);
