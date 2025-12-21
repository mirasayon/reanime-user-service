import type { default as ExpressJS } from "express";
import { noImage_error_response } from "#/configs/frequent-errors.js";
import { BadRequestException } from "#/errors/client-side-exceptions.js";
import { avatarService } from "#/media/profile-avatar.service.js";
import { goReplyHttp } from "#/handlers/final-responder/all-http-responder.js";
import type { ResponseTypesForUserProfile } from "#/shared/response-patterns/profile.routes.js";
import { ControllerUtils } from "#/utilities/controller.js";
import { type Profile_ReqDtos } from "[www]/profile/profile.pipes.js";
import { Profile_Service as service } from "[www]/profile/profile.service.js";

export const Profile_Controller = new (class Profile_Controller {
    /** Controller for create one comment by profile */
    other_profiles = async (req: Profile_ReqDtos.other_profiles, res: ExpressJS.Response) => {
        const { dto: username } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await service.other_profiles(username);
        const data: ResponseTypesForUserProfile.view_other_profiles = sr;
        const message = "Информация профиля другого пользователя успешно получена";
        return goReplyHttp.ok(res, { data, message });
    };
    update_nickname = async (req: Profile_ReqDtos.update_name, res: ExpressJS.Response) => {
        const { auth, dto: new_nickname } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { updated_profile } = await service.update_nickname({ new_nickname, profile_id: auth.profile.id });
        const data: ResponseTypesForUserProfile.update_nickname = updated_profile;
        const message = "Ник успешно обновлен";
        return goReplyHttp.accepted(res, { data, message });
    };

    update_bio = async (req: Profile_ReqDtos.update_bio, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.edit_bio(dto, auth.profile.id);
        const data: ResponseTypesForUserProfile.update_bio = sr;
        const message = "Био успешно обновлена";
        return goReplyHttp.accepted(res, { data, message });
    };
    view_my_profile = async (req: Profile_ReqDtos.my_profile, res: ExpressJS.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const sr = await service.view_my_profile(auth.session.by_account_id);
        const data: ResponseTypesForUserProfile.view_my_profile = sr;
        const message = "Информация о текущем профиле пользователя успешно получена";
        return goReplyHttp.ok(res, { data, message });
    };

    set_avatar = async (req: Profile_ReqDtos.set_avatar, res: ExpressJS.Response) => {
        if (!req.file) {
            throw noImage_error_response;
        }
        const { file, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { id: profile_cuid } = auth.profile;
        await service.set_avatar_check(profile_cuid);
        if (!file) {
            throw new BadRequestException(["Файл для загрузки аватара отсутствует"]);
        }
        await avatarService.avatar_set({ profile_cuid, file });
        const { new_avatar } = await service.set_avatar(profile_cuid);
        const data: ResponseTypesForUserProfile.set_avatar = !!new_avatar.url;
        const message = "Аватарка успешно загружена";
        return goReplyHttp.accepted(res, { data, message });
    };

    delete_avatar = async (req: Profile_ReqDtos.delete_avatar, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        await service.__check_if_has_avatar_for_delete(auth.profile.id);
        const { deleted_avatar } = await service.delete_avatar(auth.profile.id);
        const data: ResponseTypesForUserProfile.delete_avatar = deleted_avatar;
        const message = "Аватарка пользователя успешно удалена";
        return goReplyHttp.accepted(res, { data, message });
    };
    update_avatar = async (req: Profile_ReqDtos.update_avatar, res: ExpressJS.Response) => {
        if (!req.file) {
            throw noImage_error_response;
        }
        const { auth, file } = ControllerUtils.check_dto_for_validity(req, ["auth"]);

        const { found_profile } = await service.__check_if_has_avatar(auth.profile.id);
        if (!file) {
            throw new BadRequestException(["Файл для загрузки аватара отсутствует"]);
        }
        await avatarService.avatar_update({ profile_cuid: auth.profile.id, file });
        const { updated_avatar } = await service.update_avatar(found_profile.id);
        const data: ResponseTypesForUserProfile.update_avatar = updated_avatar.url;
        const message = "Аватарка успешно обновлена";
        return goReplyHttp.accepted(res, { data, message });
    };
    avatar_view = async (req: Profile_ReqDtos.avatar_view, res: ExpressJS.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        return await service.avatar_view(dto, req, res);
    };
})();
