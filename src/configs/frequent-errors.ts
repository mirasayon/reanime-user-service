import { BadRequestException } from "#/errors/client-side-exceptions.js";

export const vote_not_found = "Лайк или дизлайк не найден" as const;
export const profile_has_already_liked_anime = "Лайк уже оставлен на это аниме";
export const profile_has_already_disliked_anime = "Дизлайк уже оставлен на это аниме";
export const cannot_delete_like_if_there_is_dislike = "Вы дизлайкнули аниме, но пытаетесь удалить лайк которого нет" as const;
export const cannot_delete_dislike_if_there_is_like = "Вы лайкнули аниме, но пытаетесь удалить дизлайк которого нет" as const;

// Error message when session's meta doesn't match the current request
export const auth_ip_and_agent_do_not_match = "IP-адрес клиента и/или User-Agent не соответствуют с сохранённым в сеансе" as const;

export const email_is_used = "Эта почта уже используется другим аккаунтом" as const;

export const noImage_error_response = new BadRequestException(["Файл не загружен. Пожалуйста, загрузите изображение"]);

export const searchQueriesAreOutOfRange = "Параметры запроса переполнены больше, чем необходимо.";

export const usernameNotFound = "Аккаунт с таким юзернеймом не найден";
