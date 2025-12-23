import type { default as ExpressJS } from "express";
import { BadRequestException } from "#/errors/client-side-exceptions.js";
import { goReplyHttp } from "#/handlers/all-http-responder.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import { type MediaRoutePipeDtos } from "#/app/media/media.pipes.js";
import { mediaRouteService } from "./media.service.js";
import { noImage_error_responseErrorMessage } from "#/constants/frequent-errors.js";
import type { ResponseTypesFor_Media_Section } from "#/shared/response-patterns-shared/media.response-types.routes.js";

class MediaRouteControllerClass {
    set_avatar = async (req: MediaRoutePipeDtos.set_avatar, res: ExpressJS.Response) => {
        if (!req.file) {
            throw noImage_error_responseErrorMessage;
        }
        const { file, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const profile_cuid = sessionDto.profile_id;
        if (!file) {
            throw new BadRequestException(["Файл для загрузки аватара отсутствует"]);
        }
        const is_created = await mediaRouteService.set_avatar(profile_cuid);
        await mediaRouteService.avatar_set({ profile_cuid, file });
        const data: ResponseTypesFor_Media_Section.set_avatar = is_created;
        const message = "Аватарка успешно загружена";
        return goReplyHttp.accepted(res, { data, message });
    };

    delete_avatar = async (req: MediaRoutePipeDtos.delete_avatar, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const deleted_avatar = await mediaRouteService.delete_avatar(sessionDto.profile_id);
        const data: ResponseTypesFor_Media_Section.delete_avatar = deleted_avatar;
        const message = "Аватарка пользователя успешно удалена";
        return goReplyHttp.accepted(res, { data, message });
    };
    update_avatar = async (req: MediaRoutePipeDtos.update_avatar, res: ExpressJS.Response) => {
        if (!req.file) {
            throw noImage_error_responseErrorMessage;
        }
        const { sessionDto, file } = checkRequestForValidity(req, ["sessionDto"]);

        if (!file) {
            throw new BadRequestException(["Файл для загрузки аватара отсутствует"]);
        }
        const updated_avatar = await mediaRouteService.update_avatar(sessionDto.profile_id);

        await mediaRouteService.avatar_update({ profile_cuid: sessionDto.profile_id, file });
        const data: ResponseTypesFor_Media_Section.update_avatar = updated_avatar;
        const message = "Аватарка успешно обновлена";
        return goReplyHttp.accepted(res, { data, message });
    };
    avatar_view = async (req: MediaRoutePipeDtos.avatar_view, res: ExpressJS.Response) => {
        const { dto } = checkRequestForValidity(req, ["dto"]);
        return await mediaRouteService.avatar_view(dto, req, res);
    };
}
export const mediaRouteController = new MediaRouteControllerClass();
