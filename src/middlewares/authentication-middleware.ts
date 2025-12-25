import { BadRequestException, UnauthorizedException } from "#/errors/client-side-exceptions.js";
import type { RequestTypeWithDtoForAuthSession } from "#/types/auth-middleware-shape.js";
import { getSessionMetaFromClientDto, getSessionMetaFromDbDto } from "#/utilities/dto-factory-utils/get-session-meta.js";
import type { default as ExpressJS } from "express";
import { getSessionTokenFromHeadersDto } from "#/utilities/dto-factory-utils/get-session-token.js";
import type { LoginSession } from "[orm]/client.js";
import { authenticationRouteModels } from "#/app/authentication/authentication.model.js";
import { isDeepStrictEqual } from "node:util";
import { sessionTokenHashService } from "#/utilities/cryptography-services/hash-token-sessions.service.js";
import { sessionMetaDoNotMatchErrorMessage } from "#/constants/frequent-errors.js";

/**
 * Проверяет, соответствует ли метаданные запроса (IP и User-Agent) сохраненным в базе данным метаданным сессии.
 * Если метаданные соответствуют, то возвращает undefined, иначе выбрасывает ошибку `UnauthorizedException`(401)
 */
function checkTwoMetadatas(session: LoginSession, requestMeta: ExpressJS.Request) {
    const session_Meta = getSessionMetaFromDbDto(session);
    const request_Meta = getSessionMetaFromClientDto(requestMeta);
    if (isDeepStrictEqual(session_Meta, request_Meta)) {
        return;
    }
    throw new UnauthorizedException([sessionMetaDoNotMatchErrorMessage]);
}

/**
 * Промежуточный обработчик запроса который проверяет, вошел ли пользователь в систему.
 * Если пользователь вошел, то добавляет свойство `auth` к запросу и передает на следующему обработчику.
 */
export async function mainAuthenticationMiddleware(
    req: ExpressJS.Request & RequestTypeWithDtoForAuthSession,
    res: ExpressJS.Response,
    next: ExpressJS.NextFunction,
): Promise<void> {
    const token = getSessionTokenFromHeadersDto(req.headers);
    if (!token) {
        throw new UnauthorizedException();
    }
    const session = await sessionTokenHashService.verifySessionToken(token);
    checkTwoMetadatas(session.session, req);
    req.sessionDto = session.dto;
    return next();
}

/**
 * Функция для проверки аутентификации запроса. Не модифицирует запрос или ответ.
 */
export async function checkAuthenticationFunction(req: ExpressJS.Request & RequestTypeWithDtoForAuthSession): Promise<LoginSession | null> {
    const req_session_token = getSessionTokenFromHeadersDto(req.headers);
    if (!req_session_token) {
        return null;
    }
    const session = await authenticationRouteModels.findSessionByItsSelector(req_session_token);
    if (!session) {
        return null;
    }
    checkTwoMetadatas(session, req);
    return session;
}

/** Промежуточный обработчик запроса который проверяет, если пользователь уже вошел в систему. */
export async function checkIfAccountAlreadyLoggedMiddleware(
    req: ExpressJS.Request & RequestTypeWithDtoForAuthSession,
    res: ExpressJS.Response,
    next: ExpressJS.NextFunction,
): Promise<void> {
    const hasUserLogged = await checkAuthenticationFunction(req);
    if (hasUserLogged) {
        throw new BadRequestException([
            "Этот пользователь уже вошел в систему. Чтобы войти под другим пользователем, сначала выйдите из систему текущего пользователя",
        ]);
    }
    return next();
}
