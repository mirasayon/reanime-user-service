// utils/session.ts
import crypto from "crypto";
import type { Response } from "express";
import { prisma } from "../src/providers/database-connect";

const TOKEN_SELECTOR_BYTES = 12; // selector короткий, индексируемый
const TOKEN_VALIDATOR_BYTES = 32; // validator — секретная часть
const SESSION_EXP_HOURS = 24; // пример

// используем HMAC-SHA-512; можно SHA-256 тоже (HMAC-SHA256)
function hmacValidator(validator: string) {
    const secret = process.env.SESSION_HMAC_SECRET!;
    if (!secret) throw new Error("SESSION_HMAC_SECRET not set");
    return crypto.createHmac("sha512", secret).update(validator).digest("hex");
}

export function generateTokenPair() {
    const selector = crypto.randomBytes(TOKEN_SELECTOR_BYTES).toString("base64url");
    const validator = crypto.randomBytes(TOKEN_VALIDATOR_BYTES).toString("base64url");
    const token = `${selector}.${validator}`;
    return { selector, validator, token };
}

export async function createSessionAndSetCookie(res: Response, userId: string) {
    const { selector, validator, token } = generateTokenPair();
    const hashedValidator = hmacValidator(validator);
    const now = new Date();
    const expires = new Date(now.getTime() + SESSION_EXP_HOURS * 3600 * 1000);

    await prisma.session.create({
        data: {
            selector,
            hashedValidator,
            userId,
            createdAt: now,
            expiresAt: expires,
        },
    });

    // отправляем cookie безопасно
    res.cookie("__Host-session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/", // __Host- требует path=/ и no Domain
        maxAge: SESSION_EXP_HOURS * 3600 * 1000,
    });

    return { token, expiresAt: expires };
}

export async function verifySessionToken(token: string) {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [selector, validator] = parts;
    const session = await prisma.session.findUnique({ where: { selector } });
    if (!session) return null;
    if (session.expiresAt < new Date()) {
        // можно удалить просроченную сессию
        await prisma.session.delete({ where: { selector } });
        return null;
    }

    const presentedHash = hmacValidator(validator);
    const a = Buffer.from(presentedHash, "hex");
    const b = Buffer.from(session.hashedValidator, "hex");
    if (a.length !== b.length) return null;
    // timing-safe comparison
    if (!crypto.timingSafeEqual(a, b)) return null;

    // обновим lastUsed при необходимости
    await prisma.session.update({
        where: { selector },
        data: { lastUsed: new Date() },
    });

    return session; // содержит userId и т.д.
}

export async function revokeSessionBySelector(selector: string) {
    await prisma.session.deleteMany({ where: { selector } });
}
