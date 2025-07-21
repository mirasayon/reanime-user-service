import { prisma as db } from "#/db/connect.js";
import type { Account, Profile, Session } from "#/db/orm/client.js";
import { NotFoundException } from "@xamarin.city/reanime/user-service/errors/client-side/exceptions.js";
import type { infotype } from "[T]/informative.js";

export const Account_Model = new (class Account_Model {
    Get_account_by_its_id_throw_error = async (user_id: infotype.Cuid): Promise<Account> => {
        const found_user = await db.account.findUnique({
            where: {
                id: user_id,
            },
        });
        if (!found_user) {
            throw new NotFoundException(["Пользователь с таким идентификатором не найден"]);
        }

        return found_user;
    };

    Get_account_by_email_throw_error = async (user_email: infotype.Email) => {
        const found_user = await db.account.findUnique({
            where: {
                email: user_email,
            },
        });
        if (!found_user) {
            throw new NotFoundException(["Пользователь с таким адресом электронной почты не найден"]);
        }
        return found_user;
    };
    Get_account_by_email_No_Throw_Error = async (user_email: infotype.Email) => {
        const found_user = await db.account.findUnique({
            where: {
                email: user_email,
            },
        });
        return found_user;
    };
    get_account_by_its_username_no_throw_error = async (username: infotype.Username) => {
        const found_user = await db.account.findUnique({
            where: {
                username,
            },
        });
        if (!found_user) {
            return null;
        }
        return found_user;
    };

    get_account_by_its_username_Throw_error = async (username: infotype.Username) => {
        const found_user = await db.account.findUnique({
            where: {
                username,
            },
        });
        if (!found_user) {
            throw new NotFoundException(["Аккаунт с таким именем ползователя не существует"]);
        }
        return found_user;
    };

    update_email_for_one = async (account_id: infotype.Cuid, new_email: infotype.Email) => {
        return await db.account.update({
            where: {
                id: account_id,
            },
            data: {
                email: new_email,
            },
        });
    };

    update_password_hash_account = async (account_id: infotype.Cuid, password_hash: infotype.Email) => {
        return await db.account.update({
            where: {
                id: account_id,
            },
            data: {
                password_hash,
            },
        });
    };

    update_username_for_account = async (account_id: infotype.Cuid, username: infotype.Email) => {
        return await db.account.update({
            where: {
                id: account_id,
            },
            data: {
                username,
            },
        });
    };

    /** SESSION */
    find_all_sessions_by_account_id = async (account_id: infotype.Cuid) => {
        return await db.session.findMany({
            where: {
                by_account_id: account_id,
            },
        });
    };
    find_one_session_by_its_token = async (session_token: infotype.session_token): Promise<Session> => {
        const found_session = await db.session.findUnique({
            where: {
                token: session_token,
            },
        });
        if (!found_session) {
            throw new NotFoundException(["Сеанс с таким идентификатором не найден. Проверьте токен сеанса"]);
        }

        return found_session;
    };

    delete_one_session_by_its_token = async (session_token: infotype.session_token) => {
        return await db.session.delete({
            where: {
                token: session_token,
            },
        });
    };
    /** END SESSION */

    find_profile_by_account_id = async (by_account_id: infotype.Cuid): Promise<Profile> => {
        const found_profile = await db.profile.findUnique({
            where: { by_account_id },
        });
        if (!found_profile) {
            throw new NotFoundException([
                "Профиль этого аккаунта не найден. Невозможно удалить пользователя, у которого нет профиля",
            ]);
        }
        return found_profile;
    };

    delete_account_by_its_id = async (account_id: infotype.Cuid) => {
        return await db.account.delete({
            where: {
                id: account_id,
            },
        });
    };

    delete_many_sessions_except_for_one = async (ids: string[], keepId: string) => {
        const deleted_sessions = await db.session.deleteMany({
            where: {
                AND: [{ id: { in: ids } }, { id: { not: keepId } }],
            },
        });
        return deleted_sessions;
    };
})();
