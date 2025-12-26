import type { LoginSession, UserAccount } from "../../databases/orm/client.js";

/** Response types for account section */
export namespace ResponseTypesFor_Account_Section {
    export type explore_me = UserAccount;
    export type update_email = UserAccount;
    export type set_email = boolean;
    export type update_password = boolean;
    export type update_username = boolean;
    export type get_sessions = LoginSession[];
    export type delete_all_other_sessions = number;
    export type terminate_specific_session = boolean;
    export type delete_account = boolean;
}
