import type { default as ExpressJS } from "express";
import { noImage_error_response } from "#/configs/frequent-errors.js";
import { BadRequestException } from "#/errors/client-side-exceptions.js";
import { avatarService } from "#/media/profile-avatar.service.js";
import { goReplyHttp } from "#/handlers/final-responder/all-http-responder.js";
import type { ResponseTypesForUserProfile } from "#/shared/response-patterns/profile.routes.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import { type Profile_ReqDtos } from "[www]/profile/profile.pipes.js";
import { profileRouteService } from "[www]/profile/profile.service.js";

class Profile_ControllerClass {
    /** Просмотр других профилей пользователя */
    other_profiles = async (req: Profile_ReqDtos.other_profiles, res: ExpressJS.Response) => {
        const { dto: username } = checkRequestForValidity(req, ["dto"]);
        const sr = await profileRouteService.other_profiles(username);
        const data: ResponseTypesForUserProfile.view_other_profiles = sr;
        const message = "Информация профиля другого пользователя успешно получена";
        return goReplyHttp.ok(res, { data, message });
    };
    /** Обновление никнейма пользователя */
    update_nickname = async (req: Profile_ReqDtos.update_name, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const updated_profile = await profileRouteService.update_nickname({ new_nickname: dto, profile_id: sessionDto.profile_id });
        const data: ResponseTypesForUserProfile.update_nickname = updated_profile;
        const message = "Ник успешно обновлен";
        return goReplyHttp.accepted(res, { data, message });
    };

    update_bio = async (req: Profile_ReqDtos.update_bio, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await profileRouteService.edit_bio(dto, sessionDto.profile_id);
        const data: ResponseTypesForUserProfile.update_bio = sr;
        const message = "Био успешно обновлена";
        return goReplyHttp.accepted(res, { data, message });
    };
    view_my_profile = async (req: Profile_ReqDtos.my_profile, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const sr = await profileRouteService.view_my_profile(sessionDto.account_id);
        const data: ResponseTypesForUserProfile.view_my_profile = sr;
        const message = "Информация о текущем профиле пользователя успешно получена";
        return goReplyHttp.ok(res, { data, message });
    };

    set_avatar = async (req: Profile_ReqDtos.set_avatar, res: ExpressJS.Response) => {
        if (!req.file) {
            throw noImage_error_response;
        }
        const { file, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const profile_cuid = sessionDto.profile_id;
        if (!file) {
            throw new BadRequestException(["Файл для загрузки аватара отсутствует"]);
        }
        const is_created = await profileRouteService.set_avatar(profile_cuid);
        await avatarService.avatar_set({ profile_cuid, file });
        const data: ResponseTypesForUserProfile.set_avatar = is_created;
        const message = "Аватарка успешно загружена";
        return goReplyHttp.accepted(res, { data, message });
    };

    delete_avatar = async (req: Profile_ReqDtos.delete_avatar, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const deleted_avatar = await profileRouteService.delete_avatar(sessionDto.profile_id);
        const data: ResponseTypesForUserProfile.delete_avatar = deleted_avatar;
        const message = "Аватарка пользователя успешно удалена";
        return goReplyHttp.accepted(res, { data, message });
    };
    update_avatar = async (req: Profile_ReqDtos.update_avatar, res: ExpressJS.Response) => {
        if (!req.file) {
            throw noImage_error_response;
        }
        const { sessionDto, file } = checkRequestForValidity(req, ["sessionDto"]);

        if (!file) {
            throw new BadRequestException(["Файл для загрузки аватара отсутствует"]);
        }
        const updated_avatar = await profileRouteService.update_avatar(sessionDto.profile_id);

        await avatarService.avatar_update({ profile_cuid: sessionDto.profile_id, file });
        const data: ResponseTypesForUserProfile.update_avatar = updated_avatar;
        const message = "Аватарка успешно обновлена";
        return goReplyHttp.accepted(res, { data, message });
    };
    avatar_view = async (req: Profile_ReqDtos.avatar_view, res: ExpressJS.Response) => {
        const { dto } = checkRequestForValidity(req, ["dto"]);
        return await profileRouteService.avatar_view(dto, req, res);
    };
}
export const Profile_Controller = new Profile_ControllerClass();
