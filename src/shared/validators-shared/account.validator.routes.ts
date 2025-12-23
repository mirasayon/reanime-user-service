import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import { account_username } from "./validator-utils-shared/username.validator.js";
import { strictObject, type z } from "zod";

export const accountSectionSchemas = new (class Account_ValidatorSchemas {
    explore_me = zodUtilSchemas.void;
    set_email = zodUtilSchemas.email;
    update_email = strictObject({
        new_email: zodUtilSchemas.email,
        current_email: zodUtilSchemas.email,
    });

    update_password = strictObject({
        new_password: zodUtilSchemas.account_password,
        repeat_new_password: zodUtilSchemas.account_password,
        current_password: zodUtilSchemas.account_password,
    });
    update_username = account_username;

    get_sessions = zodUtilSchemas.void;
    terminate_other_sessions = zodUtilSchemas.void;
    terminate_specific_session = zodUtilSchemas.cuid("Айди сессии");

    delete_account = zodUtilSchemas.void;
})();
export type accountSectionValidatorSchemas = typeof accountSectionSchemas;
/** Request Validator DTO Types */
export namespace accountSectionReqDtos {
    export type explore_me = z.infer<accountSectionValidatorSchemas["explore_me"]>;
    export type update_email = z.infer<accountSectionValidatorSchemas["update_email"]>;
    export type set_email = z.infer<accountSectionValidatorSchemas["set_email"]>;
    export type update_password = z.infer<accountSectionValidatorSchemas["update_password"]>;
    export type update_username = z.infer<accountSectionValidatorSchemas["update_username"]>;
    export type get_sessions = z.infer<accountSectionValidatorSchemas["get_sessions"]>;
    export type terminate_other_sessions = z.infer<accountSectionValidatorSchemas["terminate_other_sessions"]>;
    export type terminate_specific_session = z.infer<accountSectionValidatorSchemas["terminate_specific_session"]>;
    export type delete_account = z.infer<accountSectionValidatorSchemas["delete_account"]>;
}
