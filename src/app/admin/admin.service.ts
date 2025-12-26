import { UnauthorizedException } from "#/errors/client-side-exceptions.js";
import type { DbCuidType } from "#/shared/types/informative-input-types-shared.js";
import { AccountTypeEnum } from "[orm]/client.js";
import { accountSectionModels } from "#/app/account/account.model.js";
import { adminSectionModel } from "./admin.model.js";
import type { ResponseTypesForAdministratorSection } from "#/shared/types/user-service-response-types-for-all.routes.js";
/** UserAccount Service */
export const Admin_Service = new (class Account_Service {
    get_all_users = async (account_id: DbCuidType): Promise<ResponseTypesForAdministratorSection.get_all_users> => {
        const found_user = await accountSectionModels.Get_account_by_its_id_throw_error(account_id);
        if (found_user.account_type === AccountTypeEnum.ADMIN) {
            const found_all_users = await adminSectionModel.get_all_accounts_and_its_profiles();
            return found_all_users.map((u) => {
                return {
                    email: u.account.email,
                    username: u.account.username,
                    created_at: u.account.created_at,
                    updated_at: u.account.updated_at,
                    account_type: u.account.account_type,
                    bio: u.profile.bio,
                    nickname: u.profile.nickname,
                    avatar: u.avatar
                        ? {
                              path_dirname: u.avatar.path_dirname,
                              path_filename: u.avatar.path_filename,
                          }
                        : null,
                } satisfies ResponseTypesForAdministratorSection.get_all_users[number];
            });
        } else {
            throw new UnauthorizedException();
        }
    };
})();
