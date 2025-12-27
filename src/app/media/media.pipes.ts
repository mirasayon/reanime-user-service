import { validatorMiddlewareFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { mediaRouteValidatorSchemas, type mediaRouteValidatorDtos } from "#/shared/request-validator-for-all.routes.js";

export namespace MediaRoutePipeDtos {
    export type avatar_view = RequestDtoTypeFactory<mediaRouteValidatorDtos.avatar_view, { username: string }>;
    export type set_avatar = RequestDtoTypeFactory<mediaRouteValidatorDtos.set_avatar>;
    export type update_avatar = RequestDtoTypeFactory<mediaRouteValidatorDtos.update_avatar>;
    export type delete_avatar = RequestDtoTypeFactory<mediaRouteValidatorDtos.delete_avatar>;
}

export const mediaRoutePipesMiddlewares = new (class MediaRoutePipesMiddlewares {
    set_avatar = validatorMiddlewareFactory<MediaRoutePipeDtos.set_avatar>(mediaRouteValidatorSchemas.set_avatar);
    delete_avatar = validatorMiddlewareFactory<MediaRoutePipeDtos.delete_avatar>(mediaRouteValidatorSchemas.delete_avatar);
    update_avatar = validatorMiddlewareFactory<MediaRoutePipeDtos.update_avatar>(mediaRouteValidatorSchemas.update_avatar);
    avatar_view = validatorMiddlewareFactory<MediaRoutePipeDtos.avatar_view>(mediaRouteValidatorSchemas.avatar_view, (req) => req.params.username);
})();
