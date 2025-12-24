import { mainServicesRouter } from "#/app/app-layout.routes.js";
import { envMainConfig } from "#/configs/environment-variables-config.js";
import { notFoundRouteErrorMiddleware, clientSideErrorMiddleware } from "#/handlers/client-side-errors-handler.js";
import { serverSideExceptionHandlerMiddleware, unknownServerSideExceptionHandlerLastMiddleware } from "#/handlers/server-side-errors-handler.js";
import { mainDevServerLogger } from "#/middlewares/development-env-logger-middleware.js";
import { jsonBodyParserMiddleware, mainStaticServerMiddleware } from "#/utilities/express-core-middlewares.js";
import compression from "compression";
import cors from "cors";
import expressJs from "express";
import helmet from "helmet";
import morgan from "morgan";
/** Main Express Application */
export const expressMainApplication = (() => {
    const app = expressJs();
    app.disable("x-powered-by");
    app.set("trust proxy", 1);
    app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
    app.use(compression());
    app.use(cors({}));

    app.use(mainStaticServerMiddleware);
    app.use(jsonBodyParserMiddleware);

    /** Logger Middlewares */
    app.use(morgan("tiny"));
    if (envMainConfig.is_dev) {
        app.use(mainDevServerLogger);
    }

    // Entry Point Router (Main API)
    app.use("/v1", mainServicesRouter);

    // Error handlers
    app.use(notFoundRouteErrorMiddleware);
    app.use(clientSideErrorMiddleware);
    app.use(serverSideExceptionHandlerMiddleware);
    app.use(unknownServerSideExceptionHandlerLastMiddleware);
    return app;
})();
