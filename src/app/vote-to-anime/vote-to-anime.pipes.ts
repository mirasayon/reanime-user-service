import { voteToAnimeSectionSchemas, type VoteToAnimeSectionRequestDtoType } from "#/shared/request-validator-for-all.routes.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { validatorMiddlewareFactory } from "#/utilities/validator-middleware-factory.js";
export interface VoteToAnimesSectionRequestTypes {
    explore_likes: RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.explore_likes>;
    explore_dislikes: RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.explore_dislikes>;
    view_vote_on_anime: RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.view_vote_on_anime, { anime_id: string }>;
    add_like_to_anime: RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.add_like_to_anime, { anime_id: string }>;
    delete_like_from_anime: RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.delete_like_from_anime, { anime_id: string }>;
    add_dislike_to_anime: RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.add_dislike_to_anime, { anime_id: string }>;
    delete_dislike_from_anime: RequestDtoTypeFactory<VoteToAnimeSectionRequestDtoType.delete_dislike_from_anime, { anime_id: string }>;
}

export const voteToAnimesSectionRequestValidatorMiddlewares = {
    explore_likes: validatorMiddlewareFactory<VoteToAnimesSectionRequestTypes["explore_likes"]>(voteToAnimeSectionSchemas.explore_likes),
    explore_dislikes: validatorMiddlewareFactory<VoteToAnimesSectionRequestTypes["explore_dislikes"]>(voteToAnimeSectionSchemas.explore_dislikes),
    view_vote_on_anime: validatorMiddlewareFactory<VoteToAnimesSectionRequestTypes["view_vote_on_anime"]>(
        voteToAnimeSectionSchemas.view_vote_on_anime,
        (req) => req.params.anime_id,
    ),
    add_like_to_anime: validatorMiddlewareFactory<VoteToAnimesSectionRequestTypes["add_like_to_anime"]>(
        voteToAnimeSectionSchemas.add_like_to_anime,
        (req) => req.params.anime_id,
    ),
    delete_like_from_anime: validatorMiddlewareFactory<VoteToAnimesSectionRequestTypes["delete_like_from_anime"]>(
        voteToAnimeSectionSchemas.delete_like_from_anime,
        (req) => req.params.anime_id,
    ),
    add_dislike_to_anime: validatorMiddlewareFactory<VoteToAnimesSectionRequestTypes["add_dislike_to_anime"]>(
        voteToAnimeSectionSchemas.add_dislike_to_anime,
        (req) => req.params.anime_id,
    ),
    delete_dislike_from_anime: validatorMiddlewareFactory<VoteToAnimesSectionRequestTypes["delete_dislike_from_anime"]>(
        voteToAnimeSectionSchemas.delete_dislike_from_anime,
        (req) => req.params.anime_id,
    ),
};
