import { profileNicknameValidatorSchema } from "./validator-utils-shared/profile_name.schema.js";
import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import { accountUsernameZodSchema } from "./validator-utils-shared/username.validator.js";
import type { z } from "zod";

export const profileRouteValidatorSchemas = {
    /** View other profiles, no auth needed */
    other_profiles: accountUsernameZodSchema,
    my_profile: zodUtilSchemas.void,
    update_bio: zodUtilSchemas.message("О себе"),
    update_name: profileNicknameValidatorSchema,
};

/** Request Validator DTO Types */
export namespace profileRouteValidatorDtos {
    export type other_profiles = z.infer<(typeof profileRouteValidatorSchemas)["other_profiles"]>;
    export type my_profile = z.infer<(typeof profileRouteValidatorSchemas)["my_profile"]>;
    export type update_bio = z.infer<(typeof profileRouteValidatorSchemas)["update_bio"]>;
    export type update_name = z.infer<(typeof profileRouteValidatorSchemas)["update_name"]>;
}
