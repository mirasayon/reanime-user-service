import type { LoginSession, ProfileAvatarPicture, UserAccount, UserProfile } from "../../databases/orm/client.js";

/** RESPONSES For Auth Route */
export namespace ResponseTypesForAuthentication {
    export type login_via_email = { session: LoginSession; account: UserAccount };
    export type login_via_username = { session: LoginSession; account: UserAccount };
    export type registration = { session: LoginSession; account: UserAccount };
    /** `false` if username is used, `true` if available */
    export type check_username_availability = boolean;
    export type check_session = {
        session: LoginSession;
        profile: UserProfile;
        avatar: ProfileAvatarPicture | null;
        account: UserAccount;
    };
    /**
     * true = success
     *
     * false = error
     */
    export type logout = boolean;
}
