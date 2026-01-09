import { appLayoutRouter } from "#src/app/app-layout.routes.ts";
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

/** Express application */
export const expressMainApplication = (() => {
    const app = expressJs();
    app.disable("x-powered-by");
    app.set("trust proxy", true);
    app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
    app.use(compression());
    app.use(cors());

    app.use(staticPublicFolderMiddleware);
    app.use(jsonBodyParserMiddleware);
    app.use(requireClientIpMiddleware);
    /** Logger Middlewares */
    app.use(morgan("combined"));
    if (envConfig.isDev) {
        app.use(mainDevServerLogger);
    }

    // App
    app.use(apiKeyToServiceGuard);
    app.use("/v1", appLayoutRouter);

    // Error handlers
    app.use(notFoundRouteErrorMiddleware);
    app.use(clientSideErrorMiddleware);
    app.use(serverSideExceptionHandlerMiddleware);
    app.use(unknownServerSideExceptionHandlerLastMiddleware);
    return app;
})();
