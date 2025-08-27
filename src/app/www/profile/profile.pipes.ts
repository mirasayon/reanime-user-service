import { vmfactory } from "#/utils/validators/factory.js";
import type { Request_dto_auth as _ } from "#/types/dto-middleware-shape.js";
import { type dto, profile_schemas as schemas } from "&/validators/profile.js";

namespace rd {
    export type update_name = _<dto.update_name>;
    export type update_bio = _<dto.update_bio>;
    export type my_profile = _<dto.my_profile>;
    export type set_avatar = _<dto.set_avatar>;
    export type update_avatar = _<dto.update_avatar>;
    export type delete_avatar = _<dto.delete_avatar>;
    export type other_profiles = _<dto.other_profiles, { username: string }>;
}
export type { rd as Profile_ReqDtos };

export const Profile_ReqPipes = new (class Profile_ReqPipes {
    other_profiles = vmfactory<rd.other_profiles>(schemas.other_profiles, async (req) => req.params.username);
    my_profile = vmfactory<rd.my_profile>(schemas.my_profile);

    set_avatar = vmfactory<rd.set_avatar>(schemas.set_avatar);
    delete_avatar = vmfactory<rd.delete_avatar>(schemas.delete_avatar);
    update_avatar = vmfactory<rd.update_avatar>(schemas.update_avatar);

    update_nickname = vmfactory<rd.update_name>(schemas.update_name, async (req) => req.body.nickname);

    update_bio = vmfactory<rd.update_bio>(schemas.update_bio, async (req) => req.body.bio);
})();

