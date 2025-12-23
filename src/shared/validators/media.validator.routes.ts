import { UtilitySchemas } from "./utils/common.js";
import { account_username } from "./utils/username.validator.js";
import { z } from "zod";

export const mediaRouteValidatorSchemas = new (class Profile_ValidatorSchemas {
    avatar_view = account_username;

    set_avatar = UtilitySchemas.void;
    update_avatar = UtilitySchemas.void;
    delete_avatar = UtilitySchemas.void;
})();

export type mediaRouteValidatorSchemasSchemasType = typeof mediaRouteValidatorSchemas;
/** Request Validator DTO Types */
export namespace mediaRouteValidatorDtos {
    export type avatar_view = z.infer<mediaRouteValidatorSchemasSchemasType["avatar_view"]>;
    export type set_avatar = z.infer<mediaRouteValidatorSchemasSchemasType["set_avatar"]>;
    export type update_avatar = z.infer<mediaRouteValidatorSchemasSchemasType["update_avatar"]>;
    export type delete_avatar = z.infer<mediaRouteValidatorSchemasSchemasType["delete_avatar"]>;
}
