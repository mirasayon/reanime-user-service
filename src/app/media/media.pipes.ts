import { vmFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory as _ } from "#/types/dto-middleware-shape.js";
import { type mediaRouteValidatorDtos, mediaRouteValidatorSchemas as schemas } from "#/shared/validators-shared/media.validator.routes.js";

export namespace MediaRoutePipeDtos {
    export type avatar_view = _<mediaRouteValidatorDtos.avatar_view, { username: string }>;
    export type set_avatar = _<mediaRouteValidatorDtos.set_avatar>;
    export type update_avatar = _<mediaRouteValidatorDtos.update_avatar>;
    export type delete_avatar = _<mediaRouteValidatorDtos.delete_avatar>;
}

export const mediaRoutePipesMiddlewares = new (class Profile_ReqPipes {
    set_avatar = vmFactory<MediaRoutePipeDtos.set_avatar>(schemas.set_avatar);
    delete_avatar = vmFactory<MediaRoutePipeDtos.delete_avatar>(schemas.delete_avatar);
    update_avatar = vmFactory<MediaRoutePipeDtos.update_avatar>(schemas.update_avatar);
    avatar_view = vmFactory<MediaRoutePipeDtos.avatar_view>(schemas.avatar_view, async (req) => req.params.username);
})();
