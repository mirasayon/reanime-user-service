import { goReplyHttp } from "#/handlers/final-responder/all-http-responder.js";
import type { ResponseTypesForAccount } from "#/shared/response-patterns/account.routes.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import type { default as ExpressJS } from "express";
import type { Account_ReqDtos } from "[www]/account/account.pipes.js";
import { Account_Service } from "[www]/account/account.service.js";

export const Account_Controller = new (class Account_Controller {
    explore_me = async (req: Account_ReqDtos.explore_me, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const sr = await Account_Service.explore_me(sessionDto.account_id);
        const message = "Информация об аккаунте успешно получена";
        const data: ResponseTypesForAccount.explore_me = sr;
        return goReplyHttp.ok(res, { data, message });
    };
    update_email = async (req: Account_ReqDtos.update_email, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["sessionDto", "dto"]);
        const { updated_account } = await Account_Service.update_email({ ...dto, by_account_id: sessionDto.account_id });
        const message = "Электронная почта успешно обновлена";
        const data: ResponseTypesForAccount.update_email = updated_account;
        return goReplyHttp.ok(res, { data, message });
    };

    set_email = async (req: Account_ReqDtos.set_email, res: ExpressJS.Response) => {
        const { sessionDto, dto: email } = checkRequestForValidity(req, ["sessionDto", "dto"]);
        const updated_account = await Account_Service.set_email({
            email,
            account_id: sessionDto.account_id,
        });
        const data: ResponseTypesForAccount.set_email = updated_account;
        const message = "Электронная почта успешно установлена";
        return goReplyHttp.ok(res, { data, message });
    };
    update_password = async (req: Account_ReqDtos.update_password, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["sessionDto", "dto"]);
        const is_updated_account = await Account_Service.update_password({
            new_password: dto.new_password,
            repeat_new_password: dto.repeat_new_password,
            current_password: dto.current_password,
            account_id: sessionDto.account_id,
        });
        const data: ResponseTypesForAccount.update_password = is_updated_account;
        const message = "Пароль успешно обновлен";
        return goReplyHttp.ok(res, { data, message });
    };
    update_username = async (req: Account_ReqDtos.update_username, res: ExpressJS.Response) => {
        const { sessionDto, dto: new_username } = checkRequestForValidity(req, ["sessionDto", "dto"]);
        const is_updated_username = await Account_Service.update_username({
            new_username,
            account_id: sessionDto.account_id,
        });
        const data: ResponseTypesForAccount.update_username = is_updated_username;
        const message = "Юзернейм успешно обновлен";
        return goReplyHttp.ok(res, { data, message });
    };
    get_sessions = async (req: Account_ReqDtos.get_sessions, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const { sessions } = await Account_Service.get_sessions(sessionDto.account_id);
        const data: ResponseTypesForAccount.get_sessions = sessions;
        const message = "Сеансы успешно получены";
        return goReplyHttp.ok(res, { data, message });
    };

    terminate_other_sessions = async (req: Account_ReqDtos.terminate_other_sessions, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const sr = await Account_Service.terminate_other_sessions(sessionDto.selector, sessionDto.account_id);
        const data: ResponseTypesForAccount.delete_all_other_sessions = sr;
        const message = "Все остальные сеансы (кроме этой) успешно удалены";
        return goReplyHttp.accepted(res, { data, message });
    };

    terminate_specific_session = async (req: Account_ReqDtos.terminate_specific_session, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["sessionDto", "dto"]);
        const sr = await Account_Service.terminate_specific_session(dto, sessionDto.account_id);
        const data: ResponseTypesForAccount.terminate_specific_session = sr;
        const message = "Указанный сеанс успешно удалён";
        return goReplyHttp.accepted(res, { data, message });
    };
    delete_account = async (req: Account_ReqDtos.delete_account, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const deleted_account = await Account_Service.delete_account(sessionDto.account_id);
        const data: ResponseTypesForAccount.delete_account = deleted_account;
        const message = "Аккаунт успешно удален, навсегда!";
        return goReplyHttp.accepted(res, { data, message });
    };
})();
