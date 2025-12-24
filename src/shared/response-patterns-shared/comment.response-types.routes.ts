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
