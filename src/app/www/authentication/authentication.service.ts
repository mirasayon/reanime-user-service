import { bcrypt_service } from "#/utils/services/bcrypt.js";
import { Authentication_Model as model } from "[www]/authentication/authentication.model.js";
import consola from "consola";
import { infotype } from "#/types/informative.js";
import {
    ConflictException,
    ForbiddenException,
    UnauthorizedException,
} from "@xamarin.city/reanime/user-service/errors/client-side/exceptions.js";
import { InternalServerErrorException } from "@xamarin.city/reanime/user-service/errors/server-side/exceptions.js";
import { SAMETIME_SESSIONS_LIMIT } from "#/configs/rules.js";

/**
 * Service class responsible for handling authentication logic.
 */
export const Authentication_Service = new (class Authentication_Service {
    constructor() {}

    logout = async (session_token: infotype.session_token, account_id: infotype.Cuid) => {
        const found_session = await model.find_one_session_by_its_token(session_token);
        if (found_session.by_account_id !== account_id) {
            throw new UnauthorizedException(["This session token is not yours!"]);
        }
        const deleted_session = await model.delete_one_session_by_its_token(session_token);
        return {
            deleted_session_token: deleted_session.token,
        };
    };

    login_via_username = async ({
        username,
        password,
        ip,
        agent,
    }: {
        username: string;
        password: string;
        ip?: string;
        agent?: string;
    }) => {
        const account = await model.find_1_account_by_username(username);
        if (!account) {
            throw new UnauthorizedException([
                "Пользователь с таким именем не существует. Проверьте свои учётные данные",
            ]);
        }

        const is_correct = await bcrypt_service.compare_raw_to_hash(password, account.password_hash);

        if (!is_correct) {
            throw new UnauthorizedException(["Incorrect password. Please try again."]);
        }

        const sessions_count = await model.get_count_of_sessions_by_account_id(account.id);

        if (sessions_count >= SAMETIME_SESSIONS_LIMIT) {
            throw new ForbiddenException([
                `Пользователь не должен иметь более ${SAMETIME_SESSIONS_LIMIT} активных сессий одновременно`,
            ]);
        }

        const session = await model.create_user_session(account.id, {
            username,
            password,
            ip,
            agent,
        });

        return { account, session };
    };
    login_via_email = async ({
        email,
        password,
        ip,
        agent,
    }: {
        email: string;
        password: string;
        ip?: string;
        agent?: string;
    }) => {
        const account = await model.find_1_account_by_email_throw_error(email);

        const is_correct = await bcrypt_service.compare_raw_to_hash(password, account.password_hash);
        if (!is_correct) {
            throw new UnauthorizedException(["Неверный пароль"]);
        }

        const sessions_count = await model.get_count_of_sessions_by_account_id(account.id);

        if (sessions_count >= SAMETIME_SESSIONS_LIMIT) {
            throw new ForbiddenException([
                `Пользователь не должен иметь более ${SAMETIME_SESSIONS_LIMIT} активных сессий одновременно`,
            ]);
        }

        const session = await model.create_user_session(account.id, {
            username: account.username,
            password,
            ip,
            agent,
        });

        return { account, session };
    };

    /**
     * Registers a new user by creating an account, a profile,
     * hashing the password, and initializing a session.
     *
     * @param reg_creds - Data provided by the user during registration.
     * @returns An object containing the newly created user and their session.
     */
    registration = async ({
        nickname,
        email,
        username,
        ip,
        agent,
        password,
    }: {
        nickname?: string;
        email?: string;
        username: string;
        ip?: string;
        agent?: string;
        password: string;
    }) => {
        const creds = {
            nickname,
            email,
            username,
            ip,
            agent,
            password,
        };
        const candidate = await model.find_1_account_by_username(username);

        if (candidate) {
            throw new ConflictException([
                `Пользователь с таким именем (${candidate.username}) уже существует. Выберите другое имя пользователя.`,
            ]);
        }

        const password_hash = await bcrypt_service.create_hash(password);

        const account = await model.create_account_and_profile({
            ...creds,
            password_hash,
        });

        if (!account.profile) {
            consola.fatal("This accound does not have a profile:", account);
            throw new InternalServerErrorException("Unexpected Internal Service Error");
        }
        const session = await model.create_user_session(account.id, creds);
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
