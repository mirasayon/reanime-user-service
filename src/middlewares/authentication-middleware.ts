import { BadRequestException, UnauthorizedException } from "#/errors/client-side-exceptions.js";
import type { RequestTypeWithDtoForAuthSession } from "#/types/auth-middleware-shape.js";
import { getSessionMetaFromClientDto, getSessionMetaFromDbDto } from "#/utilities/dto-factory-utils/get-session-meta.js";
import type ExpressJS from "express";
import { getSessionTokenFromHeadersDto } from "#/utilities/dto-factory-utils/get-session-token.js";
import type { LoginSession } from "[orm]/client.js";
import { isDeepStrictEqual } from "node:util";
import { sessionTokenHashService } from "#/utilities/cryptography-services/hash-token-sessions.service.js";
import { sessionMetaDoNotMatchErrorMessage } from "#/constants/frequent-errors.js";

/** Function for comparing metadatas of request and session */
function reqAndSessionMetaValidator(session: LoginSession, requestMeta: ExpressJS.Request): void | UnauthorizedException {
    const session_Meta = getSessionMetaFromDbDto(session);
    const request_Meta = getSessionMetaFromClientDto(requestMeta);
    if (isDeepStrictEqual(session_Meta, request_Meta)) {
        return;
    }
    throw new UnauthorizedException([sessionMetaDoNotMatchErrorMessage]);
}

/** Function for comparing metadatas of request and session */
function justCompareReqAndSessionMeta(session: LoginSession, req: ExpressJS.Request): boolean {
    const sessionMeta = getSessionMetaFromDbDto(session);
    const reqMeta = getSessionMetaFromClientDto(req);
    if (isDeepStrictEqual(sessionMeta, reqMeta)) {
        return true;
    }
    return false;
}

/** Main middleware for authentication */
export async function mainAuthenticationMiddleware(
    req: ExpressJS.Request & RequestTypeWithDtoForAuthSession,
    res: ExpressJS.Response,
    next: ExpressJS.NextFunction,
): Promise<void> {
    const token = getSessionTokenFromHeadersDto(req.headers);
    if (!token) {
        throw new UnauthorizedException();
    }
    const session = await sessionTokenHashService.verifySessionToken(token.validator, token.selector);
    reqAndSessionMetaValidator(session.session, req);
    req.sessionDto = session.dto;
    return next();
}

/** Function to check if a request already has a session. Does not modify the request or response */
export async function checkRequestForAlreadySession(req: ExpressJS.Request & RequestTypeWithDtoForAuthSession): Promise<LoginSession | null> {
    const token = getSessionTokenFromHeadersDto(req.headers);
    if (!token) {
        return null;
    }
    const session = (await sessionTokenHashService.verifySessionToken(token.validator, token.selector).catch(() => null))?.session || null;
    if (!session) {
        return null;
    }
    const is_valid = justCompareReqAndSessionMeta(session, req);
    if (is_valid) {
        return session;
    }
    return null;
}

/** Промежуточный обработчик запроса который проверяет, если пользователь уже вошел в систему. */
export async function checkIfAccountAlreadyLoggedMiddleware(
    req: ExpressJS.Request & RequestTypeWithDtoForAuthSession,
    res: ExpressJS.Response,
    next: ExpressJS.NextFunction,
): Promise<void> {
    const hasUserLogged = await checkRequestForAlreadySession(req);
    if (hasUserLogged) {
        throw new BadRequestException([
            "Вы уже вошли в систему. Чтобы войти под другим пользователем, сначала выйдите из систему текущего пользователя",
        ]);
    }
    return next();
}
