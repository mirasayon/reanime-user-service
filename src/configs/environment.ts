import type { WorkingMode, NodeEnv } from "@reanime.art/user-service/types/env.js";
import { env } from "node:process";
const required_env_variables = [
    "SERVER_PORT_NUMBER",
    "NODE_ENVIRONMENT",
    "SERVER_HOSTNAME",
    "MAIN_DATABASE_CONNECTION_URL",
    "REANIME_FRONTEND_URL",
    "API_KEY_TO_THIS_SERVER",
    "REANIME_MEDIA_SERVICE_API_KEY",
    "SALT_ROUND_NUMBER",
    "REANIME_MEDIA_SERVICE_URL",
];
function check() {
    for (const _var of required_env_variables) {
        if (!Object.hasOwn(env, _var)) {
            throw new Error(`Env var ${_var} is required!`);
        }
        if (typeof env[_var] !== "string") {
            throw new Error(`Env var ${_var} must be a string!`);
        }
        if (!["development", "test", "production"].includes(env.NODE_ENVIRONMENT!)) {
            throw new Error(`Invalid NODE_ENVIRONMENT value: ${env.NODE_ENVIRONMENT}`);
        }
    }
}
check();
/** Environment variables configuration */
export const EnvConfig = new (class EnvironmentClass {
    /** Standard NODE_ENVIRONMENT. Running mode for application. */
    NODE_ENVIRONMENT = env.NODE_ENVIRONMENT as NodeEnv;
    /** Custom running mode info object.  */
    mode: WorkingMode = {
        dev: this.NODE_ENVIRONMENT === "development",
        test: this.NODE_ENVIRONMENT === "test",
        prod: this.NODE_ENVIRONMENT === "production",
    };

    /** Api Keys that stored in env files */
    api_keys = {
        media_service_api_key: env.REANIME_MEDIA_SERVICE_API_KEY as string,
        /**
         * API key to access the media server.
         * This key is used to authenticate requests to the media server.
         */
        api_key_to_this_service: env.API_KEY_TO_THIS_SERVER as string,
    };

    /** Config For Other Services */
    service_chain = {
        /** Media Service. Backend part */
        media_service: {
            /** Media server URL based  */
            url: env.REANIME_MEDIA_SERVICE_URL!,
        },
        /** Web Frontend Server */
        web_frontend: {
            url: env.REANIME_FRONTEND_URL!,
        },
    };

    /** Config for crypto modules */
    crypto_config = {
        crypto_salting_rounds: Number(env.SALT_ROUND_NUMBER as string),
    };

    /** Configs for 3rd party modules and server */
    config_for_this_server = {
        /** Database config */
        db: { connection_uri: env.MAIN_DATABASE_CONNECTION_URL as string },
        /** Port and Host Config */
        server: {
            port: Number(env.SERVER_PORT_NUMBER),
            host: env.SERVER_HOSTNAME as string,
        },
    };
})();

