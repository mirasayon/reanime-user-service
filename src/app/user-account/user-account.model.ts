import { prisma } from "#src/provider/database-connector.ts";
import { NotFoundException } from "#src/errors/client-side-exceptions.ts";
import { UnexpectedInternalServerErrorException } from "#src/errors/server-side-exceptions.ts";
import type { Argon2idHashResultType } from "#src/utilities/cryptography-services/hash-passwords.service.ts";
import type { AccountPassword, LoginSession, ProfileAvatarPicture, ProfileCoverPicture, UserAccount, UserProfile } from "#orm";
export type ProfileWithCoverAndAvatarData = UserProfile & { cover: ProfileCoverPicture | null } & { avatar: ProfileAvatarPicture | null };
class AccountSectionModelsClass {
    Get_account_by_its_id_throw_error = async (account_id: string): Promise<UserAccount> => {
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

    getPasswordDataFromAccountId = async (account_id: string): Promise<AccountPassword> => {
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
    Get_account_by_email_throw_error = async (account_email: string) => {
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
    Get_account_by_email_No_Throw_Error = async (account_email: string) => {
        const found_account = await prisma.userAccount.findUnique({
            where: {
                email: account_email,
            },
        });
        return found_account;
    };
    get_account_by_its_username_no_throw_error = async (username: string) => {
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

    get_account_by_its_username_Throw_error = async (username: string) => {
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

    update_email_for_one = async (account_id: string, new_email: string) => {
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
        hashResult: Argon2idHashResultType;
        account_id: string;
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

    update_username_for_account = async (account_id: string, username: string) => {
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
    find_all_sessions_by_account_id = async (account_id: string) => {
        return await prisma.loginSession.findMany({
            where: {
                by_account_id: account_id,
            },
        });
    };
    find_one_session_by_its_selector = async (selector: string): Promise<LoginSession> => {
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

    delete_one_session_by_its_token = async (selector: string) => {
        return await prisma.loginSession.delete({
            where: {
                selector,
            },
        });
    };

    find_profile_by_account_id = async (account_id: string): Promise<UserProfile> => {
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

    find_profile_by_account_id_with_data_about_cover_and_avatar = async (account_id: string): Promise<ProfileWithCoverAndAvatarData> => {
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
    delete_account_by_its_id = async (account_id: string) => {
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
export const accountSectionModels = new AccountSectionModelsClass();
