import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import { z } from "zod";

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
export namespace dto {
    export type explore_likes = z.infer<(typeof favoriteAnimes_schemas)["explore_likes"]>;
    export type explore_dislikes = z.infer<(typeof favoriteAnimes_schemas)["explore_dislikes"]>;
    export type view_vote_on_anime = z.infer<(typeof favoriteAnimes_schemas)["view_vote_on_anime"]>;
    export type add_like_to_anime = z.infer<(typeof favoriteAnimes_schemas)["add_like_to_anime"]>;
    export type delete_like_from_anime = z.infer<(typeof favoriteAnimes_schemas)["delete_like_from_anime"]>;
    export type add_dislike_to_anime = z.infer<(typeof favoriteAnimes_schemas)["add_dislike_to_anime"]>;
    export type delete_dislike_from_anime = z.infer<(typeof favoriteAnimes_schemas)["delete_dislike_from_anime"]>;
}
