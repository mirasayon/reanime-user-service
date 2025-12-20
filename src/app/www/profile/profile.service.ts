import type { AvatarPicture, UserAccount, UserProfile } from "#/databases/orm/client.js";
import { BadRequestException, NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import { avatarService } from "#/modules/media/app/profile-avatar.service.js";
import { Profile_Model as model } from "[www]/profile/profile.model.js";
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
    view_my_profile = async (account_id: string): Promise<{ account: UserAccount; profile: UserProfile & { avatar: AvatarPicture | null } }> => {
        const found_profile = await model.find_by_account_id_AND_return_account_and_profile(account_id);

        return found_profile;
    };
    other_profiles = async (
        username: string,
    ): Promise<{ profile: UserProfile & { avatar: AvatarPicture | null }; account: Omit<UserAccount, "password_hash"> }> => {
        const found_account = await model.find_profile_by_username_AND_give_avatar_data(username);

        return found_account;
    };
    readonly __check_if_has_avatar = async (profile_id: string) => {
        const found_profile = await model.find_profile_by_its_id_with_avatar_data(profile_id);

        if (!found_profile.avatar) {
            throw new BadRequestException(["Вам нужно установить аватар, но вы пытаетесь обновить"]);
        }
        return { found_profile };
    };

    readonly __check_if_has_avatar_for_delete = async (profile_id: string) => {
        const found_profile = await model.find_profile_by_its_id_with_avatar_data(profile_id);

        if (!found_profile.avatar) {
            throw new BadRequestException(["Аватар не найден"]);
        }
    };
    set_avatar_check = async (profile_id: string) => {
        const found_profile = await model.find_profile_by_its_id_with_avatar_data(profile_id);
        if (found_profile.avatar) {
            throw new BadRequestException(["Вам нужно обновить аватар, но вы загружаете"]);
        }
    };
    set_avatar = async (profile_cuid: string): Promise<{ new_avatar: AvatarPicture }> => {
        const found_profile = await model.find_profile_by_its_id_with_avatar_data(profile_cuid);
        if (found_profile.avatar) {
            throw new BadRequestException(["Вам нужно обновить аватар, но вы загружаете"]);
        }
        const username = (await model.find_by_account_id_AND_return_account_and_profile(found_profile.by_account_id)).userAccount.username;
        const new_avatar = await model.set_avatar_by_id(found_profile.id, username);
        return { new_avatar };
    };
    update_avatar = async (profile_id: string): Promise<{ updated_avatar: AvatarPicture }> => {
        const { found_profile } = await this.__check_if_has_avatar(profile_id);
        const username = (await model.find_by_account_id_AND_return_account_and_profile(found_profile.by_account_id)).userAccount.username;
        const updated_avatar = await model.update_avatar_by_id(found_profile.id, username);
        return { updated_avatar };
    };

    delete_avatar = async (profile_id: string): Promise<{ deleted_avatar: AvatarPicture }> => {
        await avatarService.avatar_delete(profile_id);
        const deleted_avatar = await model.delete_avatar_from_profile(profile_id);
        return { deleted_avatar };
    };
    avatar_view = async (username: string, req: e.Request, res: e.Response) => {
        const foundProfile = await model.find_profile_by_username(username);
        if (!foundProfile) {
            throw new NotFoundException(["Пользователь с таким юзернеймом не найден"]);
        }
        const avatarData = await model.find_profile_by_its_id_with_avatar_data(foundProfile.userProfile.id);
        if (!avatarData.avatar) {
            return res.redirect("/default-avatar/m.jpg");
        }
        return await avatarService.serveAvatarImage(avatarData.avatar.by_profile_id, req, res);
    };
})();
