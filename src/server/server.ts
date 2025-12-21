import { mainServicesRouter } from "#/app/main.route.js";
import { EnvConfig } from "#/configs/environment-variables.js";
import { mainDevServerLogger } from "#/middlewares/dev_logger.js";
import { client_error_handler, not_found_route } from "#/modules/errors/client-side/handler.js";
import { server_exception_handler, unknown_exception_handler } from "#/modules/errors/server-side/handler.js";
import { jsonBodyParserMiddleware, mainStaticServerMiddleware } from "#/utils/tools/express.js";
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
    app.use(not_found_route);
    app.use(client_error_handler);
    app.use(server_exception_handler);
    app.use(unknown_exception_handler);
    return app;
})();
