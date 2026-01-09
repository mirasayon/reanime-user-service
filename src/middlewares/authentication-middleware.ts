import { BadRequestException, UnauthorizedException } from "#src/errors/client-side-exceptions.ts";
import type { RequestTypeWithDtoForAuthSession } from "#src/types/auth-middleware-shape.ts";
import { getIpAndAgentFromRequest, getIpAndAgentFromSessionDb } from "#src/utilities/dto-factory-utils/get-session-meta.ts";
import type ExpressJS from "express";
import { getSessionTokenFromHeadersDto } from "#src/utilities/dto-factory-utils/get-session-token.ts";
import type { LoginSession } from "#orm";
import { isDeepStrictEqual } from "node:util";
import { sessionTokenHashService } from "#src/utilities/cryptography-services/hash-token-sessions.service.ts";
import { sessionMetaDoNotMatchErrorMessage } from "#src/constants/frequent-errors.ts";

/** Function for comparing metadatas of request and session */
function reqAndSessionMetaValidator(session: LoginSession, requestMeta: ExpressJS.Request["headers"]): void | UnauthorizedException {
    const session_Meta = getIpAndAgentFromSessionDb(session);
    const request_Meta = getIpAndAgentFromRequest(requestMeta);
    if (isDeepStrictEqual(session_Meta, request_Meta)) {
        return;
    }
    throw new UnauthorizedException([sessionMetaDoNotMatchErrorMessage]);
}

/** Function for comparing metadatas of request and session */
function justCompareReqAndSessionMeta(session: LoginSession, req: ExpressJS.Request): boolean {
    const sessionMeta = getIpAndAgentFromSessionDb(session);
    const reqMeta = getIpAndAgentFromRequest(req.headers);
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
    reqAndSessionMetaValidator(session.session, req.headers);
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

export async function alreadyLoggedMiddleware(
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
