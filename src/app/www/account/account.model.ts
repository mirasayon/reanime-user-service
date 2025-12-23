import { prisma } from "#/databases/providers/database-connect.js";
import { NotFoundException } from "#/errors/client-side-exceptions.js";
import { UnexpectedInternalServerErrorException } from "#/errors/server-side-exceptions.js";
import type { iAccountEmail, iAccountUsername, iObjectCuid, TokenSelector } from "#/shared/types/inputs/informative.types.js";
import type { Argon2idHashResult } from "#/utilities/services/hash-passwords.service.js";
import type { AccountPassword, LoginSession, ProfileAvatarPicture, ProfileCoverPicture, UserAccount, UserProfile } from "[orm]/client.js";
export type ProfileWithCoverAndAvatarData = UserProfile & { cover: ProfileCoverPicture | null } & { avatar: ProfileAvatarPicture | null };
class AccountModelClass {
    Get_account_by_its_id_throw_error = async (account_id: iObjectCuid): Promise<UserAccount> => {
        const found_account = await prisma.userAccount.findUnique({
            where: {
                id: account_id,
            },
        });
        if (!found_account) {
            throw new NotFoundException(["Аккаунт с таким айди не найден"]);
        }

        return found_account;
    };

    getPasswordDataFromAccountId = async (account_id: iObjectCuid): Promise<AccountPassword> => {
        const found_account = await prisma.accountPassword.findUnique({
            where: {
                for_account_id: account_id,
            },
        });
        if (!found_account) {
            throw new NotFoundException(["Аккаунт с таким айди не найден"]);
        }

        return found_account;
    };
    Get_account_by_email_throw_error = async (account_email: iAccountEmail) => {
        const found_account = await prisma.userAccount.findUnique({
            where: {
                email: account_email,
            },
        });
        if (!found_account) {
            throw new NotFoundException(["Аккаунт с такой почтой не найден"]);
        }
        return found_account;
    };
    Get_account_by_email_No_Throw_Error = async (account_email: iAccountEmail) => {
        const found_account = await prisma.userAccount.findUnique({
            where: {
                email: account_email,
            },
        });
        return found_account;
    };
    get_account_by_its_username_no_throw_error = async (username: iAccountUsername) => {
        const found_user = await prisma.userAccount.findUnique({
            where: {
                username,
            },
        });
        if (!found_user) {
            return null;
        }
        return found_user;
    };

    get_account_by_its_username_Throw_error = async (username: iAccountUsername) => {
        const found_user = await prisma.userAccount.findUnique({
            where: {
                username,
            },
        });
        if (!found_user) {
            throw new NotFoundException(["Аккаунт с таким юзернеймом не существует"]);
        }
        return found_user;
    };

    update_email_for_one = async (account_id: iObjectCuid, new_email: iAccountEmail) => {
        return await prisma.userAccount.update({
            where: {
                id: account_id,
            },
            data: {
                email: new_email,
            },
        });
    };

    update_password_hash_account = async ({
        account_id,
        hashResult,
        password_id,
    }: {
        hashResult: Argon2idHashResult;
        account_id: iObjectCuid;
        password_id: string;
    }) => {
        return await prisma.accountPassword.update({
            where: {
                for_account_id: account_id,
                id: password_id,
            },
            data: {
                ...hashResult,
            },
        });
    };

    update_username_for_account = async (account_id: iObjectCuid, username: iAccountEmail) => {
        return await prisma.userAccount.update({
            where: {
                id: account_id,
            },
            data: {
                username,
            },
        });
    };

    /** SESSION */
    find_all_sessions_by_account_id = async (account_id: iObjectCuid) => {
        return await prisma.loginSession.findMany({
            where: {
                by_account_id: account_id,
            },
        });
    };
    find_one_session_by_its_selector = async (selector: TokenSelector): Promise<LoginSession> => {
        const found_session = await prisma.loginSession.findUnique({
            where: {
                selector,
            },
        });
        if (!found_session) {
            throw new NotFoundException(["Сессия с таким токеном не найден. Проверьте токен сеанса"]);
        }

        return found_session;
    };

    delete_one_session_by_its_token = async (selector: TokenSelector) => {
        return await prisma.loginSession.delete({
            where: {
                selector,
            },
        });
    };

    find_profile_by_account_id = async (account_id: iObjectCuid): Promise<UserProfile> => {
        const found_profile = await prisma.userProfile.findUnique({
            where: { by_account_id: account_id },
        });
        if (!found_profile) {
            throw new UnexpectedInternalServerErrorException(
                "UserProfile not found with this account id: " + account_id,
                this.find_profile_by_account_id.name,
            );
        }
        return found_profile;
    };

    find_profile_by_account_id_with_data_about_cover_and_avatar = async (account_id: iObjectCuid): Promise<ProfileWithCoverAndAvatarData> => {
        const found_profile = await prisma.userProfile.findUnique({
            where: { by_account_id: account_id },
            include: { cover: true, avatar: true },
        });
        if (!found_profile) {
            throw new UnexpectedInternalServerErrorException(
                "UserProfile not found with this account id: " + account_id,
                this.find_profile_by_account_id_with_data_about_cover_and_avatar.name,
            );
        }
        return found_profile;
    };
    delete_account_by_its_id = async (account_id: iObjectCuid) => {
        return await prisma.userAccount.delete({
            where: {
                id: account_id,
            },
        });
    };

    delete_many_sessions_except_for_one = async (ids: string[], keepId: string) => {
        const deleted_sessions = await prisma.loginSession.deleteMany({
            where: {
                AND: [{ id: { in: ids } }, { id: { not: keepId } }],
            },
        });
        return deleted_sessions;
    };

    delete_one_session_by_id = async (id: string): Promise<LoginSession> => {
        const deleted_session = await prisma.loginSession.delete({
            where: {
                id,
            },
        });
        return deleted_session;
    };
}
export const Account_Model = new AccountModelClass();
