import { invalidCredentialsErrorMessage } from "#/constants/frequent-errors.js";
import { prisma } from "#/databases/provider/database-connector.js";
import { NotFoundException, UnauthorizedException } from "#/errors/client-side-exceptions.js";
import type { Argon2idHashResultType } from "#/utilities/cryptography-services/hash-passwords.service.js";
import type { AccountPassword, LoginSession, UserAccount } from "[orm]/client.js";

class AuthenticationRouteModelClass {
    getPasswordDataFromAccountId = async (account_id: string): Promise<AccountPassword> => {
        const found_password = await prisma.accountPassword.findUnique({
            where: {
                for_account_id: account_id,
            },
        });
        if (!found_password) {
            throw new NotFoundException();
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
    findSessionByItsSelector = async (selector: string): Promise<LoginSession> => {
        const session = await prisma.loginSession.findUnique({
            where: { selector: selector },
        });
        if (!session) {
            throw new UnauthorizedException();
        }
        return session;
    };

    delete_one_session_by_its_selector = async (selector: string) => {
        return await prisma.loginSession.delete({
            where: { selector },
        });
    };

    findSessionByItsId = async (session_id: string): Promise<LoginSession> => {
        const session = await prisma.loginSession.findUnique({
            where: { id: session_id },
        });
        if (!session) {
            throw new UnauthorizedException();
        }
        return session;
    };

    create_user_session = async (
        data: Omit<LoginSession, "id" | "updated_at" | "last_used_at" | "validator_version" | "device_hash" | "location_updated_at">,
    ) => {
        const new_session = await prisma.loginSession.create({
            data: {
                by_account_id: data.by_account_id,
                expires_at: data.expires_at,
                selector: data.selector,
                hashed_validator: data.hashed_validator,
                created_at: data.created_at,
                last_used_at: data.created_at,
                ip_address: data.ip_address,
                user_agent: data.user_agent,
                browser: data.browser,
                browser_version: data.browser_version,
                device_type: data.device_type,
                device_model: data.device_model,
                os: data.os,
                os_version: data.os_version,
                ip_country: data.ip_country,
                ip_region: data.ip_region,
                ip_city: data.ip_city,
            },
        });
        return new_session;
    };

    delete_1_session_by_its_selector = async (selector: string) => {
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
            throw new UnauthorizedException([invalidCredentialsErrorMessage]);
        }
        return account;
    };

    get_count_of_sessions_by_account_id = async (by_account_id: string) => {
        return await prisma.loginSession.count({
            where: {
                by_account_id,
            },
        });
    };

    createProfile_Account_Password = async (
        data: { username: string; nickname: string | null; email: string | null },
        passwordHashResult: Argon2idHashResultType,
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
}
export const authenticationRouteModels = new AuthenticationRouteModelClass();
