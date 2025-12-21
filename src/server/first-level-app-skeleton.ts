import { mainServicesRouter } from "#/app/main.route.js";
import { EnvConfig } from "#/configs/environment-variables.js";
import { notFoundRouteErrorMiddleware, clientSideErrorMiddleware } from "#/handlers/errors/client-side-errors-handler.js";
import { serverSideExceptionHandlerMiddleware, unknownServerSideExceptionHandlerMiddleware } from "#/handlers/errors/server-side-errors-handler.js";
import { mainDevServerLogger } from "#/middlewares/development-env-logger-middleware.js";
import { jsonBodyParserMiddleware, mainStaticServerMiddleware } from "#/utilities/tools/express.js";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
/** Main Express Application */
export const expressMainApplication = (() => {
    const app = express();
    app.disable("x-powered-by");
    app.set("trust proxy", 1);
    app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
    app.use(compression());
    app.use(cors({}));

    app.use(mainStaticServerMiddleware);
    app.use(jsonBodyParserMiddleware);

    /** Logger Middlewares */
    app.use(morgan("tiny"));
    if (EnvConfig.is_dev) {
        app.use(mainDevServerLogger);
    }

    // Entry Point Router (Main API)
    app.use("/v1", mainServicesRouter);

    // Error handlers
    app.use(notFoundRouteErrorMiddleware);
    app.use(clientSideErrorMiddleware);
    app.use(serverSideExceptionHandlerMiddleware);
    app.use(unknownServerSideExceptionHandlerMiddleware);
    return app;
})();
