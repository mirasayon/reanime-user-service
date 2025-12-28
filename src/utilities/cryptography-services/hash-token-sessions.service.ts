import { envMainConfig } from "#src/configs/environment-variables-config.ts";
import { invalidSessionTokenErrorMessage } from "#src/constants/frequent-errors.ts";
import type { LoginSession } from "#orm/client.ts";
import { prisma } from "#src/databases/provider/database-connector.ts";
import { UnauthorizedException } from "#src/errors/client-side-exceptions.ts";
import { UnexpectedInternalServerErrorException } from "#src/errors/server-side-exceptions.ts";
import type { DtoTypeForAuthSession } from "#src/types/auth-middleware-shape.ts";
import { timingSafeEqual, createHmac, randomBytes } from "node:crypto";

export type TokenStringRaw = `${string}.${string}`;
export type CreateSessionTokenType = {
    selector: string;
    hashed_validator: string;
    created_at: Date;
    expires_at: Date;
};

class SessionTokenHashServiceClass {
    constructor() {
        const secret = envMainConfig.sessionTokenHmacSecret;
        if (!secret) {
            throw new Error("SESSION_HMAC_SECRET not set");
        }
        this.sessionTokenHmacSecret = secret;
    }
    /** Алгоритм хеширования токена сеанса */
    readonly ALGORITHM = "sha512";
    /** selector короткий, индексируемый */
    private readonly TOKEN_SELECTOR_BYTES = 32;
    /** validator — секретная часть */
    private readonly TOKEN_VALIDATOR_BYTES = 32;
    /** Срок действия сессии в часах */
    private readonly SESSION_EXP_HOURS = 24;
    private sessionTokenHmacSecret: string;

    /** HEX string */
    private getHmacFromValidatorString(validator: string): string {
        return createHmac(this.ALGORITHM, this.sessionTokenHmacSecret).update(validator, "utf8").digest("hex");
    }
    /** Hex-like string */
    private generateTokenPair(): {
        selector: string;
        validator: string;
        token: `${string}.${string}`;
    } {
        const selector = randomBytes(this.TOKEN_SELECTOR_BYTES).toString("hex");
        const validator = randomBytes(this.TOKEN_VALIDATOR_BYTES).toString("hex");
        const token = `${selector}.${validator}` as const;
        return { selector, validator, token };
    }

    createSessionToken = async (): Promise<{ db: CreateSessionTokenType; client: TokenStringRaw }> => {
        const { selector, validator, token } = this.generateTokenPair();
        const candidate = await prisma.loginSession.findUnique({ where: { selector } });
        if (candidate) {
            // re-generate token
            return await this.createSessionToken();
        }
        const hashed_validator = this.getHmacFromValidatorString(validator);
        const created_at = new Date();
        const expires_at = new Date(created_at.getTime() + this.SESSION_EXP_HOURS * 3600 * 1000);
        return { client: token, db: { selector, hashed_validator, created_at, expires_at } };
    };

    verifySessionToken = async (validator: string, selector: string): Promise<{ dto: DtoTypeForAuthSession; session: LoginSession }> => {
        if (!validator || !selector) {
            throw new UnauthorizedException(invalidSessionTokenErrorMessage);
        }
        const session = await prisma.loginSession.findUnique({ where: { selector } });
        if (!session) {
            throw new UnauthorizedException(invalidSessionTokenErrorMessage);
        }
        if (session.expires_at < new Date()) {
            await prisma.loginSession.delete({ where: { selector: selector } });
            throw new UnauthorizedException(invalidSessionTokenErrorMessage);
        }

        const presentedHash = this.getHmacFromValidatorString(validator);
        const a = Buffer.from(presentedHash, "hex");
        const b = Buffer.from(session.hashed_validator, "hex");
        if (a.length !== b.length) {
            throw new UnauthorizedException(invalidSessionTokenErrorMessage);
        }
        if (timingSafeEqual(a, b)) {
            const updated_session = await prisma.loginSession.update({
                where: { selector },
                select: {
                    by_account: {
                        select: {
                            id: true,
                            username: true,
                            profile: {
                                select: {
                                    id: true,
                                },
                            },
                        },
                    },
                },
                data: { last_used_at: new Date() },
            });
            if (!updated_session.by_account.profile) {
                throw new UnexpectedInternalServerErrorException(
                    `Профиль для айди аккаунта ${updated_session.by_account.id} не найден`,
                    this.verifySessionToken.name,
                );
            }
            return {
                session,
                dto: {
                    selector: selector,
                    account_id: updated_session.by_account.id,
                    profile_id: updated_session.by_account.profile.id,
                },
            };
        }

        throw new UnauthorizedException(invalidSessionTokenErrorMessage);
    };
}
export const sessionTokenHashService = new SessionTokenHashServiceClass();
