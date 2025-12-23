import { goReplyHttp } from "#/handlers/all-http-responder.js";
import type { Administrator_ResponseTypes } from "#/shared/response-patterns-shared/administrator.routes.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import type { Administrator_ReqDtos } from "./admin.pipes.js";
import { Admin_Service } from "./admin.service.js";
import type { default as ExpressJS } from "express";
export const Administrator_Controller = new (class Administrator_Controller {
    get_all_users = async (req: Administrator_ReqDtos.get_all_users, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);

        const sr = await Admin_Service.get_all_users(sessionDto.account_id);
        const message = "Информация обо всех пользователях успешно получена.";
        const data: Administrator_ResponseTypes.get_all_users = sr;
        return goReplyHttp.ok(res, { data, message });
    };
})();
