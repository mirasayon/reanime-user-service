import { profileNicknameValidatorSchema } from "./profile_name.schema.js";
import { zodUtilSchemas } from "./common-validator-utils.js";
import { accountUsernameZodSchema } from "./username.validator.js";
import { strictObject, type z } from "zod";
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
    export type explore_me = z.infer<(typeof accountSectionSchemas)["explore_me"]>;
    export type update_email = z.infer<(typeof accountSectionSchemas)["update_email"]>;
    export type set_email = z.infer<(typeof accountSectionSchemas)["set_email"]>;
    export type update_password = z.infer<(typeof accountSectionSchemas)["update_password"]>;
    export type update_username = z.infer<(typeof accountSectionSchemas)["update_username"]>;
    export type get_sessions = z.infer<(typeof accountSectionSchemas)["get_sessions"]>;
    export type terminate_other_sessions = z.infer<(typeof accountSectionSchemas)["terminate_other_sessions"]>;
    export type terminate_specific_session = z.infer<(typeof accountSectionSchemas)["terminate_specific_session"]>;
    export type delete_account = z.infer<(typeof accountSectionSchemas)["delete_account"]>;
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
export const administratorSectionValidatorSchemas = {
    get_all_users: zodUtilSchemas.void,
};

/** Request Validator DTO Types */
export namespace AdminSectionReqDtos {
    export type get_all_users = z.infer<(typeof administratorSectionValidatorSchemas)["get_all_users"]>;
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
    export type logout = z.infer<(typeof authenticationSectionSchemas)["logout"]>;
    export type registration = z.infer<(typeof authenticationSectionSchemas)["registration"]>;
    export type check_session = z.infer<(typeof authenticationSectionSchemas)["check_session"]>;
    export type login_by_email = z.infer<(typeof authenticationSectionSchemas)["login_by_email"]>;
    export type login_by_username = z.infer<(typeof authenticationSectionSchemas)["login_by_username"]>;

    export type check_username_availability = z.infer<(typeof authenticationSectionSchemas)["check_username_availability"]>;
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
    export type get_1_reply_by_its_id = z.infer<(typeof replyForCommentSectionZodSchemas)["get_1_reply_by_its_id"]>;
    export type get_replies_by_comment_id = z.infer<(typeof replyForCommentSectionZodSchemas)["get_replies_by_comment_id"]>;
    export type create_reply = z.infer<(typeof replyForCommentSectionZodSchemas)["create_reply"]>;
    export type update_reply = z.infer<(typeof replyForCommentSectionZodSchemas)["update_reply"]>;
    export type delete_reply = z.infer<(typeof replyForCommentSectionZodSchemas)["delete_reply"]>;
    export type report_reply = z.infer<(typeof replyForCommentSectionZodSchemas)["report_reply"]>;
    export type add_like = z.infer<(typeof replyForCommentSectionZodSchemas)["add_like"]>;
    export type add_dislike = z.infer<(typeof replyForCommentSectionZodSchemas)["add_dislike"]>;
    export type delete_like = z.infer<(typeof replyForCommentSectionZodSchemas)["delete_like"]>;
    export type delete_dislike = z.infer<(typeof replyForCommentSectionZodSchemas)["delete_dislike"]>;
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
    export type create = z.infer<(typeof commentToAnimeSectionValidatorSchemas)["create"]>;
    export type get_all_for_anime = z.infer<(typeof commentToAnimeSectionValidatorSchemas)["get_all_for_anime"]>;
    export type update = z.infer<(typeof commentToAnimeSectionValidatorSchemas)["update"]>;
    export type delete_comment = z.infer<(typeof commentToAnimeSectionValidatorSchemas)["delete_comment"]>;
    export type report = z.infer<(typeof commentToAnimeSectionValidatorSchemas)["report"]>;
    export type all_my_comments = z.infer<(typeof commentToAnimeSectionValidatorSchemas)["all_my_comments"]>;
    export type all_for_public_profile = z.infer<(typeof commentToAnimeSectionValidatorSchemas)["all_for_public_profile"]>;

    export type add_like = z.infer<(typeof commentToAnimeSectionValidatorSchemas)["add_like"]>;
    export type add_dislike = z.infer<(typeof commentToAnimeSectionValidatorSchemas)["add_dislike"]>;
    export type delete_like = z.infer<(typeof commentToAnimeSectionValidatorSchemas)["delete_like"]>;
    export type delete_dislike = z.infer<(typeof commentToAnimeSectionValidatorSchemas)["delete_dislike"]>;
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
    export type explore_likes = z.infer<(typeof favoriteAnimes_schemas)["explore_likes"]>;
    export type explore_dislikes = z.infer<(typeof favoriteAnimes_schemas)["explore_dislikes"]>;
    export type view_vote_on_anime = z.infer<(typeof favoriteAnimes_schemas)["view_vote_on_anime"]>;
    export type add_like_to_anime = z.infer<(typeof favoriteAnimes_schemas)["add_like_to_anime"]>;
    export type delete_like_from_anime = z.infer<(typeof favoriteAnimes_schemas)["delete_like_from_anime"]>;
    export type add_dislike_to_anime = z.infer<(typeof favoriteAnimes_schemas)["add_dislike_to_anime"]>;
    export type delete_dislike_from_anime = z.infer<(typeof favoriteAnimes_schemas)["delete_dislike_from_anime"]>;
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
    export type get_all_list = z.infer<(typeof animeMarkedCollection_schemas)["get_all_list"]>;
    export type explore_for_anime = z.infer<(typeof animeMarkedCollection_schemas)["explore_for_anime"]>;
    export type get_list_of_completed = z.infer<(typeof animeMarkedCollection_schemas)["get_list_of_completed"]>;
    export type get_list_of_planned = z.infer<(typeof animeMarkedCollection_schemas)["get_list_of_planned"]>;
    export type get_list_of_abandoned = z.infer<(typeof animeMarkedCollection_schemas)["get_list_of_abandoned"]>;
    export type get_list_of_watching = z.infer<(typeof animeMarkedCollection_schemas)["get_list_of_watching"]>;
    export type create_completed = z.infer<(typeof animeMarkedCollection_schemas)["create_completed"]>;
    export type create_planned = z.infer<(typeof animeMarkedCollection_schemas)["create_planned"]>;
    export type create_abandoned = z.infer<(typeof animeMarkedCollection_schemas)["create_abandoned"]>;
    export type create_watching = z.infer<(typeof animeMarkedCollection_schemas)["create_watching"]>;
    export type delete_completed = z.infer<(typeof animeMarkedCollection_schemas)["delete_completed"]>;
    export type delete_planned = z.infer<(typeof animeMarkedCollection_schemas)["delete_planned"]>;
    export type delete_abandoned = z.infer<(typeof animeMarkedCollection_schemas)["delete_abandoned"]>;
    export type delete_watching = z.infer<(typeof animeMarkedCollection_schemas)["delete_watching"]>;
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
    export type avatar_view = z.infer<(typeof mediaRouteValidatorSchemas)["avatar_view"]>;
    export type set_avatar = z.infer<(typeof mediaRouteValidatorSchemas)["set_avatar"]>;
    export type update_avatar = z.infer<(typeof mediaRouteValidatorSchemas)["update_avatar"]>;
    export type delete_avatar = z.infer<(typeof mediaRouteValidatorSchemas)["delete_avatar"]>;
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
    export type other_profiles = z.infer<(typeof profileRouteValidatorSchemas)["other_profiles"]>;
    export type my_profile = z.infer<(typeof profileRouteValidatorSchemas)["my_profile"]>;
    export type update_bio = z.infer<(typeof profileRouteValidatorSchemas)["update_bio"]>;
    export type update_name = z.infer<(typeof profileRouteValidatorSchemas)["update_name"]>;
}
