import { SAME_TIME_SESSIONS_LIMIT } from "#/configs/application-rules-config.js";
import { prisma } from "#/databases/provider/database-connector.js";
import { BadRequestException, ConflictException, ForbiddenException, UnauthorizedException } from "#/errors/client-side-exceptions.js";
import type { TokenSelector, DbCuidType } from "#/shared/types-shared/informative-input-types-shared.js";
import { passwordHashingService } from "#/utilities/cryptography-services/hash-passwords.service.js";
import { sessionTokenHashService, type TokenStringRaw } from "#/utilities/cryptography-services/hash-token-sessions.service.js";
import type { AccountPassword, ProfileAvatarPicture, UserAccount, UserProfile } from "[orm]/client.js";
import { authenticationRouteModels } from "#/app/authentication/authentication.model.js";
import { profileRouteModel } from "#/app/profile/profile.model.js";
import { invalidCredentialsErrorMessage, maxSessionsLimitReachedErrorMessage } from "#/constants/frequent-errors.js";
import maxmind, { type CountryResponse } from "maxmind";
import { pathsMainConfig } from "#/configs/file-system-path-config.js";
import { UAParser } from "ua-parser-js";
class AuthenticationRouteServiceClass {
    logout = async (session_selector: TokenSelector, account_id: DbCuidType): Promise<boolean> => {
        const found_session = await authenticationRouteModels.findSessionByItsSelector(session_selector);
        if (found_session.by_account_id !== account_id) {
            throw new UnauthorizedException();
        }
        const deleted_session = await authenticationRouteModels.delete_one_session_by_its_selector(session_selector);
        return !!deleted_session;
    };
    check_session = async (account_id: string): Promise<{ account: UserAccount; avatar: ProfileAvatarPicture | null; profile: UserProfile }> => {
        const account = await authenticationRouteModels.find_account_by_ids_id(account_id);
        const { profile, avatar } = await profileRouteModel.find_profile_by_username_AND_give_avatar_data(account.username);
        return { account, avatar, profile };
    };
    login_via_username = async (credentials: { username: string; password: string; ip: string; agent: string | null }): Promise<TokenStringRaw> => {
        const account_id = (await authenticationRouteModels.find_1_account_by_username(credentials.username))?.id;
        if (!account_id) {
            throw new UnauthorizedException([invalidCredentialsErrorMessage]);
        }
        const storedPassword = await authenticationRouteModels.getPasswordDataFromAccountId(account_id);

        const is_correct = await passwordHashingService.verifyPasswordWithStored({ password: credentials.password, stored: storedPassword });

        if (!is_correct) {
            throw new UnauthorizedException([invalidCredentialsErrorMessage]);
        }
        await this.rehashPasswordIfNeeded(storedPassword, credentials.password);
        const sessions_count = await authenticationRouteModels.get_count_of_sessions_by_account_id(account_id);
        if (sessions_count >= SAME_TIME_SESSIONS_LIMIT) {
            throw new ForbiddenException([maxSessionsLimitReachedErrorMessage]);
        }
        const token = await sessionTokenHashService.createSessionToken();
        await authenticationRouteModels.create_user_session({
            by_account_id: account_id,
            ...token.db,
            ...this.getAllInfoFromIpAndUserAgent(credentials.ip, credentials.agent),
        });
        return token.client;
    };
    login_via_email = async (credentials: { email: string; password: string; ip: string; agent: string | null }): Promise<TokenStringRaw> => {
        const account_id = (await authenticationRouteModels.find_1_account_by_email_throw_error(credentials.email)).id;
        const stored = await authenticationRouteModels.getPasswordDataFromAccountId(account_id);
        const is_correct = await passwordHashingService.verifyPasswordWithStored({
            password: credentials.password,
            stored: stored,
        });
        if (!is_correct) {
            throw new UnauthorizedException([invalidCredentialsErrorMessage]);
        }
        await this.rehashPasswordIfNeeded(stored, credentials.password);
        const sessions_count = await authenticationRouteModels.get_count_of_sessions_by_account_id(account_id);
        if (sessions_count >= SAME_TIME_SESSIONS_LIMIT) {
            throw new ForbiddenException([maxSessionsLimitReachedErrorMessage]);
        }
        const token = await sessionTokenHashService.createSessionToken();

        await authenticationRouteModels.create_user_session({
            by_account_id: account_id,
            ...token.db,
            ...this.getAllInfoFromIpAndUserAgent(credentials.ip, credentials.agent),
        });
        return token.client;
    };
    registration = async (credentials: {
        nickname: string | null;
        email: string | null;
        username: string;
        ip: string;
        agent: string | null;
        password: string;
        password_repeat: string;
    }): Promise<TokenStringRaw> => {
        if (credentials.password_repeat !== credentials.password) {
            throw new BadRequestException(["Пароли не совпадают"]);
        }
        const candidate = await authenticationRouteModels.find_1_account_by_username(credentials.username);
        if (candidate) {
            throw new ConflictException([`Пользователь с таким именем (${candidate.username}) уже существует. Выберите другое имя пользователя.`]);
        }
        const passwordHashResult = await passwordHashingService.hashPasswordArgon2id(credentials.password);
        const token = await sessionTokenHashService.createSessionToken();
        const { id: account_id } = await authenticationRouteModels.createProfile_Account_Password(credentials, passwordHashResult);
        await authenticationRouteModels.create_user_session({
            by_account_id: account_id,
            ...token.db,
            ...this.getAllInfoFromIpAndUserAgent(credentials.ip, credentials.agent),
        });
        return token.client;
    };
    /**
     * @returns `false` if username is used, `true` if available
     */
    check_username_availability = async (username: string): Promise<boolean> => {
        const candidate = await authenticationRouteModels.find_1_account_by_username_and_return_ID(username);
        return !!!candidate;
    };
    private rehashPasswordIfNeeded = async (storedObj: AccountPassword, current_password: string): Promise<void> => {
        const needRehash =
            storedObj.memory !== passwordHashingService._defaultParams.memory ||
            storedObj.tag_length !== passwordHashingService._defaultParams.tag_length ||
            storedObj.passes !== passwordHashingService._defaultParams.passes ||
            storedObj.parallelism !== passwordHashingService._defaultParams.parallelism;

        if (needRehash) {
            const newHashed = await passwordHashingService.hashPasswordArgon2id(current_password);
            await prisma.accountPassword.update({
                where: { id: storedObj.id },
                data: {
                    hash_base64: newHashed.hash_base64,
                    salt_base64: newHashed.salt_base64,
                    memory: newHashed.memory,
                    passes: newHashed.passes,
                    parallelism: newHashed.parallelism,
                    tag_length: newHashed.tag_length,
                },
            });
        }
        return;
    };
    private getAllInfoFromIpAndUserAgent = (ip: string, user_agent: string | null): SessionMetaFromIpAndUserAgentType => {
        const country = getCountryByIp(ip);
        if (!user_agent) {
            return {
                ip_country: country,
                ip_region: null,
                ip_city: null,
                ip_address: ip,
                user_agent: null,
                device_type: null,
                device_model: null,
                os: null,
                os_version: null,
                browser: null,
                browser_version: null,
            };
        }
        const ua = parseUA(user_agent);
        return {
            ip_country: country,
            ip_region: null,
            ip_city: null,
            ip_address: ip,
            user_agent: user_agent,
            device_type: ua.deviceType,
            device_model: ua.deviceModel,
            os: ua.os,
            os_version: ua.osVersion,
            browser: ua.browser,
            browser_version: ua.browserVersion,
        };
    };
}
export type SessionMetaFromIpAndUserAgentType = {
    ip_country: string | null;
    ip_region: string | null;
    ip_city: string | null;
    // location_updated_at: Date | null;
    device_type: string | null;
    device_model: string | null;
    os: string | null;
    os_version: string | null;
    browser: string | null;
    browser_version: string | null;
    ip_address: string;
    user_agent: string | null;
};
function parseUA(uaString: string) {
    const p = new UAParser(uaString);
    const browser = p.getBrowser(); // { name, version }
    const os = p.getOS(); // { name, version }
    const device = p.getDevice(); // { vendor, model, type }
    return {
        str: p.getUA(),
        browser: browser.name ?? null,
        browserVersion: browser.version ?? null,
        os: os.name ?? null,
        osVersion: os.version ?? null,
        deviceType: device.type ?? "desktop",
        deviceModel: device.model ?? null,
    };
}

const maxmindIpDbInit = await maxmind.open<CountryResponse>(pathsMainConfig.maxmindDbPath);

function getCountryByIp(ip: string): string | null {
    const data = maxmindIpDbInit.get(ip);
    if (!data || data == null || !data.country?.names.ru) {
        return null;
    }
    return data.country.names.ru;
}

export const authenticationRouteService = new AuthenticationRouteServiceClass();
