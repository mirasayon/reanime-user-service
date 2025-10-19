import type { TypeServerWorkMode } from "#/configs/node-env.types.js";
import { validateEnvironment, builtInSchemas as v } from "safest-env";
const _env = validateEnvironment({
    SERVER_PORT_NUMBER: v.integer(),
    NODE_ENVIRONMENT: v.enum(["development", "test", "production"] as const),
    SERVER_HOSTNAME: v.string(),
    DATABASE_SERVER_CONNECTION_URL: v.string().min(5),
    WEB_FRONTEND_URL: v.url(),
    API_KEY_TO_THIS_SERVER: v.string(),
    MEDIA_SERVICE_API_KEY: v.string(),
    MEDIA_SERVICE_URL: v.url(),
});
/** Environment variables configuration */
export const EnvConfig = new (class EnvironmentClass {
    /** Standard NODE_ENVIRONMENT. Running mode for application. */
    NODE_ENVIRONMENT = _env.NODE_ENVIRONMENT;
    /** Custom running mode info object.  */
    mode: TypeServerWorkMode = {
        dev: this.NODE_ENVIRONMENT === "development",
        test: this.NODE_ENVIRONMENT === "test",
        prod: this.NODE_ENVIRONMENT === "production",
    };

    /** DB Connection URL */
    dbConnectionUrl = _env.DATABASE_SERVER_CONNECTION_URL;
    /** Api Keys that stored in env files */
    api_keys = {
        media_service_api_key: _env.MEDIA_SERVICE_API_KEY as string,
        /**
         * API key to access the media server.
         * This key is used to authenticate requests to the media server.
         */
        api_key_to_this_service: _env.API_KEY_TO_THIS_SERVER as string,
    };

    /** Config For Other Services */
    service_chain = {
        /** Media Service. Backend part */
        media_service: {
            /** Media server URL based  */
            url: _env.MEDIA_SERVICE_URL!,
        },
        /** Web Frontend Server */
        web_frontend: {
            url: _env.WEB_FRONTEND_URL!,
        },
    };
    /** Port and Host Config */
    server = {
        port: Number(_env.SERVER_PORT_NUMBER),
        host: _env.SERVER_HOSTNAME,
    };
})();
