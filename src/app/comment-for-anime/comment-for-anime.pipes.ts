import { get_universal_search_query_values_array } from "#/utilities/util-functions.js";
import { validatorMiddlewareFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { commentToAnimeSectionValidatorSchemas, type CommentToAnimeSectionReqDtos } from "#/shared/request-validator-for-all.routes.js";

export namespace CommentToAnimeSectionRequestTypes {
    export type create = RequestDtoTypeFactory<CommentToAnimeSectionReqDtos.create, { anime_id: string }>;
    export type report = RequestDtoTypeFactory<CommentToAnimeSectionReqDtos.report>;
    export type all_my_comments = RequestDtoTypeFactory<CommentToAnimeSectionReqDtos.all_my_comments>;
    export type all_for_public_profile = RequestDtoTypeFactory<CommentToAnimeSectionReqDtos.all_for_public_profile, { username: string }>;
    export type update = RequestDtoTypeFactory<CommentToAnimeSectionReqDtos.update, { comment_id: string }>;
    export type delete_comment = RequestDtoTypeFactory<CommentToAnimeSectionReqDtos.delete_comment, { comment_id: string }>;
    export type vote_dislike = RequestDtoTypeFactory<CommentToAnimeSectionReqDtos.add_dislike, { comment_id: string }>;
    export type vote_like = RequestDtoTypeFactory<CommentToAnimeSectionReqDtos.add_like, { comment_id: string }>;
    export type delete_dislike = RequestDtoTypeFactory<CommentToAnimeSectionReqDtos.delete_dislike, { comment_id: string }>;
    export type delete_like = RequestDtoTypeFactory<CommentToAnimeSectionReqDtos.delete_like, { comment_id: string }>;
    export type get_all_for_anime = RequestDtoTypeFactory<CommentToAnimeSectionReqDtos.get_all_for_anime, { anime_id: string }>;
}

export const Comment_ReqPipes = new (class Comment_ReqPipes {
    create = validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes.create>(commentToAnimeSectionValidatorSchemas.create, async (req) => {
        return {
            ...req.body,
            anime_id: req.params.anime_id,
        };
    });

    /** GET Request  */
    get_all_for_anime = validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes.get_all_for_anime>(
        commentToAnimeSectionValidatorSchemas.get_all_for_anime,
        async (req) => {
            const { limit, page } = get_universal_search_query_values_array(req.query, ["page", "limit"]);
            const { anime_id } = req.params;
            return { page, limit, anime_id };
        },
    );

    update = validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes.update>(commentToAnimeSectionValidatorSchemas.update, async (req) => {
        return { comment_id: req.params.comment_id, ...req.body };
    });

    delete_comment = validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes.delete_comment>(
        commentToAnimeSectionValidatorSchemas.delete_comment,
        async (req) => req.params.comment_id,
    );

    report = validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes.report>(
        commentToAnimeSectionValidatorSchemas.report,
        async (req) => req.body,
    );
    /** new 2025.11.15 */
    all_my_comments = validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes.all_my_comments>(
        commentToAnimeSectionValidatorSchemas.all_my_comments,
        async (req) => {
            const { limit, page } = get_universal_search_query_values_array(req.query, ["page", "limit"]);
            return {
                limit: limit,
                page: page,
            };
        },
    );
    /** new 2025.11.15 */
    all_for_public_profile = validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes.all_for_public_profile>(
        commentToAnimeSectionValidatorSchemas.all_for_public_profile,
        async (req) => {
            const { limit, page } = get_universal_search_query_values_array(req.query, ["page", "limit"]);
            return {
                limit: limit,
                page: page,
                username: req.params.username,
            };
        },
    );

    add_like = validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes.vote_like>(
        commentToAnimeSectionValidatorSchemas.add_like,
        async (req) => req.params.comment_id,
    );
    add_dislike = validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes.vote_dislike>(
        commentToAnimeSectionValidatorSchemas.add_dislike,
        async (req) => req.params.comment_id,
    );

    delete_like = validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes.delete_like>(
        commentToAnimeSectionValidatorSchemas.delete_like,
        async (req) => req.params.comment_id,
    );
    delete_dislike = validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes.delete_dislike>(
        commentToAnimeSectionValidatorSchemas.delete_dislike,
        async (req) => req.params.comment_id,
    );
})();
