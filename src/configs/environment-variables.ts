import type { WorkingMode, NodeEnv } from "@reanime.art/user-service/types/env.js";
import { env } from "node:process";
const required_env_variables = [
    "SERVER_PORT_NUMBER",
    "NODE_ENVIRONMENT",
    "SERVER_HOSTNAME",
    "MAIN_DATABASE_CONNECTION_URL",
    "WEB_FRONTEND_URL",
    "API_KEY_TO_THIS_SERVER",
    "MEDIA_SERVICE_API_KEY",
    "MEDIA_SERVICE_URL",
] as const;
type TypeEnsuredEnvVarbs = { [name in (typeof required_env_variables)[number]]: string };

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
    return env as TypeEnsuredEnvVarbs;
}
const EnsuredEnv = check();
/** Environment variables configuration */
export const EnvConfig = new (class EnvironmentClass {
    /** Standard NODE_ENVIRONMENT. Running mode for application. */
    NODE_ENVIRONMENT = EnsuredEnv.NODE_ENVIRONMENT;
    /** Custom running mode info object.  */
    mode: WorkingMode = {
        dev: this.NODE_ENVIRONMENT === "development",
        test: this.NODE_ENVIRONMENT === "test",
        prod: this.NODE_ENVIRONMENT === "production",
    };

    /** Api Keys that stored in env files */
    api_keys = {
        media_service_api_key: EnsuredEnv.MEDIA_SERVICE_API_KEY as string,
        /**
         * API key to access the media server.
         * This key is used to authenticate requests to the media server.
         */
        api_key_to_this_service: EnsuredEnv.API_KEY_TO_THIS_SERVER as string,
    };

    /** Config For Other Services */
    service_chain = {
        /** Media Service. Backend part */
        media_service: {
            /** Media server URL based  */
            url: EnsuredEnv.MEDIA_SERVICE_URL!,
        },
        /** Web Frontend Server */
        web_frontend: {
            url: EnsuredEnv.WEB_FRONTEND_URL!,
        },
    };
    /** Database config */
    // db = { connection_uri: EnsuredEnv.MAIN_DATABASE_CONNECTION_URL };
    /** Port and Host Config */
    server = {
        port: Number(EnsuredEnv.SERVER_PORT_NUMBER),
        host: EnsuredEnv.SERVER_HOSTNAME,
    };
})();

