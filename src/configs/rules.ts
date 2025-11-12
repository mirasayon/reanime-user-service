import { EnvConfig } from "./environment-variables.js";
/**
 * Same time session limit
 */
export const SAME_TIME_SESSIONS_LIMIT = 10;

/** minutes, how often profile can update profile */
export const REQUESTS_TO_MEDIA_SERVICE_INTERVAL_IN_MINUTES = EnvConfig.is_prod ? 5 : 0;

export const REPLIES_LIMIT_TO_ONE_COMMENT = 5 as const;

export const MAX_COMMENT_ON_ANIME_LIMIT = 5;
