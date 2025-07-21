import { ControllerUtils } from "#/utils/controller.js";
import { xResponse } from "@xamarin.city/reanime/user-service/patterns/response/handlers.js";
import { Account_Service as service } from "[www]/account/account.service.js";
import type { Account_ReqDtos } from "[www]/account/account.pipes.js";
import type e from "express";
export const Account_Controller = new (class Account_Controller {
    explore_me = async (req: Account_ReqDtos.explore_me, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const sr = await service.explore_me(auth.session.by_account_id);
        const message = "Информация об аккаунте успешно получена";
        const data = sr;
        return xResponse.ok(res, { data, message });
    };
    update_email = async (req: Account_ReqDtos.update_email, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["auth", "dto"]);
        const { updated_user } = await service.update_email({
            old_email: dto.current_email,
            new_email: dto.new_email,
            user_id: auth.session.by_account_id,
        });
        const message = "Электронная почта успешно обновлена";
        const data = updated_user;
        return xResponse.ok(res, { data, message });
    };

    set_email = async (req: Account_ReqDtos.set_email, res: e.Response) => {
        const { auth, dto: email } = ControllerUtils.check_dto_for_validity(req, ["auth", "dto"]);
        const { updated_user } = await service.set_email({
            email,
            account_id: auth.session.by_account_id,
        });
        const data = updated_user;
        const message = "Электронная почта успешно установлена";
        return xResponse.ok(res, { data, message });
    };
    update_password = async (req: Account_ReqDtos.update_password, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["auth", "dto"]);
        const { updated_user } = await service.update_password({
            new_password: dto.new_password,
            current_password: dto.current_password,
            account_id: auth.session.by_account_id,
        });
        const data = updated_user;
        const message = "Пароль успешно обновлен";
        return xResponse.ok(res, { data, message });
    };
    update_username = async (req: Account_ReqDtos.update_username, res: e.Response) => {
        const { auth, dto: new_username } = ControllerUtils.check_dto_for_validity(req, ["auth", "dto"]);
        const { updated_account } = await service.update_username({
            new_username,
            account_id: auth.session.by_account_id,
        });
        const data = updated_account;
        const message = "Имя пользователя успешно обновлено";
        return xResponse.ok(res, { data, message });
    };
    get_sessions = async (req: Account_ReqDtos.get_sessions, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { sessions } = await service.get_sessions(auth.session.by_account_id);
        const data = sessions;
        const message = "Сеансы успешно получены";
        return xResponse.ok(res, { data, message });
    };

    delete_all_other_sessions = async (req: Account_ReqDtos.delete_all_other_sessions, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const sr = await service.delete_all_other_sessions(auth.session.token, auth.session.by_account_id);
        const data = sr;
        const message = "Все остальные сеансы (кроме этой) успешно удалены";
        return xResponse.accepted(res, { data, message });
    };
    delete_account_permanent = async (req: Account_ReqDtos.delete_account, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { deleted_account } = await service.delete_account_permanent(auth.session.by_account_id);

        const data = deleted_account;
        const message = "Аккаунт успешно удален";
        return xResponse.accepted(res, { data, message });
    };
})();
