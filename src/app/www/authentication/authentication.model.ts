import { prisma } from "#/databases/providers/database-connect.js";
import { NotFoundException, UnauthorizedException } from "#/errors/client-side-exceptions.js";
import { UnexpectedInternalServerErrorException } from "#/errors/server-side-exceptions.js";
import type { TokenSelector, iObjectCuid } from "#/shared/types/inputs/informative.types.js";
import type { Argon2idHashResult } from "#/utilities/services/hash-passwords.service.js";
import { sessionTokenHashService, type CreateSessionTokenType } from "#/utilities/services/hash-token-sessions.service.js";
import type { AccountPassword, LoginSession, UserAccount, UserProfile } from "[orm]/client.js";

export const authModels = new (class Authentication_Model {
    find_1_session_by_its_selector = async (selector: TokenSelector) => {
        return await prisma.loginSession.findUnique({
            where: { selector },
        });
    };
    getPasswordDataFromAccountId = async (account_id: iObjectCuid): Promise<AccountPassword> => {
        const found_password = await prisma.accountPassword.findUnique({
            where: {
                for_account_id: account_id,
            },
        });
        if (!found_password) {
            throw new NotFoundException(["Аккаунт с таким айди не найден"]);
        }

        return found_password;
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
    find_one_session_by_its_selector = async (selector: TokenSelector): Promise<LoginSession> => {
        const found_session = await prisma.loginSession.findUnique({
            where: {
                selector,
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
    delete_one_session_by_its_selector = async (selector: TokenSelector) => {
        return await prisma.loginSession.delete({
            where: { selector },
        });
    };

    find_session_by_its_selector_and_return_also_profile_data = async (
        selector: TokenSelector,
    ): Promise<{
        session: LoginSession;
        profile: UserProfile;
    }> => {
        const session = await prisma.loginSession.findUnique({
            where: { selector: selector },
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
                service_name: this.find_session_by_its_selector_and_return_also_profile_data.name,
                errorMessageToClient: "Ошибка сервера. Не удалось найти сессию.",
                errorItselfOrPrivateMessageToServer: `We couldn't find profile that linked to this session and account: ${JSON.stringify({
                    session_id: session.id,
                    account_id: session.by_account_id,
                })}`,
            });
        }
        return { session, profile };
    };
    create_user_session = async ({
        new_account_id,
        ip_address,
        user_agent,
        token,
    }: {
        new_account_id: iObjectCuid;
        ip_address: string | null;
        user_agent: string | null;
        token: CreateSessionTokenType;
    }) => {
        const new_session = await prisma.loginSession.create({
            data: {
                by_account_id: new_account_id,
                expires_at: token.expires_at,
                selector: token.selector,
                hashed_validator: token.hashed_validator,
                created_at: token.created_at,
                last_used_at: token.created_at,
                ip_address: ip_address,
                user_agent: user_agent,
            },
        });
        return new_session;
    };

    delete_1_session_by_its_selector = async (selector: TokenSelector) => {
        return await prisma.loginSession.delete({
            where: {
                selector: selector,
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

    createProfile_Account_Password = async (
        data: { username: string; nickname: string | null; email: string | null },
        passwordHashResult: Argon2idHashResult,
    ) => {
        return await prisma.userAccount.create({
            data: {
                username: data.username,
                email: data.email,
                profile: {
                    create: {
                        nickname: data.nickname,
                    },
                },
                password_data: {
                    create: {
                        ...passwordHashResult,
                    },
                },
            },
            include: {
                profile: true,
            },
        });
    };
})();
