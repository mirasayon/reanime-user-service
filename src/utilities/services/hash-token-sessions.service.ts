import { envMainConfig } from "#/configs/environment-variables.js";
import { prisma } from "#/databases/providers/database-connect.js";
import { UnauthorizedException } from "#/errors/client-side-exceptions.js";
import { UnexpectedInternalServerErrorException } from "#/errors/server-side-exceptions.js";
import nodeCrypto from "crypto";
type CreateSessionTokenType = {
    token: `${string}.${string}`;
    selector: string;
    hashed_validator: string;
    created_at: Date;
    expires_at: Date;
};

class Authentication_Session_Token_Util {
    /** Алгоритм хеширования токена сеанса */
    readonly ALGORITHM = "sha512";
    /** selector короткий, индексируемый */
    private readonly TOKEN_SELECTOR_BYTES = 32;
    /** validator — секретная часть */
    private readonly TOKEN_VALIDATOR_BYTES = 32;
    /** Срок действия сессии в часах */
    private readonly SESSION_EXP_HOURS = 24;
    private sessionTokenHmacSecret: string;
    constructor() {
        const secret = envMainConfig.sessionTokenHmacSecret;
        if (!secret) {
            throw new Error("SESSION_HMAC_SECRET not set");
        }
        this.sessionTokenHmacSecret = secret;
    }
    /** используем HMAC-SHA-512. Base64 */
    private getHmacFromValidatorSession(validator: string): string {
        return nodeCrypto.createHmac(this.ALGORITHM, this.sessionTokenHmacSecret).update(validator).digest("hex");
    }
    private generateTokenPair(): {
        selector: string;
        validator: string;
        token: `${string}.${string}`;
    } {
        try {
            const selector = nodeCrypto.randomBytes(this.TOKEN_SELECTOR_BYTES).toString("hex");
            const validator = nodeCrypto.randomBytes(this.TOKEN_VALIDATOR_BYTES).toString("hex");
            const token = `${selector}.${validator}` as const;
            return { selector, validator, token };
        } catch (error) {
            throw new UnexpectedInternalServerErrorException({
                errorMessageToClient: "Ошибка генерации токена сеанса",
                errorItselfOrPrivateMessageToServer: "Error while generating session token: " + error,
                service_name: this.generateTokenPair.name,
            });
        }
    }

    createSessionToken = async (): Promise<CreateSessionTokenType> => {
        const { selector, validator, token } = this.generateTokenPair();
        const candidate = await prisma.loginSession.findUnique({ where: { selector } });
        if (candidate) {
            // re-generate token
            return await this.createSessionToken();
        }
        const hashed_validator = this.getHmacFromValidatorSession(validator);
        const created_at = new Date();
        const expires_at = new Date(created_at.getTime() + this.SESSION_EXP_HOURS * 3600 * 1000);
        return { token, selector, hashed_validator, created_at, expires_at };
    };

    verifySessionToken = async (token: string) => {
        if (!token) {
            return null;
        }
        const parts = token.split(".");
        if (parts.length !== 2) {
            throw new UnauthorizedException(["Токен сеанса отсутствует"]);
        }
        const [selector, validator] = parts;
        if (!selector || !validator) {
            throw new UnauthorizedException(["Неверный формат токена сеанса или токен сеанса отсутствует"]);
        }
        const session = await prisma.loginSession.findUnique({ where: { selector } });
        if (!session) {
            throw new UnauthorizedException(["Сеанс не найден. Пожалуйста, войдите снова"]);
        }
        if (session.expires_at < new Date()) {
            await prisma.loginSession.delete({ where: { selector } });
            throw new UnauthorizedException(["Срок действия сессии истек. Пожалуйста, войдите снова"]);
        }

        const presentedHash = this.getHmacFromValidatorSession(validator);
        const a = Buffer.from(presentedHash, "hex");
        const b = Buffer.from(session.hashed_validator, "hex");
        if (a.length !== b.length) {
            return null;
        }
        if (!nodeCrypto.timingSafeEqual(a, b)) {
            return null;
        }

        // обновим lastUsed при необходимости
        await prisma.loginSession.update({
            where: { selector },
            data: { last_used_at: new Date() },
        });

        return session;
    };
}
export const sessionTokenHashService = new Authentication_Session_Token_Util();
