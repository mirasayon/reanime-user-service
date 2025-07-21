import { vmfactory } from "#/utils/validators/factory.js";
import type { Request_dto_auth as _ } from "[T]/request_with_dto.js";
import { Types, profile_schemas as schemas } from "@xamarin.city/reanime/user-service/validators/profile.js";

namespace rd {
    export type update_name = _<Types.Inputs.update_name>;
    export type update_bio = _<Types.Inputs.update_bio>;
    export type view_my_profile = _<Types.Inputs.view_my_profile>;
    export type set_avatar = _<Types.Inputs.set_avatar>;
    export type update_avatar = _<Types.Inputs.update_avatar>;
    export type delete_avatar = _<Types.Inputs.delete_avatar>;
    export type explore_the_user = _<Types.Inputs.explore_the_user, { username: string }>;
}
export type { rd as Profile_ReqDtos };

export const Profile_ReqPipes = new (class Profile_ReqPipes {
    explore_the_profile = vmfactory<rd.explore_the_user>(schemas.explore_the_user, async (req) => req.params.username);
    view_my_profile = vmfactory<rd.view_my_profile>(schemas.view_my_profile);

    set_avatar = vmfactory<rd.set_avatar>(schemas.set_avatar);
    delete_avatar = vmfactory<rd.delete_avatar>(schemas.delete_avatar);
    update_avatar = vmfactory<rd.update_avatar>(schemas.update_avatar);

    update_nickname = vmfactory<rd.update_name>(schemas.update_name, async (req) => req.body.nickname);

    update_bio = vmfactory<rd.update_bio>(schemas.update_bio, async (req) => req.body.bio);
})();
