import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import { z } from "zod";

const schemas = new (class Reply_ValidatorSchemas {
    get_1_reply_by_its_id = zodUtilSchemas.reply_id;

    get_replies_by_comment_id = z.strictObject({
        page: zodUtilSchemas.page_number,
        limit: zodUtilSchemas.page_size,
        comment_id: zodUtilSchemas.comment_id,
    });
    create_reply = z.strictObject({
        comment_id: zodUtilSchemas.comment_id,
        content: zodUtilSchemas.message("Ответ на комментарий"),
    });

    update_reply = z.strictObject({
        content: zodUtilSchemas.message("Новый ответ"),
        reply_id: zodUtilSchemas.reply_id,
    });
    delete_reply = zodUtilSchemas.reply_id;

    report_reply = z.strictObject({
        reply_id: zodUtilSchemas.reply_id,
        details: zodUtilSchemas.details,
        type: zodUtilSchemas.report_type,
    });

    add_like = zodUtilSchemas.reply_id;

    add_dislike = zodUtilSchemas.reply_id;

    delete_like = zodUtilSchemas.reply_id;

    delete_dislike = zodUtilSchemas.reply_id;
})();
export { schemas as reply_schemas };

export type Schemas = typeof schemas;
/** Request Validator DTO Types */
export namespace dto {
    export type get_1_reply_by_its_id = z.infer<Schemas["get_1_reply_by_its_id"]>;

    export type get_replies_by_comment_id = z.infer<Schemas["get_replies_by_comment_id"]>;
    export type create_reply = z.infer<Schemas["create_reply"]>;
    export type update_reply = z.infer<Schemas["update_reply"]>;
    export type delete_reply = z.infer<Schemas["delete_reply"]>;
    export type report_reply = z.infer<Schemas["report_reply"]>;
    export type add_like = z.infer<Schemas["add_like"]>;
    export type add_dislike = z.infer<Schemas["add_dislike"]>;
    export type delete_like = z.infer<Schemas["delete_like"]>;
    export type delete_dislike = z.infer<Schemas["delete_dislike"]>;
}
