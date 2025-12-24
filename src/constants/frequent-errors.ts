import { SAME_TIME_SESSIONS_LIMIT } from "#/configs/application-rules-config.js";
import { BadRequestException } from "#/errors/client-side-exceptions.js";

export const voteNotFoundErrorMessage = "Лайк или дизлайк не найден" as const;
export const profileHasAlreadyLikeAnimeErrorMessage = "Лайк уже оставлен на это аниме";
export const profile_has_already_disliked_animeErrorMessage = "Дизлайк уже оставлен на это аниме";
export const cannot_delete_like_if_there_is_dislikeErrorMessage = "Вы дизлайкнули аниме, но пытаетесь удалить лайк которого нет" as const;
export const cannot_delete_dislike_if_there_is_likeErrorMessage = "Вы лайкнули аниме, но пытаетесь удалить дизлайк которого нет" as const;

// Error message when session's meta doesn't match the current request
export const sessionMetaDoNotMatchErrorMessage = "IP-адрес клиента и/или User-Agent не соответствуют с сохранённым в сеансе" as const;

export const emailIsUsedErrorMessage = "Эта почта уже используется другим аккаунтом" as const;

export const noImage_error_responseErrorObj = new BadRequestException(["Файл не загружен. Пожалуйста, загрузите изображение"]);

export const searchQueriesAreOutOfRangeErrorMessage = "Параметры запроса переполнены больше, чем необходимо.";

export const usernameNotFoundErrorMessage = "Аккаунт с таким юзернеймом не найден";
export const maxSessionsLimitReachedErrorMessage = `Пользователь не должен иметь более ${SAME_TIME_SESSIONS_LIMIT} активных сессий одновременно. Пожалуйста, выйдите с других сессий и попробуйте еще раз.`;
export const invalidCredentialsErrorMessage = "Неправильный пароль, юзернейм или почта";

export const invalidSessionTokenErrorMessage = "Неправильный токен сеанса или токен сеанса отсутствует";
