import { validateEnvironment, builtInSchemas as v } from "safest-env";
import { frontendUrl } from "./constants/frontend-url.js";
const _env = validateEnvironment({
    SERVER_PORT_NUMBER: v.integer(),
    NODE_ENVIRONMENT: v.enum(["development", "test", "production"] as const),
    SERVER_HOSTNAME: v.string(),
    DATABASE_SERVER_CONNECTION_URL: v.string().min(5),
    API_KEY_TO_THIS_SERVER: v.string(),
    AVATAR_IMAGE_FILENAME_HASH_SECRET: v.string(),
    COVER_IMAGE_FILENAME_HASH_SECRET: v.string(),
});
/** Environment variables configuration */
export const EnvConfig = new (class EnvironmentClass {
    /** Standard NODE_ENVIRONMENT. Running mode for application. */
    NODE_ENVIRONMENT = _env.NODE_ENVIRONMENT;
    /** Custom running mode info object.  */

    constructor() {
        let mode: "dev" | "test" | "prod";
        switch (this.NODE_ENVIRONMENT) {
            case "development": {
                mode = "dev";
                break;
            }
            case "test": {
                mode = "test";
                break;
            }
            case "production": {
                mode = "prod";
                break;
            }
            default: {
                throw new Error("Unknown Environment Mode: " + this.NODE_ENVIRONMENT);
            }
        }
        this.frontendUrl = frontendUrl[mode];
        this.currentMode = mode;
    }
    is_dev = this.NODE_ENVIRONMENT === "development";
    is_test = this.NODE_ENVIRONMENT === "test";
    is_prod = this.NODE_ENVIRONMENT === "production";
    currentMode: "dev" | "test" | "prod";

    /** DB Connection URL */
    dbConnectionUrl = _env.DATABASE_SERVER_CONNECTION_URL;
    /** Api Keys that stored in env files */
    api_keys = {
        /**
         * API key to access the media server.
         * This key is used to authenticate requests to the media server.
         */
        api_key_to_this_service: _env.API_KEY_TO_THIS_SERVER as string,
    };

    keys = {
        hmac_key_for_avatar_image_filename: _env.AVATAR_IMAGE_FILENAME_HASH_SECRET as string,
        hmac_key_for_cover_image_filename: _env.COVER_IMAGE_FILENAME_HASH_SECRET as string,
    };
    frontendUrl;
    /** Port and Host Config */
    server = {
        port: Number(_env.SERVER_PORT_NUMBER),
        host: _env.SERVER_HOSTNAME,
    };
})();
