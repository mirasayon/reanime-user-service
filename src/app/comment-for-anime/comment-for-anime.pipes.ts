import { get_universal_search_query_values_array } from "#src/utilities/js-util-functions.ts";
import { validatorMiddlewareFactory } from "#src/utilities/controller-utility-functions.ts";
import type { RequestDtoTypeFactory } from "#src/types/dto-middleware-shape.ts";
import {
    commentToAnimeSectionValidatorSchemas,
    type CommentToAnimeSectionValidationSchemaType,
} from "#src/shared/request-validator-for-all.routes.ts";

export interface CommentToAnimeSectionRequestTypes {
    create: RequestDtoTypeFactory<CommentToAnimeSectionValidationSchemaType["create"], { anime_id: string }>;
    report: RequestDtoTypeFactory<CommentToAnimeSectionValidationSchemaType["report"]>;
    all_my_comments: RequestDtoTypeFactory<CommentToAnimeSectionValidationSchemaType["all_my_comments"]>;
    all_for_public_profile: RequestDtoTypeFactory<CommentToAnimeSectionValidationSchemaType["all_for_public_profile"], { username: string }>;
    update_comment: RequestDtoTypeFactory<CommentToAnimeSectionValidationSchemaType["update_comment"], { comment_id: string }>;
    delete_comment: RequestDtoTypeFactory<CommentToAnimeSectionValidationSchemaType["delete_comment"], { comment_id: string }>;
    add_dislike: RequestDtoTypeFactory<CommentToAnimeSectionValidationSchemaType["add_dislike"], { comment_id: string }>;
    add_like: RequestDtoTypeFactory<CommentToAnimeSectionValidationSchemaType["add_like"], { comment_id: string }>;
    delete_dislike: RequestDtoTypeFactory<CommentToAnimeSectionValidationSchemaType["delete_dislike"], { comment_id: string }>;
    delete_like: RequestDtoTypeFactory<CommentToAnimeSectionValidationSchemaType["delete_like"], { comment_id: string }>;
    get_all_for_anime: RequestDtoTypeFactory<CommentToAnimeSectionValidationSchemaType["get_all_for_anime"], { anime_id: string }>;
}

export const Comment_ReqPipes = {
    create: validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes["create"]>(commentToAnimeSectionValidatorSchemas.create, (req) => {
        return {
            ...req.body,
            anime_id: req.params.anime_id,
        };
    }),

    /** GET Request  */
    get_all_for_anime: validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes["get_all_for_anime"]>(
        commentToAnimeSectionValidatorSchemas.get_all_for_anime,
        (req) => {
            const { limit, page } = get_universal_search_query_values_array(req.query, ["page", "limit"]);
            const { anime_id } = req.params;
            return { page, limit, anime_id };
        },
    ),

    update_comment: validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes["update_comment"]>(
        commentToAnimeSectionValidatorSchemas.update_comment,
        (req) => {
            return { comment_id: req.params.comment_id, ...req.body };
        },
    ),

    delete_comment: validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes["delete_comment"]>(
        commentToAnimeSectionValidatorSchemas.delete_comment,
        (req) => req.params.comment_id,
    ),

    report: validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes["report"]>(commentToAnimeSectionValidatorSchemas.report, (req) => req.body),
    /** new 2025.11.15 */
    all_my_comments: validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes["all_my_comments"]>(
        commentToAnimeSectionValidatorSchemas.all_my_comments,
        (req) => {
            const { limit, page } = get_universal_search_query_values_array(req.query, ["page", "limit"]);
            return {
                limit: limit,
                page: page,
            };
        },
    ),
    /** new 2025.11.15 */
    all_for_public_profile: validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes["all_for_public_profile"]>(
        commentToAnimeSectionValidatorSchemas.all_for_public_profile,
        (req) => {
            const { limit, page } = get_universal_search_query_values_array(req.query, ["page", "limit"]);
            return {
                limit: limit,
                page: page,
                username: req.params.username,
            };
        },
    ),

    add_like: validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes["add_like"]>(
        commentToAnimeSectionValidatorSchemas.add_like,
        (req) => req.params.comment_id,
    ),
    add_dislike: validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes["add_dislike"]>(
        commentToAnimeSectionValidatorSchemas.add_dislike,
        (req) => req.params.comment_id,
    ),

    delete_like: validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes["delete_like"]>(
        commentToAnimeSectionValidatorSchemas.delete_like,
        (req) => req.params.comment_id,
    ),
    delete_dislike: validatorMiddlewareFactory<CommentToAnimeSectionRequestTypes["delete_dislike"]>(
        commentToAnimeSectionValidatorSchemas.delete_dislike,
        (req) => req.params.comment_id,
    ),
};
