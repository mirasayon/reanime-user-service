import { validatorMiddlewareFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { profileRouteValidatorSchemas, type ProfileSectionValidationSchemaType } from "#/shared/request-validator-for-all.routes.js";
export interface ProfileSectionRequestTypes {
    update_name: RequestDtoTypeFactory<ProfileSectionValidationSchemaType["update_name"], { nickname: string }>;
    update_bio: RequestDtoTypeFactory<ProfileSectionValidationSchemaType["update_bio"]>;
    my_profile: RequestDtoTypeFactory<ProfileSectionValidationSchemaType["my_profile"]>;
    other_profiles: RequestDtoTypeFactory<ProfileSectionValidationSchemaType["other_profiles"], { username: string }>;
}

export const profileRequestValidatorMiddlewares = {
    other_profiles: validatorMiddlewareFactory<ProfileSectionRequestTypes["other_profiles"]>(
        profileRouteValidatorSchemas.other_profiles,
        (req) => req.params.username,
    ),
    my_profile: validatorMiddlewareFactory<ProfileSectionRequestTypes["my_profile"]>(profileRouteValidatorSchemas.my_profile),
    update_nickname: validatorMiddlewareFactory<ProfileSectionRequestTypes["update_name"]>(
        profileRouteValidatorSchemas.update_name,
        (req) => req.params.nickname,
    ),
    update_bio: validatorMiddlewareFactory<ProfileSectionRequestTypes["update_bio"]>(profileRouteValidatorSchemas.update_bio, (req) => req.body.bio),
};
