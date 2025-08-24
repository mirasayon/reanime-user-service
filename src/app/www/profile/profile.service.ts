import { serviceUtils } from "#/utils/service.js";
import { BadRequestException, NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import { Profile_Model as model } from "[www]/profile/profile.model.js";
import type { Account, Profile } from "#/db/orm/client.js";

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
        const found_profile = await model.find_profile_by_its_id(profile_id);

        if (!found_profile.avatar_url_hash) {
            throw new BadRequestException(["Вам нужно установить аватар, но вы пытаетесь обновить"]);
        }
        return { avatar_url_hash: found_profile.avatar_url_hash, id: found_profile.id };
    };

    readonly __check_if_has_avatar_for_delete = async (profile_id: string) => {
        const found_profile = await model.find_profile_by_its_id(profile_id);

        if (!found_profile.avatar_url_hash) {
            throw new BadRequestException(["Аватар не найден"]);
        }
        return { avatar_url_hash: found_profile.avatar_url_hash };
    };
    set_avatar_check = async (profile_id: string) => {
        const found_profile = await model.find_profile_by_its_id(profile_id);
        if (found_profile.avatar_url_hash) {
            throw new BadRequestException(["Вам нужно обновить аватар, но вы загружаете"]);
        }
    };
    set_avatar = async (data: { profile_id: string; avatar_hash: string }) => {
        const found_profile = await model.find_profile_by_its_id(data.profile_id);
        if (found_profile.avatar_url_hash) {
            throw new BadRequestException(["Вам нужно обновить аватар, но вы загружаете"]);
        }
        const updated_profile = await model.update_avatar_by_id(found_profile.id, data.avatar_hash);
        return { updated_profile };
    };
    update_avatar = async (data: { profile_id: string; avatar_hash: string }) => {
        // const found_profile = await model.find_profile_by_its_id(data.profile_id);

        const found_profile = await this.__check_if_has_avatar(data.profile_id);
        // if (!found_profile.avatar_url_hash) {
        //     throw new Client_Side_Exception(["You need to set the avatar but are trying to upload"], "BAD_REQUEST");
        // }
        const updated_profile = await model.update_avatar_by_id(found_profile.id, data.avatar_hash);
        return { updated_profile };
    };

    delete_avatar = async (profile_id: string, avatar_hash: string) => {
        await serviceUtils.request_to_media_service_to_delete_avatar(profile_id, avatar_hash);
        const updated_profile = await model.delete_avatar_from_profile(profile_id);
        return { updated_profile };
    };
})();

