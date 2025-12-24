import { UnauthorizedException } from "#/errors/client-side-exceptions.js";
import type { DbCuidType } from "#/shared/types-shared/informative-input-types-shared.js";
import { AccountTypeEnum, type UserAccount, type UserProfile } from "[orm]/client.js";
import { accountSectionModels } from "#/app/account/account.model.js";
import { Admin_Model } from "./admin.model.js";
/** UserAccount Service */
export const Admin_Service = new (class Account_Service {
    get_all_users = async (account_id: DbCuidType): Promise<(UserAccount & { profile: UserProfile | null })[]> => {
        const found_user = await accountSectionModels.Get_account_by_its_id_throw_error(account_id);
        if (found_user.account_type === AccountTypeEnum.ADMIN) {
            const found_all_users = await Admin_Model.get_all_accounts_and_its_profiles();
            return found_all_users;
        } else {
            throw new UnauthorizedException(["Вы не администратор"]);
        }
    };
})();
