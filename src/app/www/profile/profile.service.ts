import { serviceUtils } from "#/utils/service.js";
import { BadRequestException, NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import { Profile_Model as model } from "[www]/profile/profile.model.js";
import type { Account, AvatarPicture, Profile } from "#/databases/orm/client.js";
import { avatarService } from "#/modules/media/app/profile-avatar.service.js";
import type e from "express";

/** Service Class with all methods for comments */
export const Profile_Service = new (class Profile_Service {
    edit_bio = async (new_bio: string, profile_id: string) => {
        const found_profile = await model.find_profile_by_its_id(profile_id);
        if (new_bio === found_profile.bio) {
            throw new BadRequestException(["Текущий био и новый совпадают"]);
        }
        const updated_profile = await model.update_bio_by_id(found_profile.id, new_bio);
        return updated_profile;
    };

    update_nickname = async ({ new_nickname, profile_id }: { new_nickname: string; profile_id: string }) => {
        const found_profile = await model.find_profile_by_its_id(profile_id);
        if (new_nickname === found_profile.nickname) {
            throw new BadRequestException(["Текущий никнейм и новый совпадают"]);
        }
        const updated_profile = await model.update_nickname_by_id(found_profile.id, new_nickname);
        return { updated_profile };
    };
    view_my_profile = async (accound_id: string): Promise<{ account: Account; profile: Profile }> => {
        const found_profile = await model.find_by_account_id_AND_return_account_and_profile(accound_id);

        return found_profile;
    };
    other_profiles = async (username: string): Promise<{ profile: Profile; account: Account }> => {
        const found_account = await model.find_profile_by_username(username);

        return found_account;
    };
    readonly __check_if_has_avatar = async (profile_id: string) => {
        const found_profile = await model.find_profile_by_its_id_with_avatar_data(profile_id);

        if (!found_profile.avatar) {
            throw new BadRequestException(["Вам нужно установить аватар, но вы пытаетесь обновить"]);
        }
        return { avatar_url_hash: found_profile.avatar.url, id: found_profile.id };
    };

    readonly __check_if_has_avatar_for_delete = async (profile_id: string) => {
        const found_profile = await model.find_profile_by_its_id_with_avatar_data(profile_id);

        if (!found_profile.avatar) {
            throw new BadRequestException(["Аватар не найден"]);
        }
        return { avatar_url_hash: found_profile.avatar.url };
    };
    set_avatar_check = async (profile_id: string) => {
        const found_profile = await model.find_profile_by_its_id_with_avatar_data(profile_id);
        if (found_profile.avatar) {
            throw new BadRequestException(["Вам нужно обновить аватар, но вы загружаете"]);
        }
    };
    set_avatar = async (data: { profile_id: string; avatar_hash: string }): Promise<{ new_avatar: AvatarPicture }> => {
        const found_profile = await model.find_profile_by_its_id_with_avatar_data(data.profile_id);
        if (found_profile.avatar) {
            throw new BadRequestException(["Вам нужно обновить аватар, но вы загружаете"]);
        }
        const new_avatar = await model.set_avatar_by_id(found_profile.id, data.avatar_hash);
        return { new_avatar };
    };
    update_avatar = async (data: { profile_id: string; avatar_hash: string }): Promise<{ updated_avatar: AvatarPicture }> => {
        const found_profile = await this.__check_if_has_avatar(data.profile_id);
        const updated_avatar = await model.update_avatar_by_id(found_profile.id, data.avatar_hash);
        return { updated_avatar };
    };

    delete_avatar = async (profile_id: string, avatar_hash: string): Promise<{ deleted_avatar: AvatarPicture }> => {
        await serviceUtils.request_to_media_service_to_delete_avatar(profile_id, avatar_hash);
        const deleted_avatar = await model.delete_avatar_from_profile(profile_id);
        return { deleted_avatar };
    };
    avatar_view = async (username: string, req: e.Request, res: e.Response) => {
        const foundProfile = await model.find_profile_by_username(username);
        if (!foundProfile) {
            throw new NotFoundException(["Пользователь с таким юзернеймом не найден"]);
        }
        const avatarData = await model.find_profile_by_its_id_with_avatar_data(foundProfile.profile.id);
        if (!avatarData.avatar) {
            throw new NotFoundException(["Аватарка этого ползователя не найдена"]);
        }
        return await avatarService.serveAvatarImage(avatarData.avatar.by_profile_id, req, res);
    };
})();
