import { profileNicknameValidatorSchema } from "./validator-utils-shared/profile_name.schema.js";
import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import { accountUsernameZodSchema } from "./validator-utils-shared/username.validator.js";
import { type z, strictObject } from "zod";

export const authenticationSectionSchemas = {
    logout: zodUtilSchemas.void,
    registration: strictObject({
        nickname: profileNicknameValidatorSchema,
        username: accountUsernameZodSchema,
        ip: zodUtilSchemas.ip_address,
        email: zodUtilSchemas.email.optional(),
        agent: zodUtilSchemas.user_agent,
        password: zodUtilSchemas.account_password,
        password_repeat: zodUtilSchemas.account_password,
    }),

    /** Check the current session */
    check_session: zodUtilSchemas.void,
    login_by_username: strictObject({
        username: accountUsernameZodSchema,
        ip: zodUtilSchemas.ip_address,
        agent: zodUtilSchemas.user_agent,
        password: zodUtilSchemas.account_password,
    }),
    /** For checking username for availability */
    check_username_availability: accountUsernameZodSchema,

    login_by_email: strictObject({
        email: zodUtilSchemas.email,
        ip: zodUtilSchemas.ip_address,
        agent: zodUtilSchemas.user_agent,
        password: zodUtilSchemas.account_password,
    }),
};

/** Request Validator DTO Types */
export namespace dto {
    export type logout = z.infer<(typeof authenticationSectionSchemas)["logout"]>;
    export type registration = z.infer<(typeof authenticationSectionSchemas)["registration"]>;
    export type check_session = z.infer<(typeof authenticationSectionSchemas)["check_session"]>;
    export type login_by_email = z.infer<(typeof authenticationSectionSchemas)["login_by_email"]>;
    export type login_by_username = z.infer<(typeof authenticationSectionSchemas)["login_by_username"]>;

    export type check_username_availability = z.infer<(typeof authenticationSectionSchemas)["check_username_availability"]>;
}
