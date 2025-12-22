import { auth_ip_and_agent_do_not_match } from "#/configs/frequent-errors.js";
import { BadRequestException, UnauthorizedException } from "#/errors/client-side-exceptions.js";
import type { AuthMiddlewareDTO } from "#/types/auth-middleware-shape.js";
import { getSessionMetaFromClientDto, getSessionMetaFromDbDto } from "#/utilities/dto/get-session-meta.js";
import type { default as ExpressJS } from "express";
import { getSessionTokenFromHeadersDto } from "#/utilities/dto/get-session-token.js";
import type { LoginSession } from "[orm]";
import { authModels } from "[www]/authentication/authentication.model.js";
import { isDeepStrictEqual } from "node:util";
import { sessionTokenHashService } from "#/utilities/services/hash-token-sessions.service.js";

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
    throw new UnauthorizedException([auth_ip_and_agent_do_not_match]);
}

/**
 * Промежуточный обработчик запроса который проверяет, вошел ли пользователь в систему.
 * Если пользователь вошел, то добавляет свойство `auth` к запросу и передает на следующему обработчику.
 */
export async function mainAuthenticationMiddleware(
    req: ExpressJS.Request & { auth?: AuthMiddlewareDTO },
    res: ExpressJS.Response,
    next: ExpressJS.NextFunction,
) {
    const req_session_token = getSessionTokenFromHeadersDto(req);
    if (!req_session_token) {
        throw new UnauthorizedException(["Вы не вошли в систему. Пожалуйста, войдите в систему, чтобы продолжить"]);
    }
    await sessionTokenHashService.verifySessionToken(req_session_token);
    const { session, profile } = await authModels.find_session_by_its_selector_and_return_also_profile_data(req_session_token);
    // Check if the session's metadata matches the request's metadata
    checkTwoMetadatas(session, req);
    req.auth = { session, profile };
    return next();
}

/**
 * Функция для проверки аутентификации запроса. Не модифицирует запрос или ответ.
 */
export async function checkAuthenticationFunction(req: ExpressJS.Request): Promise<LoginSession | null> {
    const req_session_token = getSessionTokenFromHeadersDto(req);
    if (!req_session_token) {
        return null;
    }
    const session = await authModels.find_1_session_by_its_selector(req_session_token);
    if (!session) {
        return null;
    }
    checkTwoMetadatas(session, req);
    return session;
}

/**
 * Промежуточный обработчик запроса который проверяет, если пользователь уже вошел в систему.
 * Если пользователь уже вошел, то бросает ошибку `BadRequestException`(400)
 */
export const checkIfAccountAlreadyLoggedMiddleware = async (
    req: ExpressJS.Request & { auth?: AuthMiddlewareDTO },
    res: ExpressJS.Response,
    next: ExpressJS.NextFunction,
) => {
    const hasUserLogged = await checkAuthenticationFunction(req);
    if (hasUserLogged) {
        throw new BadRequestException([
            "Этот пользователь уже вошел в систему. Чтобы войти под другим пользователем, сначала выйдите из систему текущего пользователя",
        ]);
    }
    return next();
};
