import { validatorMiddlewareFactory } from "#src/utilities/validator-middleware-factory.ts";
import type { RequestDtoTypeFactory } from "#src/types/dto-middleware-shape.ts";
import {
    replyForCommentSectionValidatorSchemas,
    type ReplyForCommentSectionValidationSchemaType,
} from "#src/shared/request-validator-for-all.routes.ts";

export interface ReplyForCommentSectionRequestTypes {
    create_reply: RequestDtoTypeFactory<ReplyForCommentSectionValidationSchemaType["create_reply"]>;
    report_reply: RequestDtoTypeFactory<
        ReplyForCommentSectionValidationSchemaType["report_reply"],
        { reply_id: string; type: ReplyForCommentSectionValidationSchemaType["report_reply"]["type"] }
    >;
    edit_reply: RequestDtoTypeFactory<ReplyForCommentSectionValidationSchemaType["update_reply"]>;

    add_dislike: RequestDtoTypeFactory<ReplyForCommentSectionValidationSchemaType["add_dislike"], { reply_id: string }>;
    add_like: RequestDtoTypeFactory<ReplyForCommentSectionValidationSchemaType["add_like"], { reply_id: string }>;

    delete_dislike: RequestDtoTypeFactory<ReplyForCommentSectionValidationSchemaType["delete_dislike"], { reply_id: string }>;
    delete_like: RequestDtoTypeFactory<ReplyForCommentSectionValidationSchemaType["delete_like"], { reply_id: string }>;

    delete_reply: RequestDtoTypeFactory<ReplyForCommentSectionValidationSchemaType["delete_reply"], { reply_id: string }>;
    get_replies_by_comment_id: RequestDtoTypeFactory<ReplyForCommentSectionValidationSchemaType["get_replies_by_comment_id"], { comment_id: string }>;
    get_1_reply_by_its_id: RequestDtoTypeFactory<ReplyForCommentSectionValidationSchemaType["get_1_reply_by_its_id"], { reply_id: string }>;
}

export const replyForCommentSectionValidatorMiddlewares = {
    create_reply: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes["create_reply"]>(
        replyForCommentSectionValidatorSchemas.create_reply,
        (req) => req.body,
    ),
    get_1_reply_by_its_id: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes["get_1_reply_by_its_id"]>(
        replyForCommentSectionValidatorSchemas.get_1_reply_by_its_id,
        (req) => req.params.reply_id,
    ),
    get_replies_by_comment_id: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes["get_replies_by_comment_id"]>(
        replyForCommentSectionValidatorSchemas.get_replies_by_comment_id,
        (req) => {
            return {
                ...req.params,
                ...req.query,
            };
        },
    ),
    edit_reply: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes["edit_reply"]>(
        replyForCommentSectionValidatorSchemas.update_reply,
        (req) => req.body,
    ),

    delete_reply: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes["delete_reply"]>(
        replyForCommentSectionValidatorSchemas.delete_reply,
        (req) => req.params.reply_id,
    ),

    report_reply: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes["report_reply"]>(
        replyForCommentSectionValidatorSchemas.report_reply,
        (req) => {
            return {
                reply_id: req.params.reply_id,
                type: req.params.type,
                ...req.body,
            };
        },
    ),

    add_like: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes["add_like"]>(
        replyForCommentSectionValidatorSchemas.add_like,
        (req) => req.params.reply_id,
    ),
    add_dislike: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes["add_dislike"]>(
        replyForCommentSectionValidatorSchemas.add_dislike,
        (req) => req.params.reply_id,
    ),

    delete_like: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes["delete_like"]>(
        replyForCommentSectionValidatorSchemas.delete_like,
        (req) => req.params.reply_id,
    ),
    delete_dislike: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes["delete_dislike"]>(
        replyForCommentSectionValidatorSchemas.delete_dislike,
        (req) => req.params.reply_id,
    ),
};
