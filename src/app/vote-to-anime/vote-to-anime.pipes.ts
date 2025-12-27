import { voteToAnimeSectionSchemas, type VoteToAnimeSectionRequestDtoType } from "#/shared/request-validator-for-all.routes.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { validatorMiddlewareFactory } from "#/utilities/validator-middleware-factory.js";
export namespace FavoriteAnimesSectionRequestTypes {
    export type explore_likes = RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.explore_likes>;
    export type explore_dislikes = RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.explore_dislikes>;
    export type view_vote_on_anime = RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.view_vote_on_anime, { anime_id: string }>;
    export type add_like_to_anime = RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.add_like_to_anime, { anime_id: string }>;
    export type delete_like_from_anime = RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.delete_like_from_anime, { anime_id: string }>;
    export type add_dislike_to_anime = RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.add_dislike_to_anime, { anime_id: string }>;
    export type delete_dislike_from_anime = RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.delete_dislike_from_anime, { anime_id: string }>;
}

export const Favorite_Animes_ReqPipes = new (class Favorite_Animes_ReqPipes {
    explore_likes = validatorMiddlewareFactory<FavoriteAnimesSectionRequestTypes.explore_likes>(voteToAnimeSectionSchemas.explore_likes);
    explore_dislikes = validatorMiddlewareFactory<FavoriteAnimesSectionRequestTypes.explore_dislikes>(voteToAnimeSectionSchemas.explore_dislikes);
    view_vote_on_anime = validatorMiddlewareFactory<FavoriteAnimesSectionRequestTypes.view_vote_on_anime>(
        voteToAnimeSectionSchemas.view_vote_on_anime,
        async (req) => req.params.anime_id,
    );
    add_like_to_anime = validatorMiddlewareFactory<FavoriteAnimesSectionRequestTypes.add_like_to_anime>(
        voteToAnimeSectionSchemas.add_like_to_anime,
        async (req) => req.params.anime_id,
    );
    delete_like_from_anime = validatorMiddlewareFactory<FavoriteAnimesSectionRequestTypes.delete_like_from_anime>(
        voteToAnimeSectionSchemas.delete_like_from_anime,
        async (req) => req.params.anime_id,
    );
    add_dislike_to_anime = validatorMiddlewareFactory<FavoriteAnimesSectionRequestTypes.add_dislike_to_anime>(
        voteToAnimeSectionSchemas.add_dislike_to_anime,
        async (req) => req.params.anime_id,
    );
    delete_dislike_from_anime = validatorMiddlewareFactory<FavoriteAnimesSectionRequestTypes.delete_dislike_from_anime>(
        voteToAnimeSectionSchemas.delete_dislike_from_anime,
        async (req) => req.params.anime_id,
    );
})();
