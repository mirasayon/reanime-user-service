import type { ProfileAvatarPicture, UserAccount, UserProfile } from "../../databases/orm/client.js";

/** Типы ответов для маршрута профиля */
export namespace ResponseTypesFor_UserProfile_Section {
    export type view_other_profiles = {
        account: UserAccount;
        profile: UserProfile;
        avatar: ProfileAvatarPicture | null;
    };
    export type update_nickname = boolean;
    export type update_bio = boolean;
    export type view_my_profile = {
        account: UserAccount;
        profile: UserProfile & { avatar: ProfileAvatarPicture | null };
    };
}
