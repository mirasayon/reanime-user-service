import { v1ApiLayout } from "#src/app/app-layout.routes.ts";
import { requireClientIpMiddleware } from "#src/app/require-client-ip.guard.ts";
import { envConfig } from "#src/configs/env-variables-config.ts";
import { notFoundRouteErrorMiddleware, clientSideErrorMiddleware } from "#src/handlers/client-side-errors-handler.ts";
import { serverSideExceptionHandlerMiddleware, unknownServerSideExceptionHandlerLastMiddleware } from "#src/handlers/server-side-errors-handler.ts";
import { mainDevServerLogger } from "#src/middlewares/development-env-logger-middleware.ts";
import { jsonBodyParserMiddleware, staticPublicFolderMiddleware } from "#src/utilities/express-core-middlewares.ts";
import compression from "compression";
import cors from "cors";
import expressJs from "express";
import helmet from "helmet";
import morgan from "morgan";
import { apiKeyToServiceGuard } from "#src/app/api-key.guard.ts";
import { secureHttpGuardMiddleware } from "#src/app/secure-http.guard.ts";
import { endpointsConfig } from "#src/shared/endpoints-config.ts";
import { fsPathsConfig } from "#src/configs/file-system-path-config.ts";
/** Express application */
export const expressMainApplication = (() => {
    const app = expressJs();
    app.disable("x-powered-by");
    app.set("trust proxy", true);
    app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
    app.use(compression());
    app.use(cors());
    /** Logging */
    app.use(morgan("combined"));
    app.use(secureHttpGuardMiddleware);
    app.use("/", staticPublicFolderMiddleware);
    app.use(
        "/v1" + endpointsConfig.media.baseUrl + endpointsConfig.media.viewAvatarByFs,
        expressJs.static(fsPathsConfig.profileAvatars, {
            etag: false,
            index: false,
            lastModified: false,
        }),
    );
    app.use(requireClientIpMiddleware);
    app.use(jsonBodyParserMiddleware);

    if (envConfig.isDev) {
        app.use(mainDevServerLogger);
    }

    // App
    app.use(apiKeyToServiceGuard);
    app.use("/v1", v1ApiLayout);

    // Error handlers
    app.use(notFoundRouteErrorMiddleware);
    app.use(clientSideErrorMiddleware);
    app.use(serverSideExceptionHandlerMiddleware);
    app.use(unknownServerSideExceptionHandlerLastMiddleware);
    return app;
})();
