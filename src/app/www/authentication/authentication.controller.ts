import type e from "express";
import { ControllerUtils } from "#/utils/controller.js";
import { cookieService } from "#/utils/services/cookies.js";
import { Authentication_ReqDtos } from "[www]/authentication/authentication.pipes.js";
import { Authentication_Service as sevice } from "[www]/authentication/authentication.service.js";
import { xResponse } from "@xamarin.city/reanime/user-service/patterns/response/handlers.js";
import { Logger } from "@xamarin.city/reanime/tools/logger/chalk.js";
export const Authentication_Controller = new (class Authentication_Controller {
    login_via_email = async (req: Authentication_ReqDtos.login_via_email, reply: e.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await sevice.login_via_email(dto);
        const data = sr;
        cookieService.set_session_token_to_client_cookie(reply, data.session);
        const message = "Пользователь успешно вошел в систему через почту";
        return xResponse.accepted(reply, { data, message });
    };

    login_via_username = async (req: Authentication_ReqDtos.login_via_username, reply: e.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await sevice.login_via_username(dto);
        const data = sr;
        cookieService.set_session_token_to_client_cookie(reply, data.session);
        const message = "Пользователь успешно вошел в систему через юзернейм";
        return xResponse.accepted(reply, { data, message });
    };
    registration = async (req: Authentication_ReqDtos.registration, reply: e.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const { account, session } = await sevice.registration(dto);
        cookieService.set_session_token_to_client_cookie(reply, session);
        const data = { account, session };
        const message = "Принято. Пользователь зарегистрирован и вошёл в систему";
        return xResponse.accepted(reply, { data, message });
    };

    check_username_availability = async (req: Authentication_ReqDtos.check_username_availability, reply: e.Response) => {
        const { dto: username } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        Logger.blue(username);
        const sr = await sevice.check_username_availability({ username });
        const data = sr;
        const message = "Проверка доступности имени пользователя";
        return xResponse.ok(reply, { data, message });
    };
    check_session = async (req: Authentication_ReqDtos.check_session, reply: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const data = auth;
        const message = "Ваша сессия";
        return xResponse.ok(reply, { data, message });
    };
    logout = async (req: Authentication_ReqDtos.logout, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { deleted_session_token } = await sevice.logout(auth.session.token, auth.session.by_account_id);
        const data = deleted_session_token;
        cookieService.remove_session_token_from_client_cookie(req, res, deleted_session_token);
        const message = "Этот сеанс успешно удален (выход из системы)";
        return xResponse.accepted(res, { message, data });
    };
})();

