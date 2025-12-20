import type { VoteToAnime } from "../../databases/orm/client.js";

/**
 * Response types for vote to anime
 */
export namespace ResponseTypesForVoteToAnime {
    export type explore_likes = VoteToAnime[];
    export type explore_dislikes = VoteToAnime[];
    export type view_vote_on_anime = VoteToAnime | null;
    export type add_like_to_anime = boolean;
    export type delete_like_from_anime = boolean;
    export type add_dislike_to_anime = boolean;
    export type delete_dislike_from_anime = boolean;
}
