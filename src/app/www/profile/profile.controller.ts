import type e from "express";
import { ControllerUtils } from "#/utils/controller.js";
import { type Profile_ReqDtos } from "[www]/profile/profile.pipes.js";
import { Profile_Service as service } from "[www]/profile/profile.service.js";
import { serviceUtils } from "#/utils/service.js";
import { xResponse } from "@xamarin.city/reanime/user-service/patterns/response/handlers.js";
import { BadRequestException } from "@xamarin.city/reanime/user-service/errors/client-side/exceptions.js";
import { MediaServerNotAvalableException } from "@xamarin.city/reanime/user-service/errors/server-side/exceptions.js";

export const Profile_Controller = new (class Profile_Controller {
    /** Controller for create one comment by user */
    other_profiles = async (req: Profile_ReqDtos.other_profiles, res: e.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await service.other_profiles(dto);
        const data = sr;
        return xResponse.accepted(res, { data, message: "Successfully retrieved user profile information" });
    };
    update_nickname = async (req: Profile_ReqDtos.update_name, res: e.Response) => {
        const { auth, dto: new_nickname } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { updated_profile } = await service.update_nickname({ new_nickname, profile_id: auth.profile.id });
        const data = updated_profile;
        return xResponse.accepted(res, { data, message: "Successfully updated user profile information" });
    };

    update_bio = async (req: Profile_ReqDtos.update_bio, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.edit_bio(dto, auth.profile.id);
        const data = sr;
        return xResponse.accepted(res, { data, message: "Successfully updated user profile information" });
    };
    my_profile = async (req: Profile_ReqDtos.my_profile, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const sr = await service.view_my_profile(auth.profile.id);
        const data = sr;
        return xResponse.ok(res, { data, message: "Successfully retrieved current user profile information" });
    };
    static noImage_error_response = new BadRequestException(["No file uploaded. Please upload an image file for the avatar."]);

    set_avatar = async (req: Profile_ReqDtos.set_avatar, res: e.Response) => {
        if (!req.file) {
            throw Profile_Controller.noImage_error_response;
        }
        const { file, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { id: profile_id } = auth.profile;

        await service.set_avatar_check(profile_id);

        const axios_res = await serviceUtils.post_to_media_server_for_SET_avatar(file, profile_id);
        if (!axios_res) {
            throw new MediaServerNotAvalableException("Media server did not respond with the expected data");
        }
        const { updated_profile } = await service.set_avatar({
            profile_id: auth.profile.id,
            avatar_hash: axios_res.data.avatar_hash,
        });
        const data = updated_profile.avatar_url_hash as string;
        return xResponse.accepted(res, {
            data,
            message: "Succesfully Uploaded pfp",
        });
    };

    delete_avatar = async (req: Profile_ReqDtos.delete_avatar, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);

        const { avatar_url_hash } = await service.__check_if_has_avatar_for_delete(auth.profile.id);
        const { updated_profile } = await service.delete_avatar(auth.profile.id, avatar_url_hash);
        const data = updated_profile;
        return xResponse.accepted(res, { data, message: "Succesfully deleted  pfp" });
    };
    update_avatar = async (req: Profile_ReqDtos.update_avatar, res: e.Response) => {
        if (!req.file) {
            throw Profile_Controller.noImage_error_response;
        }
        const { auth, file } = ControllerUtils.check_dto_for_validity(req, ["auth"]);

        const { avatar_url_hash } = await service.__check_if_has_avatar(auth.profile.id);
        const axios_res = await serviceUtils.post_to_media_server_for_UPDATE_avatar(file, auth.profile.id);
        if (!axios_res) {
            throw new MediaServerNotAvalableException("Media server did not respond with the expected data");
        }
        const { updated_profile } = await service.update_avatar({
            profile_id: auth.profile.id,
            avatar_hash: axios_res.data.avatar_hash,
        });
        const data = updated_profile.avatar_url_hash as string;
        return xResponse.accepted(res, {
            data,
            message: "Succesfully Updated Avatar Image",
        });
    };
})();

