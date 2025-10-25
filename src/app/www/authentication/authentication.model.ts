import type { iClientSessionToken, iObjectCuid } from "#/shared/types/inputs/informative.types.js";
import { authentication_Session_Token_Util } from "#/utils/services/session_token.js";
import type { Account, Profile, Session } from "#/databases/orm/client.js";
import { NotFoundException, UnauthorizedException } from "#/modules/errors/client-side/exceptions.js";
import { InternalServerErrorException } from "#/modules/errors/server-side/exceptions.js";
import { prisma } from "#/providers/database-connect.js";

export const Authentication_Model = new (class Authentication_Model {
    constructor() {}
    find_1_session_by_its_token = async (session_token: iClientSessionToken) => {
        return await prisma.session.findUnique({
            where: {
                token: session_token,
            },
        });
    };
    find_account_by_ids_id = async (account_id: string): Promise<Account> => {
        const account = await prisma.account.findUnique({
            where: {
                id: account_id,
            },
        });
        if (!account) {
            throw new NotFoundException(["Аккаунт с таким айди не найден"]);
        }
        return account;
    };
    /** Migrated from account module */
    find_one_session_by_its_token = async (session_token: iClientSessionToken): Promise<Session> => {
        const found_session = await prisma.session.findUnique({
            where: {
                token: session_token,
            },
        });
        if (!found_session) {
            throw new NotFoundException([
                "Сеанс с таким айди не найден. Проверьте токен сеанса. Если вы не аутентифицированы, сначала войдите в систему.",
            ]);
        }

        return found_session;
    };

    /** Migrated from account module */
    delete_one_session_by_its_token = async (session_token: iClientSessionToken) => {
        return await prisma.session.delete({
            where: {
                token: session_token,
            },
        });
    };

    find_session_by_its_token_and_return_also_profile_data__SERVICE_MODEL = async (
        session_token: iClientSessionToken,
    ): Promise<{
        session: Session;
        profile: Profile;
    }> => {
        const session = await prisma.session.findUnique({
            where: { token: session_token },
        });
        if (!session) {
            throw new UnauthorizedException(["Сеанс не найден. Пожалуйста, войдите снова"]);
        }
        const profile = await prisma.profile.findUnique({
            where: {
                by_account_id: session.by_account_id,
            },
        });

        if (!profile) {
            throw new InternalServerErrorException(
                `We cound not find profile that linked to this session and account: ${JSON.stringify({
                    ssession_id: session.id,
                    account_id: session.by_account_id,
                })}`,
                this.find_session_by_its_token_and_return_also_profile_data__SERVICE_MODEL.name,
            );
        }
        return { session, profile };
    };
    create_user_session = async (
        new_account_id: iObjectCuid,
        meta: {
            // name: string | null;
            // email: string | null;
            // username: string;
            ip: string | null;
            agent: string | null;
            // password: string;
        },
    ) => {
        const new_session = await prisma.session.create({
            data: {
                by_account_id: new_account_id,
                token: authentication_Session_Token_Util.create_session_token(new_account_id),
                ip_address: meta.ip,
                user_agent: meta.agent,
            },
        });
        return new_session;
    };

    delete_1_session_by_its_token = async (session_token: iClientSessionToken) => {
        return await prisma.session.delete({
            where: {
                token: session_token,
            },
        });
    };

    find_1_account_by_username = async (username: string): Promise<Account | null> => {
        return await prisma.account.findUnique({
            where: {
                username,
            },
        });
    };

    find_1_account_by_username_and_return_ID = async (username: string): Promise<Account["id"] | null> => {
        const found = await prisma.account.findUnique({
            where: {
                username,
            },
            select: {
                id: true,
            },
        });
        if (!found) {
            return null;
        }
        return found.id;
    };

    find_1_account_by_email_throw_error = async (email: string): Promise<Account> => {
        const account = await prisma.account.findUnique({
            where: {
                email,
            },
        });
        if (!account) {
            throw new UnauthorizedException(["Неправильный пароль или почта"]);
        }
        return account;
    };

    get_count_of_sessions_by_account_id = async (by_account_id: iObjectCuid) => {
        return await prisma.session.count({
            where: {
                by_account_id,
            },
        });
    };

    create_account_and_profile = async (data: { username: string; password_hash: string; nickname: string | null; email: string | null }) => {
        return await prisma.account.create({
            data: {
                username: data.username,
                email: data.email,
                password_hash: data.password_hash,
                profile: {
                    create: {
                        nickname: data.nickname,
                    },
                },
            },
            include: {
                profile: true,
            },
        });
    };
})();
