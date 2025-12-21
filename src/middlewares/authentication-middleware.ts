import { auth_ip_and_agent_do_not_match } from "#/configs/frequent-errors.js";
import { BadRequestException, UnauthorizedException } from "#/errors/client-side-exceptions.js";
import type { AuthMiddlewareDTO } from "#/types/auth-middleware-shape.js";
import { getSessionMetaFromClientDto, getSessionMetaFromDbDto } from "#/utilities/dto/get-session-meta.js";
import type { default as ExpressJS } from "express";
import { getSessionTokenFromHeadersDto } from "#/utilities/dto/get-session-token.js";
import { sessionTokenHashService } from "#/utilities/services/session_token.js";
import type { LoginSession } from "[orm]";
import { authModels } from "[www]/authentication/authentication.model.js";
import { isDeepStrictEqual } from "node:util";

/**
 * Verifies whether the request metadata (IP and User-Agent)
 * matches the stored metadata from the session in the database.
 *
 * @param session - LoginSession retrieved from the database
 * @param requestMeta - Incoming HTTP request to validate
 * @returns true if metadata matches; otherwise throws `ClientError`
 */
const checkTwoMetadatas = (session: LoginSession, requestMeta: ExpressJS.Request) => {
    const session_Meta = getSessionMetaFromDbDto(session);
    const request_Meta = getSessionMetaFromClientDto(requestMeta);
    if (isDeepStrictEqual(session_Meta, request_Meta)) {
        return true;
    }
    throw new UnauthorizedException([auth_ip_and_agent_do_not_match]);
};

/**
 * Express middleware to authenticate a user session.
 * Attaches `auth` property to the request object if valid.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction for middleware chaining
 */
export const mainAuthenticationMiddleware = async (
    req: ExpressJS.Request & { auth?: AuthMiddlewareDTO },
    res: ExpressJS.Response,
    next: ExpressJS.NextFunction,
) => {
    const req_session_token = getSessionTokenFromHeadersDto(req);
    if (!req_session_token) {
        throw new UnauthorizedException(["Вы не вошли в систему. Пожалуйста, войдите в систему, чтобы продолжить"]);
    }
    const decrypted = sessionTokenHashService.decrypt_session_token(req_session_token);
    const { session, profile } = await authModels.find_session_by_its_token_and_return_also_profile_data__SERVICE_MODEL(req_session_token);

    if (session.by_account_id !== decrypted.account_id) {
        throw new UnauthorizedException(["Токен сеанса украден"]);
    }
    // Check if the session's metadata matches the request's metadata
    checkTwoMetadatas(session, req);
    req.auth = { session, profile };
    return next();
};
const HasNotBeenLogged = { pass: false } as const;

/**
 * Utility method to check if a request belongs to an authenticated session.
 * Unlike the middleware, it doesn't modify the request or response.
 *
 * @param req - Express Request object
 * @returns Object with `pass: boolean` and optionally the session
 */
export const checkAuthenticationFunction = async (
    req: ExpressJS.Request,
): Promise<{
    pass: boolean;
    session?: LoginSession;
}> => {
    const req_session_token = getSessionTokenFromHeadersDto(req);
    if (!req_session_token) {
        return HasNotBeenLogged;
    }
    const session = await authModels.find_1_session_by_its_token(req_session_token);
    if (!session) {
        return HasNotBeenLogged;
    }
    const pass = checkTwoMetadatas(session, req);
    return { pass, session };
};

/**
 * Middleware for checking if client has already logged;
 * @param req
 *
 * If client has, then throws BadRequestException
 *
 *
 * @param res
 * @param next
 * @returns
 */
export const has_client_already_logged = async (
    req: ExpressJS.Request & { auth?: AuthMiddlewareDTO },
    res: ExpressJS.Response,
    next: ExpressJS.NextFunction,
) => {
    const hasUserLogged = await checkAuthenticationFunction(req);
    if (hasUserLogged.pass && hasUserLogged.session) {
        throw new BadRequestException([
            "Этот пользователь уже вошел в систему. Чтобы войти под другим пользователем, сначала выйдите из систему текущего пользователя",
        ]);
    }
    return next();
};
