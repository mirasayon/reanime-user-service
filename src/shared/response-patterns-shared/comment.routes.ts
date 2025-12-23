import type { CommentForAnime, ProfileAvatarPicture, UserProfile, VoteToComment } from "../../databases/orm/client.js";

/** Типы ответов для маршрута комментариев на аниме */
export namespace ResponseTypesForComment {
    export type create_comment = boolean;
    export type update_comment = boolean;
    export type get_all_for_anime = (CommentForAnime & {
        ratings: VoteToComment[];
        by_profile: UserProfile & {
            avatar: ProfileAvatarPicture | null;
            by_account: {
                username: string;
            };
        };
    })[];
    export type all_for_public_profile = CommentForAnime[];
    export type all_my_comments = CommentForAnime[];
    export type add_like = boolean;
    export type delete_like = boolean;
    export type add_dislike = boolean;
    export type delete_dislike = boolean;
    export type delete_comment = boolean;
}
