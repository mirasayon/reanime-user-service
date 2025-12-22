import { goReplyHttp } from "#/handlers/final-responder/all-http-responder.js";
import type { ResponseTypesForAuthentication } from "#/shared/response-patterns/authentication.routes.js";
import { ControllerUtils } from "#/utilities/controller.js";
import type { default as ExpressJS } from "express";
import type { Authentication_ReqDtos } from "[www]/authentication/authentication.pipes.js";
import { Authentication_Service as services } from "[www]/authentication/authentication.service.js";

export const Authentication_Controller = new (class Authentication_Controller {
    login_via_email = async (req: Authentication_ReqDtos.login_via_email, reply: ExpressJS.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
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

    login_via_username = async (req: Authentication_ReqDtos.login_via_username, reply: ExpressJS.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
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
    registration = async (req: Authentication_ReqDtos.registration, reply: ExpressJS.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const { account, session } = await services.registration({
            nickname: dto.nickname,
            username: dto.username,
            password: dto.password,
            password_repeat: dto.password_repeat,
            ip: dto.ip ?? null,
            email: dto.email ?? null,
            agent: dto.agent ?? null,
        });
        const data: ResponseTypesForAuthentication.registration = { account, session };
        const message = "Пользователь успешно зарегистрирован и вошёл в систему";
        return goReplyHttp.accepted(reply, { data, message });
    };

    check_username_availability = async (req: Authentication_ReqDtos.check_username_availability, reply: ExpressJS.Response) => {
        const { dto: username } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await services.check_username_availability({ username });
        const data: ResponseTypesForAuthentication.check_username_availability = sr;
        const message = "Проверка доступности имени пользователя";
        return goReplyHttp.ok(reply, { data, message });
    };
    check_session = async (req: Authentication_ReqDtos.check_session, reply: ExpressJS.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { account, avatar } = await services.check_session(auth.session.by_account_id);
        const data: ResponseTypesForAuthentication.check_session = {
            profile: auth.profile,
            account: account,
            avatar: avatar,
            session: auth.session,
        };
        const message = "Ваша текущая сессия";
        return goReplyHttp.ok(reply, { data, message });
    };
    logout = async (req: Authentication_ReqDtos.logout, res: ExpressJS.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const is_session_deleted = await services.logout(auth.session.selector, auth.session.by_account_id);
        const data: ResponseTypesForAuthentication.logout = is_session_deleted;
        const message = "Этот сеанс успешно удален (выход из системы)";
        return goReplyHttp.accepted(res, { message, data });
    };
})();
