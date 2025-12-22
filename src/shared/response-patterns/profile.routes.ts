import type { ProfileAvatarPicture, UserAccount, UserProfile } from "../../databases/orm/client.js";

/** RESPONSES For UserProfile Route */
export namespace ResponseTypesForUserProfile {
    export type view_other_profiles = {
        account: UserAccount;
        profile: UserProfile;
        avatar: ProfileAvatarPicture | null;
    };
    /** true if nickname was updated, false if not */
    export type update_nickname = boolean;
    /** true if bio was updated, false if not */
    export type update_bio = boolean;
    export type view_my_profile = {
        account: UserAccount;
        profile: UserProfile & { avatar: ProfileAvatarPicture | null };
    };
    /** true if avatar was set, false if not */
    export type set_avatar = boolean;
    /** true if avatar was deleted, false if not */
    export type delete_avatar = boolean;
    /** true if avatar was updated, false if not */
    export type update_avatar = boolean;
}
