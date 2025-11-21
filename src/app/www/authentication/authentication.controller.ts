import type e from "express";
import { ControllerUtils } from "#/utils/controller.js";
import type { Authentication_ReqDtos } from "[www]/authentication/authentication.pipes.js";
import { Authentication_Service as services } from "[www]/authentication/authentication.service.js";
import { Reply } from "#/modules/response/handlers.js";
import type { Authentication_ResponseTypes } from "#/shared/response-patterns/authentication.routes.js";

export const Authentication_Controller = new (class Authentication_Controller {
    login_via_email = async (req: Authentication_ReqDtos.login_via_email, reply: e.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await services.login_via_email({
            agent: dto.agent ?? null,
            ip: dto.ip ?? null,
            password: dto.password,
            email: dto.email,
        });
        const data: Authentication_ResponseTypes.login_via_email = sr;
        const message = "Пользователь успешно вошел в систему через почту";
        return Reply.accepted(reply, { data, message });
    };

    login_via_username = async (req: Authentication_ReqDtos.login_via_username, reply: e.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await services.login_via_username({
            agent: dto.agent ?? null,
            ip: dto.ip ?? null,
            password: dto.password,
            username: dto.username,
        });
        const data: Authentication_ResponseTypes.login_via_username = sr;
        const message = "Пользователь успешно вошел в систему через юзернейм";
        return Reply.accepted(reply, { data, message });
    };
    registration = async (req: Authentication_ReqDtos.registration, reply: e.Response) => {
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
        const data: Authentication_ResponseTypes.registration = { account, session };
        const message = "Пользователь успешно зарегистрирован и вошёл в систему";
        return Reply.accepted(reply, { data, message });
    };

    check_username_availability = async (req: Authentication_ReqDtos.check_username_availability, reply: e.Response) => {
        const { dto: username } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await services.check_username_availability({ username });
        const data: Authentication_ResponseTypes.check_username_availability = sr;
        const message = "Проверка доступности имени пользователя";
        return Reply.ok(reply, { data, message });
    };
    check_session = async (req: Authentication_ReqDtos.check_session, reply: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { account, avatar } = await services.check_session(auth.session.by_account_id);
        const data: Authentication_ResponseTypes.check_session = {
            profile: auth.profile,
            account: account,
            avatar: avatar,
            session: auth.session,
        };
        const message = "Ваша текущая сессия";
        return Reply.ok(reply, { data, message });
    };
    logout = async (req: Authentication_ReqDtos.logout, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { deleted_session_token } = await services.logout(auth.session.token, auth.session.by_account_id);
        const data: Authentication_ResponseTypes.logout = deleted_session_token;
        const message = "Этот сеанс успешно удален (выход из системы)";
        return Reply.accepted(res, { message, data });
    };
})();
