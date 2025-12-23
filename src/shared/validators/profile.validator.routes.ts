import { profile_nickname } from "./utils/profile_name.schema.js";
import { UtilitySchemas } from "./utils/common.js";
import { account_username } from "./utils/username.validator.js";
import { z } from "zod";

export const profileRouteValidatorSchemas = new (class Profile_ValidatorSchemas {
    /** View other profiles, no auth needed */
    other_profiles = account_username;
    my_profile = UtilitySchemas.void;
    update_bio = UtilitySchemas.message("О себе");
    update_name = profile_nickname;
})();

export type profileRouteValidatorSchemasType = typeof profileRouteValidatorSchemas;
/** Request Validator DTO Types */
export namespace profileRouteValidatorDtos {
    export type other_profiles = z.infer<profileRouteValidatorSchemasType["other_profiles"]>;
    export type my_profile = z.infer<profileRouteValidatorSchemasType["my_profile"]>;
    export type update_bio = z.infer<profileRouteValidatorSchemasType["update_bio"]>;
    export type update_name = z.infer<profileRouteValidatorSchemasType["update_name"]>;
}
