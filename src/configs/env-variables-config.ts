import { validateEnvironment, builtInSchemas as v } from "safest-env";
const env = validateEnvironment({
    PASSWORD_HASH_PEPPER: v.string().min(5),
    SESSION_TOKEN_HMAC_SECRET: v.string().min(5),
    NODE_ENV: v.enum(["development", "test", "production"] as const),
    HOSTNAME: v.string(),
    DATABASE_URL: v.string().min(5),
    FRONTEND_URL: v.string(),
    PORT: v.integer(),
    INTERNAL_API_KEY: v.string().min(5),
});
/** Environment variables configuration*/
export const envConfig = {
    NODE_ENV: env.NODE_ENV,
    frontendUrl: env.FRONTEND_URL,
    isDev: env.NODE_ENV === "development",
    isTest: env.NODE_ENV === "test",
    isProd: env.NODE_ENV === "production",
    passwordHashPepper: env.PASSWORD_HASH_PEPPER,
    /** Database connection URL */
    databaseUrl: env.DATABASE_URL,
    sessionTokenHmacSecret: env.SESSION_TOKEN_HMAC_SECRET,
    /** API Key to this service */
    internalApiKey: env.INTERNAL_API_KEY,
    /** Port, hostname */
    server: {
        port: env.PORT,
        host: env.HOSTNAME,
    },
};
