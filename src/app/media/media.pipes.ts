import { validatorMiddlewareFactory } from "#src/utilities/validator-middleware-factory.ts";
import type { RequestDtoTypeFactory } from "#src/types/dto-middleware-shape.ts";
import { mediaRouteValidatorSchemas, type MediaRouteValidationSchemaType } from "#src/shared/request-validator-for-all.routes.ts";

export interface MediaSectionRequestDtoType {
    avatar_view: RequestDtoTypeFactory<MediaRouteValidationSchemaType["avatar_view"], { username: string }>;
    set_avatar: RequestDtoTypeFactory<MediaRouteValidationSchemaType["set_avatar"]>;
    update_avatar: RequestDtoTypeFactory<MediaRouteValidationSchemaType["update_avatar"]>;
    delete_avatar: RequestDtoTypeFactory<MediaRouteValidationSchemaType["delete_avatar"]>;
}

export const mediaRoutePipesMiddlewares = {
    set_avatar: validatorMiddlewareFactory<MediaSectionRequestDtoType["set_avatar"]>(mediaRouteValidatorSchemas.set_avatar),
    delete_avatar: validatorMiddlewareFactory<MediaSectionRequestDtoType["delete_avatar"]>(mediaRouteValidatorSchemas.delete_avatar),
    update_avatar: validatorMiddlewareFactory<MediaSectionRequestDtoType["update_avatar"]>(mediaRouteValidatorSchemas.update_avatar),
    avatar_view: validatorMiddlewareFactory<MediaSectionRequestDtoType["avatar_view"]>(
        mediaRouteValidatorSchemas.avatar_view,
        (req) => req.params.username,
    ),
};
