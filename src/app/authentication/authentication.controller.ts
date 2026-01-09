import { goReplyHttp } from "#src/handlers/all-http-responder.ts";
import { checkRequestForValidity } from "#src/utilities/controller-utility-functions.ts";
import type ExpressJS from "express";
import type { AuthenticationSectionRequestTypes } from "#src/app/authentication/authentication.pipes.ts";
import { authenticationRouteService } from "#src/app/authentication/authentication.service.ts";
import type { ResponseTypesForAuthentication } from "#src/shared/user-service-response-types-for-all.routes.ts";
import { getIpAndAgentFromRequest } from "#src/utilities/dto-factory-utils/get-session-meta.ts";

class AuthenticationSectionController {
    login_by_email = async (req: AuthenticationSectionRequestTypes["login_by_email"], reply: ExpressJS.Response) => {
        const { dto } = checkRequestForValidity(req, ["dto"]);
        const sr = await authenticationRouteService.login_via_email({
            ...getIpAndAgentFromRequest(req.headers),
            password: dto.password,
            email: dto.email,
        });
        const data: ResponseTypesForAuthentication["login_via_email"] = sr;
        const message = "Пользователь успешно вошел в систему через почту";
        return goReplyHttp.accepted(reply, { data, message });
    };

    login_by_username = async (req: AuthenticationSectionRequestTypes["login_by_username"], reply: ExpressJS.Response) => {
        const { dto } = checkRequestForValidity(req, ["dto"]);
        const sr = await authenticationRouteService.login_via_username({
            ...getIpAndAgentFromRequest(req.headers),
            password: dto.password,
            username: dto.username,
        });
        const data: ResponseTypesForAuthentication["login_via_username"] = sr;
        const message = "Пользователь успешно вошел в систему через юзернейм";
        return goReplyHttp.accepted(reply, { data, message });
    };
    registration = async (req: AuthenticationSectionRequestTypes["registration"], reply: ExpressJS.Response) => {
        const { dto } = checkRequestForValidity(req, ["dto"]);
        const token = await authenticationRouteService.registration({
            nickname: dto.nickname || null,
            username: dto.username,
            password: dto.password,
            password_repeat: dto.password_repeat,
            email: dto.email ?? null,
            ...getIpAndAgentFromRequest(req.headers),
        });
        const data: ResponseTypesForAuthentication["registration"] = token;
        const message = "Пользователь успешно зарегистрирован и вошёл в систему";
        return goReplyHttp.accepted(reply, { data, message });
    };

    check_username_availability = async (req: AuthenticationSectionRequestTypes["check_username_availability"], reply: ExpressJS.Response) => {
        const username = checkRequestForValidity(req, ["dto"]).dto;
        const isAvailable = await authenticationRouteService.check_username_availability(username);
        const data: ResponseTypesForAuthentication["check_username_availability"] = isAvailable;
        const message = "Проверка доступности имени пользователя";
        return goReplyHttp.ok(reply, { data, message });
    };
    check_session = async (req: AuthenticationSectionRequestTypes["check_session"], reply: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const { account, avatar, profile } = await authenticationRouteService.check_session(sessionDto.account_id);
        const data: ResponseTypesForAuthentication["check_session"] = {
            id: account.id,
            profile_id: profile.id,
            avatar_url: avatar ? avatar.path_dirname + "/" + avatar.path_filename : null,
            username: account.username,
            nickname: profile.nickname || null,
            email: account.email || null,
            selector: sessionDto.selector,
        };
        const message = "Ваша текущая сессия";
        return goReplyHttp.ok(reply, { data, message });
    };
    logout = async (req: AuthenticationSectionRequestTypes["logout"], res: ExpressJS.Response) => {
        const { account_id, selector } = checkRequestForValidity(req, ["sessionDto"]).sessionDto;
        const is_session_deleted = await authenticationRouteService.logout(selector, account_id);
        const data: ResponseTypesForAuthentication["logout"] = is_session_deleted;
        const message = "Этот сеанс успешно удален (выход из системы)";
        return goReplyHttp.accepted(res, { message, data });
    };
}

export const authenticationSectionController = new AuthenticationSectionController();
