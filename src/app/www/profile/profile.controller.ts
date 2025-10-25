import type e from "express";
import { ControllerUtils } from "#/utils/controller.js";
import { type Profile_ReqDtos } from "[www]/profile/profile.pipes.js";
import { Profile_Service as service } from "[www]/profile/profile.service.js";
import { serviceUtils } from "#/utils/service.js";
import { Reply } from "#/modules/response/handlers.js";
import { MediaServerNotAvalableException } from "#/modules/errors/server-side/exceptions.js";
import { incorrect_media, noImage_error_response } from "#/configs/frequent-errors.js";
import type { Profile_ResponseTypes } from "#/shared/response-patterns/profile.routes.js";
import { BadRequestException } from "#/modules/errors/client-side/exceptions.js";
import { avatarService } from "#/modules/media/app/profile-avatar.service.js";

export const Profile_Controller = new (class Profile_Controller {
    /** Controller for create one comment by profile */
    other_profiles = async (req: Profile_ReqDtos.other_profiles, res: e.Response) => {
        const { dto: username } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await service.other_profiles(username);
        const data: Profile_ResponseTypes.view_other_profiles = sr;
        const message = "Информация профиля другого пользователя успешно получена";
        return Reply.ok(res, { data, message });
    };
    update_nickname = async (req: Profile_ReqDtos.update_name, res: e.Response) => {
        const { auth, dto: new_nickname } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { updated_profile } = await service.update_nickname({ new_nickname, profile_id: auth.profile.id });
        const data: Profile_ResponseTypes.update_nickname = updated_profile;
        const message = "Ник успешно обновлен";
        return Reply.accepted(res, { data, message });
    };

    update_bio = async (req: Profile_ReqDtos.update_bio, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.edit_bio(dto, auth.profile.id);
        const data: Profile_ResponseTypes.update_bio = sr;
        const message = "Био успешно обновлена";
        return Reply.accepted(res, { data, message });
    };
    view_my_profile = async (req: Profile_ReqDtos.my_profile, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const sr = await service.view_my_profile(auth.session.by_account_id);
        const data: Profile_ResponseTypes.view_my_profile = sr;
        const message = "Информация о текущем профиле пользователя успешно получена";
        return Reply.ok(res, { data, message });
    };

    set_avatar = async (req: Profile_ReqDtos.set_avatar, res: e.Response) => {
        if (!req.file) {
            throw noImage_error_response;
        }
        const { file, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { id: profile_id } = auth.profile;
        await service.set_avatar_check(profile_id);
        if (!file) {
            throw new BadRequestException(["Файл для загрузки аватара отсутствует"]);
        }
        const axios_res = await serviceUtils.post_to_media_server_for_SET_avatar(file, profile_id);
        if (!axios_res) {
            throw new MediaServerNotAvalableException(incorrect_media);
        }
        const { new_avatar } = await service.set_avatar({
            profile_id: auth.profile.id,
            avatar_hash: axios_res.avatar_hash,
        });
        const data: Profile_ResponseTypes.set_avatar = new_avatar.url;
        const message = "Аватарка успешно загружена";
        return Reply.accepted(res, { data, message });
    };

    delete_avatar = async (req: Profile_ReqDtos.delete_avatar, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);

        const { avatar_url_hash } = await service.__check_if_has_avatar_for_delete(auth.profile.id);
        const { deleted_avatar } = await service.delete_avatar(auth.profile.id, avatar_url_hash);
        const data: Profile_ResponseTypes.delete_avatar = deleted_avatar;
        const message = "Аватарка успешно удалена";
        return Reply.accepted(res, { data, message });
    };
    update_avatar = async (req: Profile_ReqDtos.update_avatar, res: e.Response) => {
        if (!req.file) {
            throw noImage_error_response;
        }
        const { auth, file } = ControllerUtils.check_dto_for_validity(req, ["auth"]);

        const { avatar_url_hash } = await service.__check_if_has_avatar(auth.profile.id);
        if (!file) {
            throw new BadRequestException(["Файл для загрузки аватара отсутствует"]);
        }
        const axios_res = await serviceUtils.post_to_media_server_for_UPDATE_avatar(file, auth.profile.id);
        if (!axios_res) {
            throw new MediaServerNotAvalableException(incorrect_media);
        }
        const { updated_avatar } = await service.update_avatar({
            profile_id: auth.profile.id,
            avatar_hash: axios_res.avatar_hash,
        });
        const data: Profile_ResponseTypes.update_avatar = updated_avatar.url;
        const message = "Аватарка успешно обновлена";
        return Reply.accepted(res, { data, message });
    };
    avatar_view = async (req: Profile_ReqDtos.avatar_view, res: e.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        return await service.avatar_view(dto, req, res);
    };
})();
