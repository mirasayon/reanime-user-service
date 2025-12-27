import { strictObject, type z as Z } from "zod";
import { zodRequiredSchemaBase } from "./zod-required-schema-base.js";

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
export const accountSectionSchemas = {
    explore_me: zodRequiredSchemaBase.void,
    set_email: zodRequiredSchemaBase.email,
    update_email: strictObject({
        new_email: zodRequiredSchemaBase.email,
        current_email: zodRequiredSchemaBase.email,
    }),
    update_password: strictObject({
        new_password: zodRequiredSchemaBase.account_password,
        repeat_new_password: zodRequiredSchemaBase.account_password,
        current_password: zodRequiredSchemaBase.account_password,
    }),
    update_username: zodRequiredSchemaBase.accountUsernameValidatorSchema,
    get_sessions: zodRequiredSchemaBase.void,
    terminate_other_sessions: zodRequiredSchemaBase.void,
    terminate_specific_session: zodRequiredSchemaBase.cuid("Айди сессии"),
    delete_account: zodRequiredSchemaBase.void,
};
/** Request Validator DTO Types */
export namespace AccountSectionReqDtos {
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
    get_all_users: zodRequiredSchemaBase.void,
};

/** Request Validator DTO Types */
export namespace AdministratorSectionReqDtos {
    export type get_all_users = Z.infer<(typeof administratorSectionValidatorSchemas)["get_all_users"]>;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

export const authenticationSectionSchemas = {
    logout: zodRequiredSchemaBase.void,
    registration: strictObject({
        nickname: zodRequiredSchemaBase.profileNickname,
        username: zodRequiredSchemaBase.accountUsernameValidatorSchema,
        ip: zodRequiredSchemaBase.ipAddress,
        email: zodRequiredSchemaBase.email.optional(),
        agent: zodRequiredSchemaBase.userAgent,
        password: zodRequiredSchemaBase.account_password,
        password_repeat: zodRequiredSchemaBase.account_password,
    }),

    /** Check the current session */
    check_session: zodRequiredSchemaBase.void,
    login_by_username: strictObject({
        username: zodRequiredSchemaBase.accountUsernameValidatorSchema,
        ip: zodRequiredSchemaBase.ipAddress,
        agent: zodRequiredSchemaBase.userAgent,
        password: zodRequiredSchemaBase.account_password,
    }),
    /** For checking username for availability */
    check_username_availability: zodRequiredSchemaBase.accountUsernameValidatorSchema,

    login_by_email: strictObject({
        email: zodRequiredSchemaBase.email,
        ip: zodRequiredSchemaBase.ipAddress,
        agent: zodRequiredSchemaBase.userAgent,
        password: zodRequiredSchemaBase.account_password,
    }),
};

/** Request Validator DTO Types */
export namespace AuthenticationSectionReqDtos {
    export type logout = Z.infer<(typeof authenticationSectionSchemas)["logout"]>;
    export type registration = Z.infer<(typeof authenticationSectionSchemas)["registration"]>;
    export type check_session = Z.infer<(typeof authenticationSectionSchemas)["check_session"]>;
    export type login_by_email = Z.infer<(typeof authenticationSectionSchemas)["login_by_email"]>;
    export type login_by_username = Z.infer<(typeof authenticationSectionSchemas)["login_by_username"]>;

    export type check_username_availability = Z.infer<(typeof authenticationSectionSchemas)["check_username_availability"]>;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

export const replyForCommentSectionZodSchemas = {
    get_1_reply_by_its_id: zodRequiredSchemaBase.reply_id,

    get_replies_by_comment_id: strictObject({
        page: zodRequiredSchemaBase.pageNumber,
        limit: zodRequiredSchemaBase.pageSize,
        comment_id: zodRequiredSchemaBase.comment_id,
    }),
    create_reply: strictObject({
        comment_id: zodRequiredSchemaBase.comment_id,
        content: zodRequiredSchemaBase.message("Ответ на комментарий"),
    }),

    update_reply: strictObject({
        content: zodRequiredSchemaBase.message("Новый ответ"),
        reply_id: zodRequiredSchemaBase.reply_id,
    }),
    delete_reply: zodRequiredSchemaBase.reply_id,

    report_reply: strictObject({
        reply_id: zodRequiredSchemaBase.reply_id,
        details: zodRequiredSchemaBase.details,
        type: zodRequiredSchemaBase.report_type,
    }),

    add_like: zodRequiredSchemaBase.reply_id,

    add_dislike: zodRequiredSchemaBase.reply_id,

    delete_like: zodRequiredSchemaBase.reply_id,

    delete_dislike: zodRequiredSchemaBase.reply_id,
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
        anime_id: zodRequiredSchemaBase.animeId,
        content: zodRequiredSchemaBase.message("Комментарий"),
    }),
    get_all_for_anime: strictObject({
        page: zodRequiredSchemaBase.pageNumber,
        limit: zodRequiredSchemaBase.pageSize,
        anime_id: zodRequiredSchemaBase.animeId,
    }),
    /** new 2025.11.15 */
    all_my_comments: strictObject({
        page: zodRequiredSchemaBase.pageNumber,
        limit: zodRequiredSchemaBase.pageSize,
    }),
    /** new 2025.11.15 */
    all_for_public_profile: strictObject({
        page: zodRequiredSchemaBase.pageNumber,
        username: zodRequiredSchemaBase.accountUsernameValidatorSchema,
        limit: zodRequiredSchemaBase.pageSize,
    }),

    update: strictObject({
        new_content: zodRequiredSchemaBase.message("Новый комментарий"),
        comment_id: zodRequiredSchemaBase.comment_id,
    }),

    delete_comment: zodRequiredSchemaBase.comment_id,

    report: strictObject({
        comment_id: zodRequiredSchemaBase.comment_id,
        details: zodRequiredSchemaBase.details,
        type: zodRequiredSchemaBase.report_type,
    }),
    /** modified 2025.11.24  */
    add_like: zodRequiredSchemaBase.comment_id,
    add_dislike: zodRequiredSchemaBase.comment_id,

    delete_like: zodRequiredSchemaBase.comment_id,
    delete_dislike: zodRequiredSchemaBase.comment_id,
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

export const voteToAnimeSectionSchemas = {
    explore_likes: zodRequiredSchemaBase.void,
    explore_dislikes: zodRequiredSchemaBase.void,
    view_vote_on_anime: zodRequiredSchemaBase.animeId,
    add_like_to_anime: zodRequiredSchemaBase.animeId,
    delete_like_from_anime: zodRequiredSchemaBase.animeId,
    add_dislike_to_anime: zodRequiredSchemaBase.animeId,
    delete_dislike_from_anime: zodRequiredSchemaBase.animeId,
};
/** Request Validator DTO Types */
export namespace VoteToAnimeSectionRequestDtoType {
    export type explore_likes = Z.infer<(typeof voteToAnimeSectionSchemas)["explore_likes"]>;
    export type explore_dislikes = Z.infer<(typeof voteToAnimeSectionSchemas)["explore_dislikes"]>;
    export type view_vote_on_anime = Z.infer<(typeof voteToAnimeSectionSchemas)["view_vote_on_anime"]>;
    export type add_like_to_anime = Z.infer<(typeof voteToAnimeSectionSchemas)["add_like_to_anime"]>;
    export type delete_like_from_anime = Z.infer<(typeof voteToAnimeSectionSchemas)["delete_like_from_anime"]>;
    export type add_dislike_to_anime = Z.infer<(typeof voteToAnimeSectionSchemas)["add_dislike_to_anime"]>;
    export type delete_dislike_from_anime = Z.infer<(typeof voteToAnimeSectionSchemas)["delete_dislike_from_anime"]>;
}

// ----------------------------------------------------------------------------------------------------------------------------------------------
export const animeMarkedCollection_schemas = {
    get_all_list: zodRequiredSchemaBase.void,
    explore_for_anime: zodRequiredSchemaBase.animeId,
    get_list_of_completed: zodRequiredSchemaBase.void,
    get_list_of_planned: zodRequiredSchemaBase.void,
    get_list_of_abandoned: zodRequiredSchemaBase.void,
    get_list_of_watching: zodRequiredSchemaBase.void,

    create_completed: zodRequiredSchemaBase.animeId,
    create_planned: zodRequiredSchemaBase.animeId,
    create_abandoned: zodRequiredSchemaBase.animeId,
    create_watching: zodRequiredSchemaBase.animeId,

    delete_completed: zodRequiredSchemaBase.animeId,
    delete_planned: zodRequiredSchemaBase.animeId,
    delete_abandoned: zodRequiredSchemaBase.animeId,
    delete_watching: zodRequiredSchemaBase.animeId,
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
    avatar_view: zodRequiredSchemaBase.accountUsernameValidatorSchema,
    set_avatar: zodRequiredSchemaBase.void,
    update_avatar: zodRequiredSchemaBase.void,
    delete_avatar: zodRequiredSchemaBase.void,
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
    other_profiles: zodRequiredSchemaBase.accountUsernameValidatorSchema,
    my_profile: zodRequiredSchemaBase.void,
    update_bio: zodRequiredSchemaBase.message("О себе"),
    update_name: zodRequiredSchemaBase.profileNickname,
};

/** Request Validator DTO Types */
export namespace profileRouteValidatorDtos {
    export type other_profiles = Z.infer<(typeof profileRouteValidatorSchemas)["other_profiles"]>;
    export type my_profile = Z.infer<(typeof profileRouteValidatorSchemas)["my_profile"]>;
    export type update_bio = Z.infer<(typeof profileRouteValidatorSchemas)["update_bio"]>;
    export type update_name = Z.infer<(typeof profileRouteValidatorSchemas)["update_name"]>;
}
