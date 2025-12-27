import { goReplyHttp } from "#/handlers/all-http-responder.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import type ExpressJS from "express";
import type { AccountSectionRequestWithDtoTypes } from "#/app/user-account/user-account.pipes.js";
import { accountRouteService } from "#/app/user-account/user-account.service.js";
import type { ResponseTypesFor_Account_Section } from "#/shared/user-service-response-types-for-all.routes.js";

class AccountRouteControllerClass {
    explore_me = async (req: AccountSectionRequestWithDtoTypes["explore_me"], res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const sr = await accountRouteService.explore_me(sessionDto.account_id);
        const message = "Информация об аккаунте успешно получена";
        const data: ResponseTypesFor_Account_Section.explore_me = sr;
        return goReplyHttp.ok(res, { data, message });
    };
    update_email = async (req: AccountSectionRequestWithDtoTypes["update_email"], res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["sessionDto", "dto"]);
        const is_updated_email = await accountRouteService.update_email({ ...dto, by_account_id: sessionDto.account_id });
        const message = "Электронная почта успешно обновлена";
        const data: ResponseTypesFor_Account_Section.update_email = is_updated_email;
        return goReplyHttp.ok(res, { data, message });
    };

    set_email = async (req: AccountSectionRequestWithDtoTypes["set_email"], res: ExpressJS.Response) => {
        const { sessionDto, dto: email } = checkRequestForValidity(req, ["sessionDto", "dto"]);
        const updated_account = await accountRouteService.set_email({
            email,
            account_id: sessionDto.account_id,
        });
        const data: ResponseTypesFor_Account_Section.set_email = updated_account;
        const message = "Электронная почта успешно установлена";
        return goReplyHttp.ok(res, { data, message });
    };
    update_password = async (req: AccountSectionRequestWithDtoTypes["update_password"], res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["sessionDto", "dto"]);
        const is_updated_account = await accountRouteService.update_password({
            new_password: dto.new_password,
            repeat_new_password: dto.repeat_new_password,
            current_password: dto.current_password,
            account_id: sessionDto.account_id,
        });
        const data: ResponseTypesFor_Account_Section.update_password = is_updated_account;
        const message = "Пароль успешно обновлен";
        return goReplyHttp.ok(res, { data, message });
    };
    update_username = async (req: AccountSectionRequestWithDtoTypes["update_username"], res: ExpressJS.Response) => {
        const { sessionDto, dto: new_username } = checkRequestForValidity(req, ["sessionDto", "dto"]);
        const is_updated_username = await accountRouteService.update_username({
            new_username,
            account_id: sessionDto.account_id,
        });
        const data: ResponseTypesFor_Account_Section.update_username = is_updated_username;
        const message = "Юзернейм успешно обновлен";
        return goReplyHttp.ok(res, { data, message });
    };
    get_sessions = async (req: AccountSectionRequestWithDtoTypes["get_sessions"], res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const { sessions } = await accountRouteService.get_sessions(sessionDto.account_id);
        const data: ResponseTypesFor_Account_Section.get_sessions = sessions;
        const message = "Сеансы успешно получены";
        return goReplyHttp.ok(res, { data, message });
    };

    terminate_other_sessions = async (req: AccountSectionRequestWithDtoTypes["terminate_other_sessions"], res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const sr = await accountRouteService.terminate_other_sessions(sessionDto.selector, sessionDto.account_id);
        const data: ResponseTypesFor_Account_Section.delete_all_other_sessions = sr;
        const message = "Все остальные сеансы (кроме этой) успешно удалены";
        return goReplyHttp.accepted(res, { data, message });
    };

    terminate_specific_session = async (req: AccountSectionRequestWithDtoTypes["terminate_specific_session"], res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["sessionDto", "dto"]);
        const sr = await accountRouteService.terminate_specific_session(dto, sessionDto.account_id);
        const data: ResponseTypesFor_Account_Section.terminate_specific_session = sr;
        const message = "Указанный сеанс успешно удалён";
        return goReplyHttp.accepted(res, { data, message });
    };
    delete_account = async (req: AccountSectionRequestWithDtoTypes["delete_account"], res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const deleted_account = await accountRouteService.delete_account(sessionDto.account_id);
        const data: ResponseTypesFor_Account_Section.delete_account = deleted_account;
        const message = "Аккаунт успешно удален, навсегда!";
        return goReplyHttp.accepted(res, { data, message });
    };
}
export const accountRouteController = new AccountRouteControllerClass();
