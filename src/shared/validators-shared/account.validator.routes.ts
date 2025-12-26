import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import { accountUsernameZodSchema } from "./validator-utils-shared/username.validator.js";
import { strictObject, type z } from "zod";

export const accountSectionSchemas = {
    explore_me: zodUtilSchemas.void,
    set_email: zodUtilSchemas.email,
    update_email: strictObject({
        new_email: zodUtilSchemas.email,
        current_email: zodUtilSchemas.email,
    }),
    update_password: strictObject({
        new_password: zodUtilSchemas.account_password,
        repeat_new_password: zodUtilSchemas.account_password,
        current_password: zodUtilSchemas.account_password,
    }),
    update_username: accountUsernameZodSchema,
    get_sessions: zodUtilSchemas.void,
    terminate_other_sessions: zodUtilSchemas.void,
    terminate_specific_session: zodUtilSchemas.cuid("Айди сессии"),
    delete_account: zodUtilSchemas.void,
};
/** Request Validator DTO Types */
export namespace accountSectionReqDtos {
    export type explore_me = z.infer<(typeof accountSectionSchemas)["explore_me"]>;
    export type update_email = z.infer<(typeof accountSectionSchemas)["update_email"]>;
    export type set_email = z.infer<(typeof accountSectionSchemas)["set_email"]>;
    export type update_password = z.infer<(typeof accountSectionSchemas)["update_password"]>;
    export type update_username = z.infer<(typeof accountSectionSchemas)["update_username"]>;
    export type get_sessions = z.infer<(typeof accountSectionSchemas)["get_sessions"]>;
    export type terminate_other_sessions = z.infer<(typeof accountSectionSchemas)["terminate_other_sessions"]>;
    export type terminate_specific_session = z.infer<(typeof accountSectionSchemas)["terminate_specific_session"]>;
    export type delete_account = z.infer<(typeof accountSectionSchemas)["delete_account"]>;
}
