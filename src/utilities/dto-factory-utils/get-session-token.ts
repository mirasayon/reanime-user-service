import type { IncomingHttpHeaders } from "node:http";
import type { TokenStringRaw } from "../cryptography-services/hash-token-sessions.service.js";
const MAX_TOKEN_LENGTH = 1024;
// Этот Regex допускает base64url/hex-like символы и обязательную точку между частями.
const TOKEN_RE = /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/;
/** Возвращает токен сеанса из заголовков запроса */
export function getSessionTokenFromHeadersDto(requestHeaders: IncomingHttpHeaders): TokenStringRaw | null {
    const header = requestHeaders["authorization"];

    if (!header || typeof header !== "string") {
        return null;
    }

    const spIdx = header.indexOf(" ");
    if (spIdx === -1) {
        return null;
    }
    const scheme = header.slice(0, spIdx);
    if (scheme !== "Bearer") {
        return null;
    }
    const token = header.slice(spIdx + 1);
    if (token.length < 1 || token.length > MAX_TOKEN_LENGTH) {
        return null;
    }

    if (!token.includes(".")) {
        return null;
    }
    if (TOKEN_RE.test(token)) {
        return token as TokenStringRaw;
    }
    return null;
}
