import type { Account, Profile } from "../../databases/orm/client.js";

/** RESPONSES For Administrator Route */
export namespace Administrator_ResponseTypes {
    export type get_all_users = (Account & { profile: Profile | null })[];
}
