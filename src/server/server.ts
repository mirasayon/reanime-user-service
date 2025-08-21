import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { cookie_parser, json_parser, static_serve } from "#/utils/tools/express.js";
import { Entry_Point_Router } from "#/app/entry_point.route.js";
import { client_error_handler, not_found_route } from "%/errors/client-side/handler.js";
import { server_exception_handler, unknown_exception_handler } from "%/errors/server-side/handler.js";
import { dev_logger } from "#/middlewares/dev_logger.js";
import morgan from "morgan";

export const Express_Main_Server = (() => {
    const S = express();

    S.disable("x-powered-by");
    S.set("trust proxy", 1);

    S.use(helmet());
    S.use(compression());
    S.use(cors({}));

    S.use(static_serve);
    S.use(cookie_parser);
    S.use(json_parser);

    /** Logger Middlewares */
    S.use(morgan("combined"));
    S.use(dev_logger);

    // Entry Point Router (Main API)
    S.use("/v1", Entry_Point_Router);

    // Error handlers
    S.use(not_found_route);
    S.use(client_error_handler);
    S.use(server_exception_handler);
    S.use(unknown_exception_handler);
    return S;
})();

