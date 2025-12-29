import { goReplyHttp } from "#src/handlers/all-http-responder.ts";
import type { ResponseTypesForAdministratorSection } from "#src/shared/user-service-response-types-for-all.routes.ts";
import { checkRequestForValidity } from "#src/utilities/controller-utility-functions.ts";
import type { AdministratorSectionRequestTypes } from "./administration.pipes.ts";
import { AdministrationSectionService } from "./administration.service.ts";
import type ExpressJS from "express";
class AdministrationSectionControllerClass {
    get_all_users = async (req: AdministratorSectionRequestTypes["get_all_users"], res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);

        const sr = await AdministrationSectionService.get_all_users(sessionDto.account_id);
        const message = "Информация обо всех пользователях успешно получена.";
        const data: ResponseTypesForAdministratorSection["get_all_users"] = sr;
        return goReplyHttp.ok(res, { data, message });
    };
}

export const AdministrationSectionController = new AdministrationSectionControllerClass();
