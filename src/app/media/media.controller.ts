import type ExpressJS from "express";
import { goReplyHttp } from "#src/handlers/all-http-responder.ts";
import { checkRequestForValidity } from "#src/utilities/controller-utility-functions.ts";
import { type MediaSectionRequestDtoType } from "#src/app/media/media.pipes.ts";
import { mediaSectionService } from "./media.service.ts";
import { noImage_error_responseErrorObj } from "#src/constants/frequent-errors.ts";
import type { ResponseTypesFor_Media_Section } from "#src/shared/user-service-response-types-for-all.routes.ts";

class MediaSectionControllerClass {
    set_avatar = async (req: MediaSectionRequestDtoType["set_avatar"], res: ExpressJS.Response) => {
        const { file, sessionDto } = checkRequestForValidity(req, ["file", "sessionDto"]);
        if (!file) {
            throw noImage_error_responseErrorObj;
        }
        const isCreated = await mediaSectionService.set_avatar(sessionDto.profile_id, file);
        const data: ResponseTypesFor_Media_Section["set_avatar"] = isCreated;
        const message = "Аватарка успешно загружена";
        return goReplyHttp.accepted(res, { data, message });
    };

    delete_avatar = async (req: MediaSectionRequestDtoType["delete_avatar"], res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const deleted_avatar = await mediaSectionService.delete_avatar(sessionDto.profile_id);
        const data: ResponseTypesFor_Media_Section["delete_avatar"] = deleted_avatar;
        const message = "Аватарка пользователя успешно удалена";
        return goReplyHttp.accepted(res, { data, message });
    };
    update_avatar = async (req: MediaSectionRequestDtoType["update_avatar"], res: ExpressJS.Response) => {
        const { sessionDto, file } = checkRequestForValidity(req, ["sessionDto", "file"]);
        if (!file) {
            throw noImage_error_responseErrorObj;
        }

        const updated_avatar = await mediaSectionService.update_avatar(sessionDto.profile_id, file);
        const data: ResponseTypesFor_Media_Section["update_avatar"] = updated_avatar;
        const message = "Аватарка успешно обновлена";
        return goReplyHttp.accepted(res, { data, message });
    };
    avatar_view_by_username = async (req: MediaSectionRequestDtoType["avatar_view_by_username"], res: ExpressJS.Response) => {
        const { dto } = checkRequestForValidity(req, ["dto"]);
        return await mediaSectionService.avatar_view_by_username(dto, req, res);
    };
}
export const mediaSectionController = new MediaSectionControllerClass();
