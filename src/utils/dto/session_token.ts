import type e from "express";
/**
 * Returns Session Token from web request;s headers
 * @param req Express Request object
 * @returns Session Token
 */
export const bearer_session_token_from_headers = (req: e.Request): string | null => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || typeof authHeader !== "string") {
        return null;
    }
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return null;
    }
    if (typeof token === "string") {
        return token;
    }
    return null;
};

