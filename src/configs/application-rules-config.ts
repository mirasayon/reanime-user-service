import { envMainConfig } from "./environment-variables-config.js";
/** Ограничение на количество сеансов одновременно */
export const SAME_TIME_SESSIONS_LIMIT = 10 as const;
/** минут, как часто можно обновлять профиль */
export const REQUESTS_TO_MEDIA_SERVICE_INTERVAL_IN_MINUTES = envMainConfig.is_prod ? 5 : 0;

export const REPLIES_LIMIT_TO_ONE_COMMENT = 5 as const;

export const MAX_COMMENT_ON_ANIME_LIMIT = 5 as const;
export const maxAvatarPayloadInMB = 5 as const;
export const PAYLOAD_MAX_SIZE = maxAvatarPayloadInMB * 1_024 * 1_024;
