import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import { accountUsernameZodSchema } from "./validator-utils-shared/username.validator.js";
import type { z } from "zod";

export const mediaRouteValidatorSchemas = {
    avatar_view: accountUsernameZodSchema,
    set_avatar: zodUtilSchemas.void,
    update_avatar: zodUtilSchemas.void,
    delete_avatar: zodUtilSchemas.void,
};

/** Request Validator DTO Types */
export namespace mediaRouteValidatorDtos {
    export type avatar_view = z.infer<(typeof mediaRouteValidatorSchemas)["avatar_view"]>;
    export type set_avatar = z.infer<(typeof mediaRouteValidatorSchemas)["set_avatar"]>;
    export type update_avatar = z.infer<(typeof mediaRouteValidatorSchemas)["update_avatar"]>;
    export type delete_avatar = z.infer<(typeof mediaRouteValidatorSchemas)["delete_avatar"]>;
}
