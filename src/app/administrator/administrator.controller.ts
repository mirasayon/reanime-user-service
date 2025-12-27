import { goReplyHttp } from "#/handlers/all-http-responder.js";
import type { ResponseTypesForAdministratorSection } from "#/shared/user-service-response-types-for-all.routes.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import type { AdministratorSectionRequestTypes } from "./administrator.pipes.js";
import { adminSectionService } from "./administrator.service.js";
import type ExpressJS from "express";
class AdministratorSectionControllerClass {
    get_all_users = async (req: AdministratorSectionRequestTypes["get_all_users"], res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);

        const sr = await adminSectionService.get_all_users(sessionDto.account_id);
        const message = "Информация обо всех пользователях успешно получена.";
        const data: ResponseTypesForAdministratorSection.get_all_users = sr;
        return goReplyHttp.ok(res, { data, message });
    };
}

export const administratorSectionController = new AdministratorSectionControllerClass();
