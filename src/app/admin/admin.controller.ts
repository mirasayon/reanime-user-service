import { goReplyHttp } from "#/handlers/all-http-responder.js";
import type { ResponseTypesForAdministratorSection } from "#/shared/user-service-response-types-for-all.routes.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import type { Administrator_ReqDtos } from "./admin.pipes.js";
import { adminSectionService } from "./admin.service.js";
import type ExpressJS from "express";
export const Administrator_Controller = new (class Administrator_Controller {
    get_all_users = async (req: Administrator_ReqDtos.get_all_users, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);

        const sr = await adminSectionService.get_all_users(sessionDto.account_id);
        const message = "Информация обо всех пользователях успешно получена.";
        const data: ResponseTypesForAdministratorSection.get_all_users = sr;
        return goReplyHttp.ok(res, { data, message });
    };
})();
