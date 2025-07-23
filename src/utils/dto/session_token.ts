import type e from "express";
/**
 * Returns Session Token from web request
 * @param req Request object itself
 * @returns meta from web request
 */
export const session_token_from_request_cookies = (req: e.Request): string | null => {
    if (typeof req.cookies.session_token === "string") {
        return req.cookies.session_token;
    }
    return null;
};
