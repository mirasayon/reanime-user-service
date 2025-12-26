import { goReplyHttp } from "#/handlers/all-http-responder.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import type ExpressJS from "express";
import type { AuthenticationSectionRequestTypes } from "#/app/authentication/authentication.pipes.js";
import { authenticationRouteService as services } from "#/app/authentication/authentication.service.js";
import type { ResponseTypesForAuthentication } from "#/shared/user-service-response-types-for-all.routes.js";

export const Authentication_Controller = new (class Authentication_Controller {
    login_by_email = async (req: AuthenticationSectionRequestTypes.login_by_email, reply: ExpressJS.Response) => {
        const { dto } = checkRequestForValidity(req, ["dto"]);
        const sr = await services.login_via_email({
            agent: dto.agent ?? null,
            ip: dto.ip ?? null,
            password: dto.password,
            email: dto.email,
        });
        const data: ResponseTypesForAuthentication.login_via_email = sr;
        const message = "Пользователь успешно вошел в систему через почту";
        return goReplyHttp.accepted(reply, { data, message });
    };

    login_by_username = async (req: AuthenticationSectionRequestTypes.login_by_username, reply: ExpressJS.Response) => {
        const { dto } = checkRequestForValidity(req, ["dto"]);
        const sr = await services.login_via_username({
            agent: dto.agent ?? null,
            ip: dto.ip ?? null,
            password: dto.password,
            username: dto.username,
        });
        const data: ResponseTypesForAuthentication.login_via_username = sr;
        const message = "Пользователь успешно вошел в систему через юзернейм";
        return goReplyHttp.accepted(reply, { data, message });
    };
    registration = async (req: AuthenticationSectionRequestTypes.registration, reply: ExpressJS.Response) => {
        const { dto } = checkRequestForValidity(req, ["dto"]);
        const token = await services.registration({
            nickname: dto.nickname,
            username: dto.username,
            password: dto.password,
            password_repeat: dto.password_repeat,
            ip: dto.ip,
            email: dto.email ?? null,
            agent: dto.agent ?? null,
        });
        const data: ResponseTypesForAuthentication.registration = token;
        const message = "Пользователь успешно зарегистрирован и вошёл в систему";
        return goReplyHttp.accepted(reply, { data, message });
    };

    check_username_availability = async (req: AuthenticationSectionRequestTypes.check_username_availability, reply: ExpressJS.Response) => {
        const username = checkRequestForValidity(req, ["dto"]).dto;
        const isAvailable = await services.check_username_availability(username);
        const data: ResponseTypesForAuthentication.check_username_availability = isAvailable;
        const message = "Проверка доступности имени пользователя";
        return goReplyHttp.ok(reply, { data, message });
    };
    check_session = async (req: AuthenticationSectionRequestTypes.check_session, reply: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const { account, avatar, profile } = await services.check_session(sessionDto.account_id);
        const data: ResponseTypesForAuthentication.check_session = {
            avatar_url: avatar ? avatar.path_dirname + "/" + avatar.path_filename : null,
            username: account.username,
            nickname: profile.nickname || null,
            email: account.email || null,
            selector: sessionDto.selector,
        };
        const message = "Ваша текущая сессия";
        return goReplyHttp.ok(reply, { data, message });
    };
    logout = async (req: AuthenticationSectionRequestTypes.logout, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const is_session_deleted = await services.logout(sessionDto.selector, sessionDto.account_id);
        const data: ResponseTypesForAuthentication.logout = is_session_deleted;
        const message = "Этот сеанс успешно удален (выход из системы)";
        return goReplyHttp.accepted(res, { message, data });
    };
})();
