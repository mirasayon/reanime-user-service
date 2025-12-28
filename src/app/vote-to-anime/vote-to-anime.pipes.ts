import { voteToAnimeSectionSchemas, type VoteToAnimeSectionValidationSchemaType } from "#src/shared/request-validator-for-all.routes.ts";
import type { RequestDtoTypeFactory } from "#src/types/dto-middleware-shape.ts";
import { validatorMiddlewareFactory } from "#src/utilities/validator-middleware-factory.ts";
export interface VoteToAnimesSectionRequestTypes {
    explore_likes: RequestDtoTypeFactory<VoteToAnimeSectionValidationSchemaType["explore_likes"]>;
    explore_dislikes: RequestDtoTypeFactory<VoteToAnimeSectionValidationSchemaType["explore_dislikes"]>;
    view_vote_on_anime: RequestDtoTypeFactory<VoteToAnimeSectionValidationSchemaType["view_vote_on_anime"], { anime_id: string }>;
    add_like_to_anime: RequestDtoTypeFactory<VoteToAnimeSectionValidationSchemaType["add_like_to_anime"], { anime_id: string }>;
    delete_like_from_anime: RequestDtoTypeFactory<VoteToAnimeSectionValidationSchemaType["delete_like_from_anime"], { anime_id: string }>;
    add_dislike_to_anime: RequestDtoTypeFactory<VoteToAnimeSectionValidationSchemaType["add_dislike_to_anime"], { anime_id: string }>;
    delete_dislike_from_anime: RequestDtoTypeFactory<VoteToAnimeSectionValidationSchemaType["delete_dislike_from_anime"], { anime_id: string }>;
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
