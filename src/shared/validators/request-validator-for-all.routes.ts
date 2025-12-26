import { profileNicknameValidatorSchema } from "./nickname-validator-schema.js";

import { accountUsernameZodSchema } from "./username-validator-schema.js";
import { strictObject, type z as Z } from "zod";
import { zodUtilSchemas } from "./util-validators-for-requests.js";

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
export const accountSectionSchemas = {
    explore_me: zodUtilSchemas.void,
    set_email: zodUtilSchemas.email,
    update_email: strictObject({
        new_email: zodUtilSchemas.email,
        current_email: zodUtilSchemas.email,
    }),
    update_password: strictObject({
        new_password: zodUtilSchemas.account_password,
        repeat_new_password: zodUtilSchemas.account_password,
        current_password: zodUtilSchemas.account_password,
    }),
    update_username: accountUsernameZodSchema,
    get_sessions: zodUtilSchemas.void,
    terminate_other_sessions: zodUtilSchemas.void,
    terminate_specific_session: zodUtilSchemas.cuid("Айди сессии"),
    delete_account: zodUtilSchemas.void,
};
/** Request Validator DTO Types */
export namespace accountSectionReqDtos {
    export type explore_me = Z.infer<(typeof accountSectionSchemas)["explore_me"]>;
    export type update_email = Z.infer<(typeof accountSectionSchemas)["update_email"]>;
    export type set_email = Z.infer<(typeof accountSectionSchemas)["set_email"]>;
    export type update_password = Z.infer<(typeof accountSectionSchemas)["update_password"]>;
    export type update_username = Z.infer<(typeof accountSectionSchemas)["update_username"]>;
    export type get_sessions = Z.infer<(typeof accountSectionSchemas)["get_sessions"]>;
    export type terminate_other_sessions = Z.infer<(typeof accountSectionSchemas)["terminate_other_sessions"]>;
    export type terminate_specific_session = Z.infer<(typeof accountSectionSchemas)["terminate_specific_session"]>;
    export type delete_account = Z.infer<(typeof accountSectionSchemas)["delete_account"]>;
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
export const administratorSectionValidatorSchemas = {
    get_all_users: zodUtilSchemas.void,
};

/** Request Validator DTO Types */
export namespace AdminSectionReqDtos {
    export type get_all_users = Z.infer<(typeof administratorSectionValidatorSchemas)["get_all_users"]>;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

export const authenticationSectionSchemas = {
    logout: zodUtilSchemas.void,
    registration: strictObject({
        nickname: profileNicknameValidatorSchema,
        username: accountUsernameZodSchema,
        ip: zodUtilSchemas.ip_address,
        email: zodUtilSchemas.email.optional(),
        agent: zodUtilSchemas.user_agent,
        password: zodUtilSchemas.account_password,
        password_repeat: zodUtilSchemas.account_password,
    }),

    /** Check the current session */
    check_session: zodUtilSchemas.void,
    login_by_username: strictObject({
        username: accountUsernameZodSchema,
        ip: zodUtilSchemas.ip_address,
        agent: zodUtilSchemas.user_agent,
        password: zodUtilSchemas.account_password,
    }),
    /** For checking username for availability */
    check_username_availability: accountUsernameZodSchema,

    login_by_email: strictObject({
        email: zodUtilSchemas.email,
        ip: zodUtilSchemas.ip_address,
        agent: zodUtilSchemas.user_agent,
        password: zodUtilSchemas.account_password,
    }),
};

/** Request Validator DTO Types */
export namespace AuthSectionReqDtos {
    export type logout = Z.infer<(typeof authenticationSectionSchemas)["logout"]>;
    export type registration = Z.infer<(typeof authenticationSectionSchemas)["registration"]>;
    export type check_session = Z.infer<(typeof authenticationSectionSchemas)["check_session"]>;
    export type login_by_email = Z.infer<(typeof authenticationSectionSchemas)["login_by_email"]>;
    export type login_by_username = Z.infer<(typeof authenticationSectionSchemas)["login_by_username"]>;

    export type check_username_availability = Z.infer<(typeof authenticationSectionSchemas)["check_username_availability"]>;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

export const replyForCommentSectionZodSchemas = {
    get_1_reply_by_its_id: zodUtilSchemas.reply_id,

    get_replies_by_comment_id: strictObject({
        page: zodUtilSchemas.page_number,
        limit: zodUtilSchemas.page_size,
        comment_id: zodUtilSchemas.comment_id,
    }),
    create_reply: strictObject({
        comment_id: zodUtilSchemas.comment_id,
        content: zodUtilSchemas.message("Ответ на комментарий"),
    }),

    update_reply: strictObject({
        content: zodUtilSchemas.message("Новый ответ"),
        reply_id: zodUtilSchemas.reply_id,
    }),
    delete_reply: zodUtilSchemas.reply_id,

    report_reply: strictObject({
        reply_id: zodUtilSchemas.reply_id,
        details: zodUtilSchemas.details,
        type: zodUtilSchemas.report_type,
    }),

    add_like: zodUtilSchemas.reply_id,

    add_dislike: zodUtilSchemas.reply_id,

    delete_like: zodUtilSchemas.reply_id,

    delete_dislike: zodUtilSchemas.reply_id,
};

/** Request Validator DTO Types */
export namespace ReplyForCommentReqDtos {
    export type get_1_reply_by_its_id = Z.infer<(typeof replyForCommentSectionZodSchemas)["get_1_reply_by_its_id"]>;
    export type get_replies_by_comment_id = Z.infer<(typeof replyForCommentSectionZodSchemas)["get_replies_by_comment_id"]>;
    export type create_reply = Z.infer<(typeof replyForCommentSectionZodSchemas)["create_reply"]>;
    export type update_reply = Z.infer<(typeof replyForCommentSectionZodSchemas)["update_reply"]>;
    export type delete_reply = Z.infer<(typeof replyForCommentSectionZodSchemas)["delete_reply"]>;
    export type report_reply = Z.infer<(typeof replyForCommentSectionZodSchemas)["report_reply"]>;
    export type add_like = Z.infer<(typeof replyForCommentSectionZodSchemas)["add_like"]>;
    export type add_dislike = Z.infer<(typeof replyForCommentSectionZodSchemas)["add_dislike"]>;
    export type delete_like = Z.infer<(typeof replyForCommentSectionZodSchemas)["delete_like"]>;
    export type delete_dislike = Z.infer<(typeof replyForCommentSectionZodSchemas)["delete_dislike"]>;
}

//---------------------------------------------------------------------------------------------------------------------------------

export const commentToAnimeSectionValidatorSchemas = {
    create: strictObject({
        anime_id: zodUtilSchemas.anime_id,
        content: zodUtilSchemas.message("Комментарий"),
    }),
    get_all_for_anime: strictObject({
        page: zodUtilSchemas.page_number,
        limit: zodUtilSchemas.page_size,
        anime_id: zodUtilSchemas.anime_id,
    }),
    /** new 2025.11.15 */
    all_my_comments: strictObject({
        page: zodUtilSchemas.page_number,
        limit: zodUtilSchemas.page_size,
    }),
    /** new 2025.11.15 */
    all_for_public_profile: strictObject({
        page: zodUtilSchemas.page_number,
        username: accountUsernameZodSchema,
        limit: zodUtilSchemas.page_size,
    }),

    update: strictObject({
        new_content: zodUtilSchemas.message("Новый комментарий"),
        comment_id: zodUtilSchemas.comment_id,
    }),

    delete_comment: zodUtilSchemas.comment_id,

    report: strictObject({
        comment_id: zodUtilSchemas.comment_id,
        details: zodUtilSchemas.details,
        type: zodUtilSchemas.report_type,
    }),
    /** modified 2025.11.24  */
    add_like: zodUtilSchemas.comment_id,
    add_dislike: zodUtilSchemas.comment_id,

    delete_like: zodUtilSchemas.comment_id,
    delete_dislike: zodUtilSchemas.comment_id,
};
/** Request Validator DTO Types */
export namespace CommentToAnimeSectionReqDtos {
    export type create = Z.infer<(typeof commentToAnimeSectionValidatorSchemas)["create"]>;
    export type get_all_for_anime = Z.infer<(typeof commentToAnimeSectionValidatorSchemas)["get_all_for_anime"]>;
    export type update = Z.infer<(typeof commentToAnimeSectionValidatorSchemas)["update"]>;
    export type delete_comment = Z.infer<(typeof commentToAnimeSectionValidatorSchemas)["delete_comment"]>;
    export type report = Z.infer<(typeof commentToAnimeSectionValidatorSchemas)["report"]>;
    export type all_my_comments = Z.infer<(typeof commentToAnimeSectionValidatorSchemas)["all_my_comments"]>;
    export type all_for_public_profile = Z.infer<(typeof commentToAnimeSectionValidatorSchemas)["all_for_public_profile"]>;

    export type add_like = Z.infer<(typeof commentToAnimeSectionValidatorSchemas)["add_like"]>;
    export type add_dislike = Z.infer<(typeof commentToAnimeSectionValidatorSchemas)["add_dislike"]>;
    export type delete_like = Z.infer<(typeof commentToAnimeSectionValidatorSchemas)["delete_like"]>;
    export type delete_dislike = Z.infer<(typeof commentToAnimeSectionValidatorSchemas)["delete_dislike"]>;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const favoriteAnimes_schemas = {
    explore_likes: zodUtilSchemas.void,
    explore_dislikes: zodUtilSchemas.void,
    view_vote_on_anime: zodUtilSchemas.anime_id,
    add_like_to_anime: zodUtilSchemas.anime_id,
    delete_like_from_anime: zodUtilSchemas.anime_id,
    add_dislike_to_anime: zodUtilSchemas.anime_id,
    delete_dislike_from_anime: zodUtilSchemas.anime_id,
};
/** Request Validator DTO Types */
export namespace FavoriteAnimeReqDtoTypes {
    export type explore_likes = Z.infer<(typeof favoriteAnimes_schemas)["explore_likes"]>;
    export type explore_dislikes = Z.infer<(typeof favoriteAnimes_schemas)["explore_dislikes"]>;
    export type view_vote_on_anime = Z.infer<(typeof favoriteAnimes_schemas)["view_vote_on_anime"]>;
    export type add_like_to_anime = Z.infer<(typeof favoriteAnimes_schemas)["add_like_to_anime"]>;
    export type delete_like_from_anime = Z.infer<(typeof favoriteAnimes_schemas)["delete_like_from_anime"]>;
    export type add_dislike_to_anime = Z.infer<(typeof favoriteAnimes_schemas)["add_dislike_to_anime"]>;
    export type delete_dislike_from_anime = Z.infer<(typeof favoriteAnimes_schemas)["delete_dislike_from_anime"]>;
}

// ----------------------------------------------------------------------------------------------------------------------------------------------
export const animeMarkedCollection_schemas = {
    get_all_list: zodUtilSchemas.void,
    explore_for_anime: zodUtilSchemas.anime_id,
    get_list_of_completed: zodUtilSchemas.void,
    get_list_of_planned: zodUtilSchemas.void,
    get_list_of_abandoned: zodUtilSchemas.void,
    get_list_of_watching: zodUtilSchemas.void,

    create_completed: zodUtilSchemas.anime_id,
    create_planned: zodUtilSchemas.anime_id,
    create_abandoned: zodUtilSchemas.anime_id,
    create_watching: zodUtilSchemas.anime_id,

    delete_completed: zodUtilSchemas.anime_id,
    delete_planned: zodUtilSchemas.anime_id,
    delete_abandoned: zodUtilSchemas.anime_id,
    delete_watching: zodUtilSchemas.anime_id,
};

/** Request Validator DTO Types */
export namespace MarkedAnimeCollectionReqDtoTypes {
    export type get_all_list = Z.infer<(typeof animeMarkedCollection_schemas)["get_all_list"]>;
    export type explore_for_anime = Z.infer<(typeof animeMarkedCollection_schemas)["explore_for_anime"]>;
    export type get_list_of_completed = Z.infer<(typeof animeMarkedCollection_schemas)["get_list_of_completed"]>;
    export type get_list_of_planned = Z.infer<(typeof animeMarkedCollection_schemas)["get_list_of_planned"]>;
    export type get_list_of_abandoned = Z.infer<(typeof animeMarkedCollection_schemas)["get_list_of_abandoned"]>;
    export type get_list_of_watching = Z.infer<(typeof animeMarkedCollection_schemas)["get_list_of_watching"]>;
    export type create_completed = Z.infer<(typeof animeMarkedCollection_schemas)["create_completed"]>;
    export type create_planned = Z.infer<(typeof animeMarkedCollection_schemas)["create_planned"]>;
    export type create_abandoned = Z.infer<(typeof animeMarkedCollection_schemas)["create_abandoned"]>;
    export type create_watching = Z.infer<(typeof animeMarkedCollection_schemas)["create_watching"]>;
    export type delete_completed = Z.infer<(typeof animeMarkedCollection_schemas)["delete_completed"]>;
    export type delete_planned = Z.infer<(typeof animeMarkedCollection_schemas)["delete_planned"]>;
    export type delete_abandoned = Z.infer<(typeof animeMarkedCollection_schemas)["delete_abandoned"]>;
    export type delete_watching = Z.infer<(typeof animeMarkedCollection_schemas)["delete_watching"]>;
}

//--------------------------------------------------------------------------------------------------------------------------------------

export const mediaRouteValidatorSchemas = {
    avatar_view: accountUsernameZodSchema,
    set_avatar: zodUtilSchemas.void,
    update_avatar: zodUtilSchemas.void,
    delete_avatar: zodUtilSchemas.void,
};

/** Request Validator DTO Types */
export namespace mediaRouteValidatorDtos {
    export type avatar_view = Z.infer<(typeof mediaRouteValidatorSchemas)["avatar_view"]>;
    export type set_avatar = Z.infer<(typeof mediaRouteValidatorSchemas)["set_avatar"]>;
    export type update_avatar = Z.infer<(typeof mediaRouteValidatorSchemas)["update_avatar"]>;
    export type delete_avatar = Z.infer<(typeof mediaRouteValidatorSchemas)["delete_avatar"]>;
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------
export const profileRouteValidatorSchemas = {
    /** View other profiles, no auth needed */
    other_profiles: accountUsernameZodSchema,
    my_profile: zodUtilSchemas.void,
    update_bio: zodUtilSchemas.message("О себе"),
    update_name: profileNicknameValidatorSchema,
};

/** Request Validator DTO Types */
export namespace profileRouteValidatorDtos {
    export type other_profiles = Z.infer<(typeof profileRouteValidatorSchemas)["other_profiles"]>;
    export type my_profile = Z.infer<(typeof profileRouteValidatorSchemas)["my_profile"]>;
    export type update_bio = Z.infer<(typeof profileRouteValidatorSchemas)["update_bio"]>;
    export type update_name = Z.infer<(typeof profileRouteValidatorSchemas)["update_name"]>;
}
