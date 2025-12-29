import { validateEnvironment, builtInSchemas as v } from "safest-env";
import { frontendUrl } from "../constants/frontend-url-constant.ts";
const env = validateEnvironment({
    PASSWORD_HASH_PEPPER: v.string().min(5),
    SESSION_TOKEN_HMAC_SECRET: v.string().min(5),
    SERVER_PORT_NUMBER: v.integer(),
    NODE_ENVIRONMENT: v.enum(["development", "test", "production"] as const),
    SERVER_HOSTNAME: v.string(),
    DATABASE_SERVER_CONNECTION_URL: v.string().min(5),
    API_KEY_TO_THIS_SERVER: v.string().min(5),
});
/** Environment variables configuration*/
export const envConfig = {
    mode: env.NODE_ENVIRONMENT,
    frontendUrl: frontendUrl[env.NODE_ENVIRONMENT],
    isDev: env.NODE_ENVIRONMENT === "development",
    isTest: env.NODE_ENVIRONMENT === "test",
    isProd: env.NODE_ENVIRONMENT === "production",
    passwordHashPepper: env.PASSWORD_HASH_PEPPER,
    /** Database connection URL */
    dbConnectionUrl: env.DATABASE_SERVER_CONNECTION_URL,
    sessionTokenHmacSecret: env.SESSION_TOKEN_HMAC_SECRET,
    /** API Key to this service */
    apiKeyToThisService: env.API_KEY_TO_THIS_SERVER,
    /** Port, hostname */
    server: {
        port: env.SERVER_PORT_NUMBER,
        host: env.SERVER_HOSTNAME,
    },
};
