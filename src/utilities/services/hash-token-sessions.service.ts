import { envMainConfig } from "#/configs/environment-variables.js";
import { prisma } from "#/databases/providers/database-connect.js";
import nodeCrypto from "crypto";
import type { Response } from "express";
/** selector короткий, индексируемый */
const TOKEN_SELECTOR_BYTES = 32;
/** validator — секретная часть */
const TOKEN_VALIDATOR_BYTES = 32;
/** Срок действия сессии в часах */
const SESSION_EXP_HOURS = 24;

/** используем HMAC-SHA-512. Base64 */
function getHmacFromValidator(validator: string): string {
    const secret = envMainConfig.sessionTokenHmacSecret;
    if (!secret) {
        throw new Error("SESSION_HMAC_SECRET not set");
    }
    return nodeCrypto.createHmac("sha512", secret).update(validator).digest("hex");
}

export function generateTokenPair(): {
    selector: string;
    validator: string;
    token: `${string}.${string}`;
} {
    const selector = nodeCrypto.randomBytes(TOKEN_SELECTOR_BYTES).toString("hex");
    const validator = nodeCrypto.randomBytes(TOKEN_VALIDATOR_BYTES).toString("hex");
    const token = `${selector}.${validator}` as const;
    return { selector, validator, token };
}

export async function createSessionToken(res: Response) {
    const { selector, validator, token } = generateTokenPair();
    const hashed_validator = getHmacFromValidator(validator);
    const created_at = new Date();
    const expires_at = new Date(created_at.getTime() + SESSION_EXP_HOURS * 3600 * 1000);
    return { token, selector, hashed_validator, created_at, expires_at };
}

export async function verifySessionToken(token: string) {
    if (!token) {
        return null;
    }
    const parts = token.split(".");
    if (parts.length !== 2) {
        return null;
    }
    const [selector, validator] = parts;
    if (!selector || !validator) {
        return null;
    }
    const session = await prisma.loginSession.findUnique({ where: { selector } });
    if (!session) {
        return null;
    }
    if (session.expires_at < new Date()) {
        await prisma.loginSession.delete({ where: { selector } });
        return null;
    }

    const presentedHash = getHmacFromValidator(validator);
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
}
