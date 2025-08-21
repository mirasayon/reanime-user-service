import { metadata_dto } from "#/utils/dto/meta.js";
import { global_Utilities } from "#/utils/functions.js";
import type { Session } from "#/db/orm/client.js";
import { bearer_session_token_from_headers } from "#/utils/dto/session_token.js";
import type { mid_auth_dto } from "[T]/auth.js";
import type e from "express";
import { Authentication_Model as model } from "[www]/authentication/authentication.model.js";
import { authentication_Session_Token_Util } from "#/utils/services/session_token.js";
import { BadRequestException, UnauthorizedException } from "%/errors/client-side/exceptions.js";
import { auth__metas_dont_matching } from "#/configs/frequent-errors.js";

/**
 * Verifies whether the request metadata (IP and User-Agent)
 * matches the stored metadata from the session in the database.
 *
 * @param session - Session retrieved from the database
 * @param requestMeta - Incoming HTTP request to validate
 * @returns true if metadata matches; otherwise throws `ClientError`
 */
const check_meta = (session: Session, requestMeta: e.Request) => {
    const session_Meta = metadata_dto.server_session_db(session);
    const request_Meta = metadata_dto.client_request(requestMeta);
    const is_equal = global_Utilities.deep_equal(session_Meta, request_Meta);
    if (is_equal === true) {
        return true;
    }
    throw new UnauthorizedException([auth__metas_dont_matching]);
};

/**
 * Express middleware to authenticate a user session.
 * Attaches `auth` property to the request object if valid.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction for middleware chaining
 */
export const Auth_middleware = async (req: e.Request & { auth?: mid_auth_dto }, res: e.Response, next: e.NextFunction) => {
    const req_session_token = bearer_session_token_from_headers(req);
    if (!req_session_token) {
        throw new UnauthorizedException(["Вы не вошли в систему. Пожалуйста, войдите в систему, чтобы продолжить"]);
    }
    const decrypted = authentication_Session_Token_Util.decrypt_session_token(req_session_token);
    const { session, profile } = await model.find_session_by_its_token_and_return_also_profile_data__SERVICE_MODEL(req_session_token);

    if (session.by_account_id !== decrypted.accound_id) {
        throw new UnauthorizedException(["Токен сеанса украден"]);
    }
    // Check if the session's metadata matches the request's metadata
    check_meta(session, req);
    req.auth = { session, profile };
    return next();
};

// Reusable constant for unauthenticated state
const HasNotBeenLogged = { pass: false } as const;

/**
 * Utility method to check if a request belongs to an authenticated session.
 * Unlike the middleware, it doesn't modify the request or response.
 *
 * @param req - Express Request object
 * @returns Object with `pass: boolean` and optionally the session
 */
export const CheckAuth = async (
    req: e.Request,
): Promise<{
    pass: boolean;
    session?: Session;
}> => {
    const req_session_token = bearer_session_token_from_headers(req);
    if (!req_session_token) {
        return HasNotBeenLogged;
    }
    const session = await model.find_1_session_by_its_token(req_session_token);
    if (!session) {
        return HasNotBeenLogged;
    }

    const pass = check_meta(session, req);
    return { pass, session };
};

/**
 * Middleware for checking if client has alredy logged;
 * @param req
 *
 * If client has, then throws BadRequestException
 *
 *
 * @param res
 * @param next
 * @returns
 */
export const has_client_already_logged = async (req: e.Request & { auth?: mid_auth_dto }, res: e.Response, next: e.NextFunction) => {
    const hasUserLogged = await CheckAuth(req);
    if (hasUserLogged.pass && hasUserLogged.session) {
        throw new BadRequestException([
            "Этот пользователь уже вошел в систему. Чтобы войти под другим пользователем, сначала выйдите из систему текущего пользователя",
        ]);
    }
    return next();
};

