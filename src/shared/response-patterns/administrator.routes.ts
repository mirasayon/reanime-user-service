import type { UserAccount, UserProfile } from "[orm]";

/** RESPONSES For Administrator Route */
export namespace Administrator_ResponseTypes {
    export type get_all_users = (UserAccount & { profile: UserProfile | null })[];
}
