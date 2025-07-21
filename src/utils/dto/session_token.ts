import type e from "express";

export const Session_Token_from_user = new (class Session_Token_from_user_Class {
    /**
     * Returns Session Token from web request
     * @param req Request object itself
     * @returns meta from web request
     */
    request_cookie = (req: e.Request): string | null => {
        if (typeof req.cookies.session_token === "string") {
            return req.cookies.session_token;
        }
        return null;
    };
})();
