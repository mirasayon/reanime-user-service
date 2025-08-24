import { prisma } from "#/db/connect.js";
import type { Account, Profile, Session } from "#/db/orm/client.js";
import { NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import type { AccountEmail, AccountUsername, ClientSessionToken, ObjectCuid } from "#/shared/types/inputs/infotype.js";
import { InternalServerErrorException } from "#/modules/errors/server-side/exceptions.js";

export const Account_Model = new (class Account_Model {
    Get_account_by_its_id_throw_error = async (account_id: ObjectCuid): Promise<Account> => {
        const found_account = await prisma.account.findUnique({
            where: {
                id: account_id,
            },
        });
        if (!found_account) {
            throw new NotFoundException(["Аккаунт с таким айди не найден"]);
        }

        return found_account;
    };

    Get_account_by_email_throw_error = async (account_email: AccountEmail) => {
        const found_accound = await prisma.account.findUnique({
            where: {
                email: account_email,
            },
        });
        if (!found_accound) {
            throw new NotFoundException(["Аккаунт с такой почтой не найден"]);
        }
        return found_accound;
    };
    Get_account_by_email_No_Throw_Error = async (account_email: AccountEmail) => {
        const found_account = await prisma.account.findUnique({
            where: {
                email: account_email,
            },
        });
        return found_account;
    };
    get_account_by_its_username_no_throw_error = async (username: AccountUsername) => {
        const found_user = await prisma.account.findUnique({
            where: {
                username,
            },
        });
        if (!found_user) {
            return null;
        }
        return found_user;
    };

    get_account_by_its_username_Throw_error = async (username: AccountUsername) => {
        const found_user = await prisma.account.findUnique({
            where: {
                username,
            },
        });
        if (!found_user) {
            throw new NotFoundException(["Аккаунт с таким юзернеймом не существует"]);
        }
        return found_user;
    };

    update_email_for_one = async (account_id: ObjectCuid, new_email: AccountEmail) => {
        return await prisma.account.update({
            where: {
                id: account_id,
            },
            data: {
                email: new_email,
            },
        });
    };

    update_password_hash_account = async (account_id: ObjectCuid, password_hash: AccountEmail) => {
        return await prisma.account.update({
            where: {
                id: account_id,
            },
            data: {
                password_hash,
            },
        });
    };

    update_username_for_account = async (account_id: ObjectCuid, username: AccountEmail) => {
        return await prisma.account.update({
            where: {
                id: account_id,
            },
            data: {
                username,
            },
        });
    };

    /** SESSION */
    find_all_sessions_by_account_id = async (account_id: ObjectCuid) => {
        return await prisma.session.findMany({
            where: {
                by_account_id: account_id,
            },
        });
    };
    find_one_session_by_its_token = async (session_token: ClientSessionToken): Promise<Session> => {
        const found_session = await prisma.session.findUnique({
            where: {
                token: session_token,
            },
        });
        if (!found_session) {
            throw new NotFoundException(["Сеанс с таким айди не найден. Проверьте токен сеанса"]);
        }

        return found_session;
    };

    delete_one_session_by_its_token = async (session_token: ClientSessionToken) => {
        return await prisma.session.delete({
            where: {
                token: session_token,
            },
        });
    };
    /** END SESSION */

    find_profile_by_account_id = async (by_account_id: ObjectCuid): Promise<Profile> => {
        const found_profile = await prisma.profile.findUnique({
            where: { by_account_id },
        });
        if (!found_profile) {
            throw new InternalServerErrorException("Ошибка сервера. Попробуйте позже");
        }
        return found_profile;
    };

    delete_account_by_its_id = async (account_id: ObjectCuid) => {
        return await prisma.account.delete({
            where: {
                id: account_id,
            },
        });
    };

    delete_many_sessions_except_for_one = async (ids: string[], keepId: string) => {
        const deleted_sessions = await prisma.session.deleteMany({
            where: {
                AND: [{ id: { in: ids } }, { id: { not: keepId } }],
            },
        });
        return deleted_sessions;
    };
})();

