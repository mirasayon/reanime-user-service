import { mainAuthenticationMiddleware } from "#/middlewares/authentication-middleware.js";
import { createConfiguredRouter } from "#/utilities/express-core-middlewares.js";
import { mediaRouteController as c } from "[www]/media/media.controller.js";
import { mediaRoutePipesMiddlewares as pm } from "[www]/media/media.pipes.js";
import multer from "multer";

export const mediaRouteRouter = (() => {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            files: 1,
        },
    });
    const r = createConfiguredRouter();

    // Set User Avatar
    r.post("/avatar/set", pm.set_avatar, mainAuthenticationMiddleware, upload.single("one_avatar_image_file"), c.set_avatar);

    // Update User Avatar
    r.patch("/avatar/update", pm.update_avatar, mainAuthenticationMiddleware, upload.single("one_avatar_image_file"), c.update_avatar);

    r.get("/avatar/view/:username", pm.avatar_view, c.avatar_view);
    // Upload User Avatar
    r.delete("/avatar/delete", pm.delete_avatar, mainAuthenticationMiddleware, c.delete_avatar);
    return r;
})();
