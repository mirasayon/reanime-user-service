import { vmFactory as m } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory as _ } from "#/types/dto-middleware-shape.js";
import { type dto, reply_schemas as schemas } from "#/shared/validators-shared/comment-reply.validator.routes.js";

export namespace Reply_ReqDtos {
    export type create_reply = _<dto.create_reply>;
    export type report_reply = _<dto.report_reply, { reply_id: string; type: dto.report_reply["type"] }>;
    export type edit_reply = _<dto.update_reply>;

    export type add_dislike = _<dto.add_dislike, { reply_id: string }>;
    export type add_like = _<dto.add_like, { reply_id: string }>;

    export type delete_dislike = _<dto.delete_dislike, { reply_id: string }>;
    export type delete_like = _<dto.delete_like, { reply_id: string }>;

    export type delete_reply = _<dto.delete_reply, { reply_id: string }>;
    export type get_replies_by_comment_id = _<dto.get_replies_by_comment_id, { comment_id: string }>;
    export type get_1_reply_by_its_id = _<dto.get_1_reply_by_its_id, { reply_id: string }>;
}

export const replyForCommentSectionValidatorMiddlewares = new (class Reply_ReqPipes {
    create_reply = m<Reply_ReqDtos.create_reply>(schemas.create_reply, async (req) => req.body);

    get_1_reply_by_its_id = m<Reply_ReqDtos.get_1_reply_by_its_id>(schemas.get_1_reply_by_its_id, async (req) => req.params.reply_id);
    get_replies_by_comment_id = m<Reply_ReqDtos.get_replies_by_comment_id>(schemas.get_replies_by_comment_id, async (req) => {
        return {
            ...req.params,
            ...req.query,
        };
    });

    edit_reply = m<Reply_ReqDtos.edit_reply>(schemas.update_reply, async (req) => req.body);

    delete_reply = m<Reply_ReqDtos.delete_reply>(schemas.delete_reply, async (req) => req.params.reply_id);

    report_reply = m<Reply_ReqDtos.report_reply>(schemas.report_reply, async (req) => {
        return {
            reply_id: req.params.reply_id,
            type: req.params.type,
            ...req.body,
        };
    });

    add_like = m<Reply_ReqDtos.add_like>(schemas.add_like, async (req) => req.params.reply_id);
    add_dislike = m<Reply_ReqDtos.add_dislike>(schemas.add_dislike, async (req) => req.params.reply_id);

    delete_like = m<Reply_ReqDtos.add_like>(schemas.delete_like, async (req) => req.params.reply_id);
    delete_dislike = m<Reply_ReqDtos.add_dislike>(schemas.delete_dislike, async (req) => req.params.reply_id);
})();
