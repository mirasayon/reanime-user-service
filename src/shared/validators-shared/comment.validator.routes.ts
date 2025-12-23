import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import { z } from "zod";
import { account_username } from "./validator-utils-shared/username.validator.js";

const schemas = new (class Comment_ValidatorSchemas {
    create = z.strictObject({
        anime_id: zodUtilSchemas.anime_id,
        content: zodUtilSchemas.message("Комментарий"),
    });
    get_all_for_anime = z.strictObject({
        page: zodUtilSchemas.page_number,
        limit: zodUtilSchemas.page_size,
        anime_id: zodUtilSchemas.anime_id,
    });
    /** new 2025.11.15 */
    all_my_comments = z.strictObject({
        page: zodUtilSchemas.page_number,
        limit: zodUtilSchemas.page_size,
    });
    /** new 2025.11.15 */
    all_for_public_profile = z.strictObject({
        page: zodUtilSchemas.page_number,
        username: account_username,
        limit: zodUtilSchemas.page_size,
    });

    update = z.strictObject({
        new_content: zodUtilSchemas.message("Новый комментарий"),
        comment_id: zodUtilSchemas.comment_id,
    });

    delete_comment = zodUtilSchemas.comment_id;

    report = z.strictObject({
        comment_id: zodUtilSchemas.comment_id,
        details: zodUtilSchemas.details,
        type: zodUtilSchemas.report_type,
    });
    /** modified 2025.11.24  */
    add_like = zodUtilSchemas.comment_id;
    add_dislike = zodUtilSchemas.comment_id;

    delete_like = zodUtilSchemas.comment_id;
    delete_dislike = zodUtilSchemas.comment_id;
})();
export { schemas as comment_schemas };
export type Schemas = typeof schemas;
/** Request Validator DTO Types */
export namespace dto {
    export type create = z.infer<Schemas["create"]>;
    export type get_all_for_anime = z.infer<Schemas["get_all_for_anime"]>;
    export type update = z.infer<Schemas["update"]>;
    export type delete_comment = z.infer<Schemas["delete_comment"]>;
    export type report = z.infer<Schemas["report"]>;
    export type all_my_comments = z.infer<Schemas["all_my_comments"]>;
    export type all_for_public_profile = z.infer<Schemas["all_for_public_profile"]>;

    export type add_like = z.infer<Schemas["add_like"]>;
    export type add_dislike = z.infer<Schemas["add_dislike"]>;
    export type delete_like = z.infer<Schemas["delete_like"]>;
    export type delete_dislike = z.infer<Schemas["delete_dislike"]>;
}
