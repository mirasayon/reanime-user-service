import { validatorMiddlewareFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { profileRouteValidatorSchemas, type profileRouteValidatorDtos } from "#/shared/validators/app-validator-for-all.routes.js";
export namespace ProfileSectionRequestTypes {
    export type update_name = RequestDtoTypeFactory<profileRouteValidatorDtos.update_name, { nickname: string }>;
    export type update_bio = RequestDtoTypeFactory<profileRouteValidatorDtos.update_bio>;
    export type my_profile = RequestDtoTypeFactory<profileRouteValidatorDtos.my_profile>;
    export type other_profiles = RequestDtoTypeFactory<profileRouteValidatorDtos.other_profiles, { username: string }>;
}

export const profileRequestValidatorMiddlewares = {
    other_profiles: validatorMiddlewareFactory<ProfileSectionRequestTypes.other_profiles>(
        profileRouteValidatorSchemas.other_profiles,
        async (req) => req.params.username,
    ),
    my_profile: validatorMiddlewareFactory<ProfileSectionRequestTypes.my_profile>(profileRouteValidatorSchemas.my_profile),
    update_nickname: validatorMiddlewareFactory<ProfileSectionRequestTypes.update_name>(
        profileRouteValidatorSchemas.update_name,
        async (req) => req.params.nickname,
    ),
    update_bio: validatorMiddlewareFactory<ProfileSectionRequestTypes.update_bio>(
        profileRouteValidatorSchemas.update_bio,
        async (req) => req.body.bio,
    ),
};
