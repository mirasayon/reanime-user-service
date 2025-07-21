import { Times_const } from "#/configs/constants/times.js";
import { Session_Token_from_user } from "#/utils/dto/session_token.js";
import type e from "express";
import type { infotype } from "[T]/informative.js";
import type { Session } from "#/db/orm/client.js";
import { cEnv } from "#/configs/environment.js";
import { UnauthorizedException } from "@xamarin.city/reanime/user-service/errors/client-side/exceptions.js";
import { InternalServerErrorException } from "@xamarin.city/reanime/user-service/errors/server-side/exceptions.js";

export const cookieService = new (class CookieServiceClass {
    /** Sets the Session Token for header of requests */
    set_session_token_to_client_cookie = (res: e.Response, session_db: Session) => {
        const maxAge = session_db.expires_at
            ? Math.max(0, session_db.expires_at.getTime() - Date.now()) // <- вычисляем разницу
            : Times_const["30d"];
        // : 1000 * 60 * 60 * 24 * 30; // 30 дней по умолчанию
        res.cookie("session_token", session_db.token, {
            httpOnly: true,
            secure: cEnv.mode.prod,
            sameSite: "lax",
            maxAge,
            priority: "high",
        });
    };

    /** Removes the Session Token for header of requests */
    remove_session_token_from_client_cookie = (req: e.Request, res: e.Response, session_token: infotype.session_token) => {
        const req_session_token = Session_Token_from_user.request_cookie(req);
        if (!req_session_token) {
            throw new UnauthorizedException(["Client does not have a cookies with token to log out"]);
        }
        if (req_session_token === session_token) {
            res.clearCookie("session_token", {});
            return;
        }
        throw new InternalServerErrorException(
            "The client's cookies has different token than the token we just deleted",
            this.remove_session_token_from_client_cookie.name,
        );
    };
})();

