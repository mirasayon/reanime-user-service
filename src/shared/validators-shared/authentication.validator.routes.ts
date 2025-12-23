import { profileNicknameValidatorSchema } from "./validator-utils-shared/profile_name.schema.js";
import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import { account_username } from "./validator-utils-shared/username.validator.js";
import { z } from "zod";

const schemas = new (class Auth_ValidatorSchemas {
    logout = zodUtilSchemas.void;
    registration = z.strictObject({
        nickname: profileNicknameValidatorSchema,
        username: account_username,
        ip: zodUtilSchemas.ip_address,
        email: zodUtilSchemas.email.optional(),
        agent: zodUtilSchemas.user_agent,
        password: zodUtilSchemas.account_password,
        password_repeat: zodUtilSchemas.account_password,
    });

    /** Check the current session */
    check_session = zodUtilSchemas.void;

    /** */
    login_via_username = z.strictObject({
        username: account_username,
        ip: zodUtilSchemas.ip_address,
        agent: zodUtilSchemas.user_agent,
        password: zodUtilSchemas.account_password,
    });

    /** For checking username for availability */
    check_username_availability = account_username;

    login_via_email = z.strictObject({
        email: zodUtilSchemas.email,
        ip: zodUtilSchemas.ip_address,
        agent: zodUtilSchemas.user_agent,
        password: zodUtilSchemas.account_password,
    });
})();
export { schemas as authentication_schemas };

export type Schemas = typeof schemas;
/** Request Validator DTO Types */
export namespace dto {
    export type logout = z.infer<Schemas["logout"]>;
    export type registration = z.infer<Schemas["registration"]>;
    export type check_session = z.infer<Schemas["check_session"]>;
    export type login_via_email = z.infer<Schemas["login_via_email"]>;
    export type login_via_username = z.infer<Schemas["login_via_username"]>;

    export type check_username_availability = z.infer<Schemas["check_username_availability"]>;
}
