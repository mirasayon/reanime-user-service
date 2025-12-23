import { vmFactory } from "#/utilities/validator-middleware-factory.js";
import type { Request_dto_auth as _ } from "#/types/dto-middleware-shape.js";
import { type profileRouteValidatorDtos, profileRouteValidatorSchemas as schemas } from "#/shared/validators/profile.validator.routes.js";

namespace rd {
    export type update_name = _<profileRouteValidatorDtos.update_name, { nickname: string }>;
    export type update_bio = _<profileRouteValidatorDtos.update_bio>;
    export type my_profile = _<profileRouteValidatorDtos.my_profile>;
    export type other_profiles = _<profileRouteValidatorDtos.other_profiles, { username: string }>;
}
export type { rd as Profile_ReqDtos };

export const Profile_ReqPipes = new (class Profile_ReqPipes {
    other_profiles = vmFactory<rd.other_profiles>(schemas.other_profiles, async (req) => req.params.username);
    my_profile = vmFactory<rd.my_profile>(schemas.my_profile);
    update_nickname = vmFactory<rd.update_name>(schemas.update_name, async (req) => req.params.nickname);
    update_bio = vmFactory<rd.update_bio>(schemas.update_bio, async (req) => req.body.bio);
})();
