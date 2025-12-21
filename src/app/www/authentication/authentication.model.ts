import { prisma } from "#/databases/providers/database-connect.js";
import { NotFoundException, UnauthorizedException } from "#/errors/client-side-exceptions.js";
import { UnexpectedInternalServerErrorException } from "#/errors/server-side-exceptions.js";
import type { TokenSelector, iObjectCuid } from "#/shared/types/inputs/informative.types.js";
import { sessionTokenHashService } from "#/utilities/services/session_token.js";
import type { LoginSession, UserAccount, UserProfile } from "[orm]";

export const authModels = new (class Authentication_Model {
    find_1_session_by_its_token = async (session_token: TokenSelector) => {
        return await prisma.loginSession.findUnique({
            where: {
                token: session_token,
            },
        });
    };
    find_account_by_ids_id = async (account_id: string): Promise<UserAccount> => {
        const account = await prisma.userAccount.findUnique({
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
    find_one_session_by_its_token = async (session_token: TokenSelector): Promise<LoginSession> => {
        const found_session = await prisma.loginSession.findUnique({
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
    delete_one_session_by_its_token = async (session_token: TokenSelector) => {
        return await prisma.loginSession.delete({
            where: {
                token: session_token,
            },
        });
    };

    find_session_by_its_token_and_return_also_profile_data__SERVICE_MODEL = async (
        session_token: TokenSelector,
    ): Promise<{
        session: LoginSession;
        profile: UserProfile;
    }> => {
        const session = await prisma.loginSession.findUnique({
            where: { token: session_token },
        });
        if (!session) {
            throw new UnauthorizedException(["Сеанс не найден. Пожалуйста, войдите снова"]);
        }
        const profile = await prisma.userProfile.findUnique({
            where: {
                by_account_id: session.by_account_id,
            },
        });
        if (!profile) {
            throw new UnexpectedInternalServerErrorException({
                service_name: this.find_session_by_its_token_and_return_also_profile_data__SERVICE_MODEL.name,
                errorMessageToClient: "Ошибка сервера. Не удалось найти сессию.",
                errorItselfOrPrivateMessageToServer: `We couldn't find profile that linked to this session and account: ${JSON.stringify({
                    session_id: session.id,
                    account_id: session.by_account_id,
                })}`,
            });
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
        const new_session = await prisma.loginSession.create({
            data: {
                by_account_id: new_account_id,
                token: sessionTokenHashService.create_session_token(new_account_id),
                ip_address: meta.ip,
                user_agent: meta.agent,
            },
        });
        return new_session;
    };

    delete_1_session_by_its_token = async (session_token: TokenSelector) => {
        return await prisma.loginSession.delete({
            where: {
                token: session_token,
            },
        });
    };

    find_1_account_by_username = async (username: string): Promise<UserAccount | null> => {
        return await prisma.userAccount.findUnique({
            where: {
                username,
            },
        });
    };

    find_1_account_by_username_and_return_ID = async (username: string): Promise<UserAccount["id"] | null> => {
        const found = await prisma.userAccount.findUnique({
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

    find_1_account_by_email_throw_error = async (email: string): Promise<UserAccount> => {
        const account = await prisma.userAccount.findUnique({
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
        return await prisma.loginSession.count({
            where: {
                by_account_id,
            },
        });
    };

    create_account_and_profile = async (data: { username: string; password_hash: string; nickname: string | null; email: string | null }) => {
        return await prisma.userAccount.create({
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
