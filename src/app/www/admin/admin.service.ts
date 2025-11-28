import type { iObjectCuid } from "#/shared/types/inputs/informative.types.js";
import { Account_Model } from "[www]/account/account.model.js";
import type { Account, Profile } from "#/databases/orm/client.js";
import { Admin_Model } from "./admin.model.js";
import { UnauthorizedException } from "#/modules/errors/client-side/exceptions.js";
/** Account Service */
export const Admin_Service = new (class Account_Service {
    get_all_users = async (account_id: iObjectCuid): Promise<(Account & { profile: Profile | null })[]> => {
        const found_user = await Account_Model.Get_account_by_its_id_throw_error(account_id);
        if (found_user.username === "mirasayon") {
            const found_all_users = await Admin_Model.get_all_accounts_and_its_profiles();
            return found_all_users;
        } else {
            throw new UnauthorizedException(["Вы не администратор"]);
        }
    };
})();
