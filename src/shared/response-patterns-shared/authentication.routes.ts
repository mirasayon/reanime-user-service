import type { LoginSession, ProfileAvatarPicture, UserAccount, UserProfile } from "../../databases/orm/client.js";

/** Типы ответов для маршрута аутентификации */
export namespace ResponseTypesForAuthentication {
    /** Токен сессии */
    export type login_via_email = string;
    /** Токен сессии */
    export type login_via_username = string;
    /** Токен сессии */
    export type registration = string;
    /** `false`- если используется имя пользователя, `true`- если доступно */
    export type check_username_availability = boolean;
    export type check_session = {
        username: string;
        nickname: string | null;
        email: string | null;
        avatar_url: string | null;
        selector: string;
    };
    /** `true` - если успех, `false` = если ошибка */
    export type logout = boolean;
}
