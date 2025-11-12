import { bcryptjsService } from "#/utils/services/bcrypt.js";
import { Authentication_Model as model } from "[www]/authentication/authentication.model.js";
import type { iClientSessionToken, iObjectCuid } from "#/shared/types/inputs/informative.types.js";
import { BadRequestException, ConflictException, ForbiddenException, UnauthorizedException } from "#/modules/errors/client-side/exceptions.js";
import { UnexpectedInternalServerErrorException } from "#/modules/errors/server-side/exceptions.js";
import { SAME_TIME_SESSIONS_LIMIT } from "#/configs/rules.js";
import type { Account } from "#/databases/orm/client.js";

/**
 * Service class responsible for handling authentication logic.
 */
export const Authentication_Service = new (class Authentication_Service {
    logout = async (session_token: iClientSessionToken, account_id: iObjectCuid) => {
        const found_session = await model.find_one_session_by_its_token(session_token);
        if (found_session.by_account_id !== account_id) {
            throw new UnauthorizedException(["This session token is not yours!"]);
        }
        const deleted_session = await model.delete_one_session_by_its_token(session_token);
        return {
            deleted_session_token: deleted_session.token,
        };
    };

    check_session = async (account_id: string): Promise<{ account: Account }> => {
        const account = await model.find_account_by_ids_id(account_id);
        return { account };
    };

    login_via_username = async ({
        username,
        password,
        ip,
        agent,
    }: {
        username: string;
        password: string;
        ip: string | null;
        agent: string | null;
    }) => {
        const account = await model.find_1_account_by_username(username);
        if (!account) {
            throw new UnauthorizedException(["Неправильный пароль или юзернейм"]);
        }

        const is_correct = await bcryptjsService.compare_raw_to_hash(password, account.password_hash);

        if (!is_correct) {
            throw new UnauthorizedException(["Неправильный пароль или юзернейм"]);
        }

        const sessions_count = await model.get_count_of_sessions_by_account_id(account.id);

        if (sessions_count >= SAME_TIME_SESSIONS_LIMIT) {
            throw new ForbiddenException([`Пользователь не должен иметь более ${SAME_TIME_SESSIONS_LIMIT} активных сессий одновременно`]);
        }

        const session = await model.create_user_session(account.id, {
            // username,
            // password,
            ip,
            agent,
            // email,
            // name
        });

        return { account, session };
    };
    login_via_email = async ({ email, password, ip, agent }: { email: string; password: string; ip: string | null; agent: string | null }) => {
        const account = await model.find_1_account_by_email_throw_error(email);

        const is_correct = await bcryptjsService.compare_raw_to_hash(password, account.password_hash);
        if (!is_correct) {
            throw new UnauthorizedException(["Неправильный пароль или почта"]);
        }

        const sessions_count = await model.get_count_of_sessions_by_account_id(account.id);

        if (sessions_count >= SAME_TIME_SESSIONS_LIMIT) {
            throw new ForbiddenException([`Пользователь не должен иметь более ${SAME_TIME_SESSIONS_LIMIT} активных сессий одновременно`]);
        }

        const session = await model.create_user_session(account.id, {
            // username: account.username,
            // password,
            ip,
            agent,
        });

        return { account, session };
    };

    /**
     * Registers a new account by creating an account, a profile,
     * hashing the password, and initializing a session.
     *
     * @param registration_credentials - Data provided by the account during registration.
     * @returns An object containing the newly created account and their session.
     */
    registration = async ({
        nickname,
        email,
        username,
        ip,
        agent,
        password,
        password_repeat,
    }: {
        nickname: string | null;
        email: string | null;
        username: string;
        ip: string | null;
        agent: string | null;
        password: string;
        password_repeat: string;
    }) => {
        if (password_repeat !== password) {
            throw new BadRequestException(["Пароли не совпадают"]);
        }
        const _credentials = {
            nickname,
            email,
            username,
            ip,
            agent,
            password,
        };
        const candidate = await model.find_1_account_by_username(username);

        if (candidate) {
            throw new ConflictException([`Пользователь с таким именем (${candidate.username}) уже существует. Выберите другое имя пользователя.`]);
        }

        const password_hash = await bcryptjsService.create_hash(password);

        const account = await model.create_account_and_profile({
            ..._credentials,
            password_hash,
        });

        if (!account.profile) {
            throw new UnexpectedInternalServerErrorException({
                errorMessageToClient: "Неожиданная внутренняя ошибка сервера. Попробуйте позже",
                errorItselfOrPrivateMessageToServer: "This account does not have a profile: account_id = " + account.id,
                service_name: this.registration.name,
            });
        }
        const session = await model.create_user_session(account.id, _credentials);
        return { account, session };
    };

    /**
     *
     * @returns `false` if username is used, `true` if available
     */
    check_username_availability = async ({ username }: { username: string }): Promise<boolean> => {
        const candidate = await model.find_1_account_by_username_and_return_ID(username);
        return !!!candidate;
    };
})();
