import { goReplyHttp } from "#/handlers/final-responder/all-http-responder.js";
import type { Administrator_ResponseTypes } from "#/shared/response-patterns/administrator.routes.js";
import { ControllerUtils } from "#/utilities/controller.js";
import type { Administrator_ReqDtos } from "./admin.pipes.js";
import { Admin_Service } from "./admin.service.js";
import type { default as ExpressJS } from "express";
export const Administrator_Controller = new (class Administrator_Controller {
    get_all_users = async (req: Administrator_ReqDtos.get_all_users, res: ExpressJS.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);

        const sr = await Admin_Service.get_all_users(auth.session.by_account_id);
        const message = "Информация обо всех пользователях успешно получена.";
        const data: Administrator_ResponseTypes.get_all_users = sr;
        return goReplyHttp.ok(res, { data, message });
    };
})();
