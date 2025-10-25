import { validateEnvironment, builtInSchemas as v } from "safest-env";
import { frontendUrl } from "./constants/frontend-url.js";
const _env = validateEnvironment({
    SERVER_PORT_NUMBER: v.integer(),
    NODE_ENVIRONMENT: v.enum(["development", "test", "production"] as const),
    SERVER_HOSTNAME: v.string(),
    DATABASE_SERVER_CONNECTION_URL: v.string().min(5),
    API_KEY_TO_THIS_SERVER: v.string(),
});
/** Environment variables configuration */
export const EnvConfig = new (class EnvironmentClass {
    /** Standard NODE_ENVIRONMENT. Running mode for application. */
    NODE_ENVIRONMENT = _env.NODE_ENVIRONMENT;
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
    /** This key is used to access to this server */
    api_key_to_this_service = _env.API_KEY_TO_THIS_SERVER as string;
    frontendUrl;
    /** Port and Host Config */
    server = {
        port: Number(_env.SERVER_PORT_NUMBER),
        host: _env.SERVER_HOSTNAME,
    };
})();
