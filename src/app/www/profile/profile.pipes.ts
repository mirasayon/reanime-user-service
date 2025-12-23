import { vmFactory } from "#/utilities/validator-middleware-factory.js";
import type { Request_dto_auth as _ } from "#/types/dto-middleware-shape.js";
import { type dto, profile_schemas as schemas } from "#/shared/validators/profile.validator.routes.js";

namespace rd {
    export type update_name = _<dto.update_name, { nickname: string }>;
    export type update_bio = _<dto.update_bio>;
    export type my_profile = _<dto.my_profile>;
    export type avatar_view = _<dto.avatar_view, { username: string }>;
    export type set_avatar = _<dto.set_avatar>;
    export type update_avatar = _<dto.update_avatar>;
    export type delete_avatar = _<dto.delete_avatar>;
    export type other_profiles = _<dto.other_profiles, { username: string }>;
}
export type { rd as Profile_ReqDtos };

export const Profile_ReqPipes = new (class Profile_ReqPipes {
    other_profiles = vmFactory<rd.other_profiles>(schemas.other_profiles, async (req) => req.params.username);
    my_profile = vmFactory<rd.my_profile>(schemas.my_profile);
    set_avatar = vmFactory<rd.set_avatar>(schemas.set_avatar);
    delete_avatar = vmFactory<rd.delete_avatar>(schemas.delete_avatar);
    update_avatar = vmFactory<rd.update_avatar>(schemas.update_avatar);
    avatar_view = vmFactory<rd.avatar_view>(schemas.avatar_view, async (req) => req.params.username);
    update_nickname = vmFactory<rd.update_name>(schemas.update_name, async (req) => req.params.nickname);
    update_bio = vmFactory<rd.update_bio>(schemas.update_bio, async (req) => req.body.bio);
})();
