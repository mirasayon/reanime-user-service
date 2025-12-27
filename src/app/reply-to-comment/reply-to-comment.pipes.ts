import { validatorMiddlewareFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { replyForCommentSectionZodSchemas, type ReplyForCommentReqDtos } from "#/shared/request-validator-for-all.routes.js";

export namespace ReplyForCommentSectionRequestTypes {
    export type create_reply = RequestDtoTypeFactory<ReplyForCommentReqDtos.create_reply>;
    export type report_reply = RequestDtoTypeFactory<
        ReplyForCommentReqDtos.report_reply,
        { reply_id: string; type: ReplyForCommentReqDtos.report_reply["type"] }
    >;
    export type edit_reply = RequestDtoTypeFactory<ReplyForCommentReqDtos.update_reply>;

    export type add_dislike = RequestDtoTypeFactory<ReplyForCommentReqDtos.add_dislike, { reply_id: string }>;
    export type add_like = RequestDtoTypeFactory<ReplyForCommentReqDtos.add_like, { reply_id: string }>;

    export type delete_dislike = RequestDtoTypeFactory<ReplyForCommentReqDtos.delete_dislike, { reply_id: string }>;
    export type delete_like = RequestDtoTypeFactory<ReplyForCommentReqDtos.delete_like, { reply_id: string }>;

    export type delete_reply = RequestDtoTypeFactory<ReplyForCommentReqDtos.delete_reply, { reply_id: string }>;
    export type get_replies_by_comment_id = RequestDtoTypeFactory<ReplyForCommentReqDtos.get_replies_by_comment_id, { comment_id: string }>;
    export type get_1_reply_by_its_id = RequestDtoTypeFactory<ReplyForCommentReqDtos.get_1_reply_by_its_id, { reply_id: string }>;
}

export const replyForCommentSectionValidatorMiddlewares = {
    create_reply: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes.create_reply>(
        replyForCommentSectionZodSchemas.create_reply,
        (req) => req.body,
    ),
    get_1_reply_by_its_id: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes.get_1_reply_by_its_id>(
        replyForCommentSectionZodSchemas.get_1_reply_by_its_id,
        (req) => req.params.reply_id,
    ),
    get_replies_by_comment_id: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes.get_replies_by_comment_id>(
        replyForCommentSectionZodSchemas.get_replies_by_comment_id,
        (req) => {
            return {
                ...req.params,
                ...req.query,
            };
        },
    ),
    edit_reply: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes.edit_reply>(
        replyForCommentSectionZodSchemas.update_reply,
        (req) => req.body,
    ),

    delete_reply: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes.delete_reply>(
        replyForCommentSectionZodSchemas.delete_reply,
        (req) => req.params.reply_id,
    ),

    report_reply: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes.report_reply>(
        replyForCommentSectionZodSchemas.report_reply,
        (req) => {
            return {
                reply_id: req.params.reply_id,
                type: req.params.type,
                ...req.body,
            };
        },
    ),

    add_like: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes.add_like>(
        replyForCommentSectionZodSchemas.add_like,
        (req) => req.params.reply_id,
    ),
    add_dislike: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes.add_dislike>(
        replyForCommentSectionZodSchemas.add_dislike,
        (req) => req.params.reply_id,
    ),

    delete_like: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes.add_like>(
        replyForCommentSectionZodSchemas.delete_like,
        (req) => req.params.reply_id,
    ),
    delete_dislike: validatorMiddlewareFactory<ReplyForCommentSectionRequestTypes.add_dislike>(
        replyForCommentSectionZodSchemas.delete_dislike,
        (req) => req.params.reply_id,
    ),
};
