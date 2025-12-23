import { vmFactory } from "#/utilities/validator-middleware-factory.js";
import type { Request_dto_auth as _ } from "#/types/dto-middleware-shape.js";
import { type mediaRouteValidatorDtos, mediaRouteValidatorSchemas as schemas } from "#/shared/validators/media.validator.routes.js";

namespace rd {
    export type avatar_view = _<mediaRouteValidatorDtos.avatar_view, { username: string }>;
    export type set_avatar = _<mediaRouteValidatorDtos.set_avatar>;
    export type update_avatar = _<mediaRouteValidatorDtos.update_avatar>;
    export type delete_avatar = _<mediaRouteValidatorDtos.delete_avatar>;
}
export type { rd as MediaRoutePipeDtos };

export const mediaRoutePipesMiddlewares = new (class Profile_ReqPipes {
    set_avatar = vmFactory<rd.set_avatar>(schemas.set_avatar);
    delete_avatar = vmFactory<rd.delete_avatar>(schemas.delete_avatar);
    update_avatar = vmFactory<rd.update_avatar>(schemas.update_avatar);
    avatar_view = vmFactory<rd.avatar_view>(schemas.avatar_view, async (req) => req.params.username);
})();
