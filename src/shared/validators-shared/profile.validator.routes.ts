import { profileNicknameValidatorSchema } from "./validator-utils-shared/profile_name.schema.js";
import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import { account_username } from "./validator-utils-shared/username.validator.js";
import { z } from "zod";

export const profileRouteValidatorSchemas = new (class Profile_ValidatorSchemas {
    /** View other profiles, no auth needed */
    other_profiles = account_username;
    my_profile = zodUtilSchemas.void;
    update_bio = zodUtilSchemas.message("О себе");
    update_name = profileNicknameValidatorSchema;
})();

export type profileRouteValidatorSchemasType = typeof profileRouteValidatorSchemas;
/** Request Validator DTO Types */
export namespace profileRouteValidatorDtos {
    export type other_profiles = z.infer<profileRouteValidatorSchemasType["other_profiles"]>;
    export type my_profile = z.infer<profileRouteValidatorSchemasType["my_profile"]>;
    export type update_bio = z.infer<profileRouteValidatorSchemasType["update_bio"]>;
    export type update_name = z.infer<profileRouteValidatorSchemasType["update_name"]>;
}
