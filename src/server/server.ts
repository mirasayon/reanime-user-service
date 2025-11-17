import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { cookie_parser, json_parser, static_serve } from "#/utils/tools/express.js";
import { entryPointRouter } from "#/app/entry_point.route.js";
import { client_error_handler, not_found_route } from "#/modules/errors/client-side/handler.js";
import { server_exception_handler, unknown_exception_handler } from "#/modules/errors/server-side/handler.js";
import { mainDevServerLogger } from "#/middlewares/dev_logger.js";
import morgan from "morgan";
import { Logger } from "log-it-colored";
import { EnvConfig } from "#/configs/environment-variables.js";
/** Main Express Application */
export const expressMainApplication = (() => {
    const app = express();
    app.disable("x-powered-by");
    app.set("trust proxy", 1);
    app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
    app.use(compression());
    app.use(cors({}));

    app.use(static_serve);
    app.use(cookie_parser);
    app.use(json_parser);

    /** Logger Middlewares */
    app.use(morgan("combined"));
    if (EnvConfig.is_dev) {
        app.use(mainDevServerLogger);
    }

    // Entry Point Router (Main API)
    app.use("/v1", entryPointRouter);

    // Error handlers
    app.use(not_found_route);
    app.use(client_error_handler);
    app.use(server_exception_handler);
    app.use(unknown_exception_handler);
    return app;
})();
