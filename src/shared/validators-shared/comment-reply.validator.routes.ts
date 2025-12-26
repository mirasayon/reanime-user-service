import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import { type z, strictObject } from "zod";

export const reply_schemas = {
    get_1_reply_by_its_id: zodUtilSchemas.reply_id,

    get_replies_by_comment_id: strictObject({
        page: zodUtilSchemas.page_number,
        limit: zodUtilSchemas.page_size,
        comment_id: zodUtilSchemas.comment_id,
    }),
    create_reply: strictObject({
        comment_id: zodUtilSchemas.comment_id,
        content: zodUtilSchemas.message("Ответ на комментарий"),
    }),

    update_reply: strictObject({
        content: zodUtilSchemas.message("Новый ответ"),
        reply_id: zodUtilSchemas.reply_id,
    }),
    delete_reply: zodUtilSchemas.reply_id,

    report_reply: strictObject({
        reply_id: zodUtilSchemas.reply_id,
        details: zodUtilSchemas.details,
        type: zodUtilSchemas.report_type,
    }),

    add_like: zodUtilSchemas.reply_id,

    add_dislike: zodUtilSchemas.reply_id,

    delete_like: zodUtilSchemas.reply_id,

    delete_dislike: zodUtilSchemas.reply_id,
};

/** Request Validator DTO Types */
export namespace dto {
    export type get_1_reply_by_its_id = z.infer<(typeof reply_schemas)["get_1_reply_by_its_id"]>;
    export type get_replies_by_comment_id = z.infer<(typeof reply_schemas)["get_replies_by_comment_id"]>;
    export type create_reply = z.infer<(typeof reply_schemas)["create_reply"]>;
    export type update_reply = z.infer<(typeof reply_schemas)["update_reply"]>;
    export type delete_reply = z.infer<(typeof reply_schemas)["delete_reply"]>;
    export type report_reply = z.infer<(typeof reply_schemas)["report_reply"]>;
    export type add_like = z.infer<(typeof reply_schemas)["add_like"]>;
    export type add_dislike = z.infer<(typeof reply_schemas)["add_dislike"]>;
    export type delete_like = z.infer<(typeof reply_schemas)["delete_like"]>;
    export type delete_dislike = z.infer<(typeof reply_schemas)["delete_dislike"]>;
}
