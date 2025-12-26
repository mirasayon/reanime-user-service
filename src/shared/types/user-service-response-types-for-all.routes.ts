/** Response types for account section */
export namespace ResponseTypesFor_Account_Section {
    export type explore_me = {
        email: string | null;
        username: string;
        created_at: Date;
        account_type: "COMMON" | "BANNED" | "ADMIN" | "DEVELOPER" | "TESTER";
    };
    export type update_email = boolean;
    export type set_email = boolean;
    export type update_password = boolean;
    export type update_username = boolean;
    export type get_sessions = {
        created_at: Date;
        expires_at: Date;
        last_used_at: Date;
        ip_address: string;
        ip_country: string | null;
        ip_region: string | null;
        ip_city: string | null;
        device_type: string | null;
        device_model: string | null;
        os: string | null;
        os_version: string | null;
        browser: string | null;
        browser_version: string | null;
    }[];
    export type delete_all_other_sessions = number;
    export type terminate_specific_session = boolean;
    export type delete_account = boolean;
}
/** Response types for administrator section */
export namespace ResponseTypesForAdministratorSection {
    export type get_all_users = {
        email: string | null;
        username: string;
        created_at: Date;
        updated_at: Date;
        account_type: "COMMON" | "BANNED" | "ADMIN" | "DEVELOPER" | "TESTER";
        bio: string | null;
        nickname: string | null;
        avatar: {
            path_dirname: string;
            path_filename: string;
        } | null;
    }[];
}

type AnimeBookmark = {
    created_at: Date;
    updated_at: Date;
    by_profile_id: string;
    external_anime_id: number;
    status: "WATCHING" | "ABANDONED" | "PLANNED" | "COMPLETED";
};
/** Типы ответов для маршрута коллекции аниме */
export namespace ResponseTypesFor_AnimeBookmark_Section {
    export type get_all_list = AnimeBookmark[];
    export type get_for_anime = AnimeBookmark;
    export type get_list_of_completed = AnimeBookmark[];
    export type get_list_of_planned = AnimeBookmark[];
    export type get_list_of_abandoned = AnimeBookmark[];
    export type get_list_of_watching = AnimeBookmark[];
    export type create_watching = boolean;
    export type create_planned = boolean;
    export type create_abandoned = boolean;
    export type create_completed = boolean;
    export type delete_abandoned = boolean;
    export type delete_watching = boolean;
    export type delete_planned = boolean;
    export type delete_completed = boolean;
}

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

/** Типы ответов для маршрута комментариев на аниме */
export namespace ResponseTypesFor_CommentForAnime_Section {
    export type get_all_for_anime = {
        ratings: number[];
        nickname: string | null;
        avatar: {
            path_dirname: string;
            path_filename: string;
        } | null;
        username: string;
        content: string;
        is_visible: boolean;
        external_anime_id: number;
    }[];
    export type create_comment = boolean;
    export type update_comment = boolean;
    export type all_for_public_profile = {
        content: string;
        is_visible: boolean;
        external_anime_id: number;
    }[];
    export type all_my_comments = {
        content: string;
        is_visible: boolean;
        external_anime_id: number;
    }[];
    export type add_like = boolean;
    export type delete_like = boolean;
    export type add_dislike = boolean;
    export type delete_dislike = boolean;
    export type delete_comment = boolean;
}

/** Response types for media section */
export namespace ResponseTypesFor_Media_Section {
    export type set_avatar = boolean;
    export type delete_avatar = boolean;
    export type update_avatar = boolean;
}

export namespace ResponseTypesFor_Ping_Section {
    export type get = "pong";
}

type ReplyForComment = {
    created_at: Date;
    updated_at: Date;
    content: string;
    by_profile_id: string;
    is_visible: boolean;
    to_comment_id: string;
};
/** Типы ответов для маршрута ответа на комментарий */
export namespace ResponseTypesFor_ReplyToComment_Section {
    export type edit_reply = boolean;
    export type get_1_reply_by_its_id = ReplyForComment;
    export type get_replies_by_comment_id = ReplyForComment[];
    export type add_like = boolean;
    export type add_dislike = boolean;
    export type delete_like = boolean;
    export type delete_dislike = boolean;
    export type report = boolean;
    /** `true` - если успех, `false` = если ошибка */
    export type create_reply = boolean;
    /** `true` - если успех, `false` = если ошибка */
    export type delete_reply = boolean;
}
/** Типы ответов для маршрута профиля */
export namespace ResponseTypesFor_UserProfile_Section {
    export type view_other_profiles = {
        email: string | null;
        username: string;
        created_at: Date;
        bio: string | null;
        nickname: string | null;
        date_of_birth: Date | null | number;
        gender: "MALE" | "FEMALE" | "OTHER" | "UNSPECIFIED";
        other_gender: string | null;
        avatar: {
            path_dirname: string;
            path_filename: string;
        } | null;
    };
    export type update_nickname = boolean;
    export type update_bio = boolean;
    export type view_my_profile = {
        account_type: "COMMON" | "BANNED" | "ADMIN" | "DEVELOPER" | "TESTER";
        email: string | null;
        username: string;
        bio: string | null;
        nickname: string | null;
    };
}
type VoteToAnime = {
    created_at: Date;
    external_anime_id: number;
    value: number;
};
// }
/** Типы ответов для маршрута лайков/дизлайков на аниме */
export namespace ResponseTypesFor_VoteToAnime_Section {
    export type explore_likes = VoteToAnime[];
    export type explore_dislikes = VoteToAnime[];
    export type view_vote_on_anime = VoteToAnime | null;
    export type add_like_to_anime = boolean;
    export type delete_like_from_anime = boolean;
    export type add_dislike_to_anime = boolean;
    export type delete_dislike_from_anime = boolean;
}
