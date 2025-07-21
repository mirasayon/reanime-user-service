import { vmfactory as m } from "#/utils/validators/factory.js";
import type { Request_dto_auth as _ } from "[T]/request_with_dto.js";
import { Types, reply_schemas as schemas } from "@xamarin.city/reanime/user-service/validators/reply.js";

namespace rd {
    export type create = _<Types.Inputs.create>;
    export type report = _<Types.Inputs.report, { reply_id: string; type: Types.Inputs.report["type"] }>;
    export type edit_reply = _<Types.Inputs.update_reply>;

    export type add_dislike = _<Types.Inputs.add_dislike, { reply_id: string }>;
    export type add_like = _<Types.Inputs.add_like, { reply_id: string }>;

    export type delete_dislike = _<Types.Inputs.delete_dislike, { reply_id: string }>;
    export type delete_like = _<Types.Inputs.delete_like, { reply_id: string }>;

    export type delete_reply = _<Types.Inputs.delete_reply, { reply_id: string }>;
    export type get_replies_by_comment_id = _<Types.Inputs.get_replies_by_comment_id, { comment_id: string }>;
    export type get_1_reply_by_its_id = _<Types.Inputs.get_1_reply_by_its_id, { reply_id: string }>;
}
export type { rd as Reply_ReqDtos };

export const Reply_ReqPipes = new (class Reply_ReqPipes {
    create = m<rd.create>(schemas.create, async (req) => req.body);

    get_1_reply_by_its_id = m<rd.get_1_reply_by_its_id>(
        schemas.get_1_reply_by_its_id,
        async (req) => req.params.reply_id,
    );
    get_replies_by_comment_id = m<rd.get_replies_by_comment_id>(schemas.get_replies_by_comment_id, async (req) => {
        return {
            ...req.params,
            ...req.query,
        };
    });

    edit_reply = m<rd.edit_reply>(schemas.update_reply, async (req) => req.body);

    delete_reply = m<rd.delete_reply>(schemas.delete_reply, async (req) => req.params.reply_id);

    report = m<rd.report>(schemas.report, async (req) => {
        return {
            reply_id: req.params.reply_id,
            type: req.params.type,
            ...req.body,
        };
    });

    add_like = m<rd.add_like>(schemas.add_like, async (req) => req.params.reply_id);
    add_dislike = m<rd.add_dislike>(schemas.add_dislike, async (req) => req.params.reply_id);

    delete_like = m<rd.add_like>(schemas.delete_like, async (req) => req.params.reply_id);
    delete_dislike = m<rd.add_dislike>(schemas.delete_dislike, async (req) => req.params.reply_id);
})();
