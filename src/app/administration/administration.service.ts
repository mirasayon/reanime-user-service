import { UnauthorizedException } from "#src/errors/client-side-exceptions.ts";
import { AccountTypeEnum } from "#orm";
import { accountSectionModels } from "#src/app/user-account/user-account.model.ts";
import { administratorSectionModel } from "./administration.model.ts";
import type { ResponseTypesForAdministratorSection } from "#src/shared/user-service-response-types-for-all.routes.ts";
class AdminSectionService {
    get_all_users = async (account_id: string): Promise<ResponseTypesForAdministratorSection["get_all_users"]> => {
        const found_user = await accountSectionModels.Get_account_by_its_id_throw_error(account_id);
        if (found_user.account_type === AccountTypeEnum.ADMIN) {
            const found_all_users = await administratorSectionModel.get_all_accounts_and_its_profiles();
            return found_all_users.map((u) => {
                return {
                    id: u.account.id,
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
                } satisfies ResponseTypesForAdministratorSection["get_all_users"][number];
            });
        } else {
            throw new UnauthorizedException();
        }
    };
}
/** UserAccount Service */
export const AdministrationSectionService = new AdminSectionService();
