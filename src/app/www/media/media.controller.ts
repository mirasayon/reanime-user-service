import type { default as ExpressJS } from "express";
import { noImage_error_response } from "#/configs/frequent-errors.js";
import { BadRequestException } from "#/errors/client-side-exceptions.js";
import { goReplyHttp } from "#/handlers/final-responder/all-http-responder.js";
import type { ResponseTypesForUserProfile } from "#/shared/response-patterns/profile.routes.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import { type MediaRoutePipeDtos } from "[www]/media/media.pipes.js";
import { mediaRouteModels } from "[www]/media/media.service.js";
import { avatarService } from "./utils-media-route/profile-avatar.service.js";

class MediaRouteControllerClass {
    set_avatar = async (req: MediaRoutePipeDtos.set_avatar, res: ExpressJS.Response) => {
        if (!req.file) {
            throw noImage_error_response;
        }
        const { file, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const profile_cuid = sessionDto.profile_id;
        if (!file) {
            throw new BadRequestException(["Файл для загрузки аватара отсутствует"]);
        }
        const is_created = await mediaRouteModels.set_avatar(profile_cuid);
        await avatarService.avatar_set({ profile_cuid, file });
        const data: ResponseTypesForUserProfile.set_avatar = is_created;
        const message = "Аватарка успешно загружена";
        return goReplyHttp.accepted(res, { data, message });
    };

    delete_avatar = async (req: MediaRoutePipeDtos.delete_avatar, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const deleted_avatar = await mediaRouteModels.delete_avatar(sessionDto.profile_id);
        const data: ResponseTypesForUserProfile.delete_avatar = deleted_avatar;
        const message = "Аватарка пользователя успешно удалена";
        return goReplyHttp.accepted(res, { data, message });
    };
    update_avatar = async (req: MediaRoutePipeDtos.update_avatar, res: ExpressJS.Response) => {
        if (!req.file) {
            throw noImage_error_response;
        }
        const { sessionDto, file } = checkRequestForValidity(req, ["sessionDto"]);

        if (!file) {
            throw new BadRequestException(["Файл для загрузки аватара отсутствует"]);
        }
        const updated_avatar = await mediaRouteModels.update_avatar(sessionDto.profile_id);

        await avatarService.avatar_update({ profile_cuid: sessionDto.profile_id, file });
        const data: ResponseTypesForUserProfile.update_avatar = updated_avatar;
        const message = "Аватарка успешно обновлена";
        return goReplyHttp.accepted(res, { data, message });
    };
    avatar_view = async (req: MediaRoutePipeDtos.avatar_view, res: ExpressJS.Response) => {
        const { dto } = checkRequestForValidity(req, ["dto"]);
        return await mediaRouteModels.avatar_view(dto, req, res);
    };
}
export const mediaRouteController = new MediaRouteControllerClass();
