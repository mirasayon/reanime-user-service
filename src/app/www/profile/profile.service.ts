import { BadRequestException, NotFoundException } from "#/errors/client-side-exceptions.js";
import { avatarService } from "#/media/profile-avatar.service.js";
import type { ProfileAvatarPicture, UserAccount, UserProfile } from "[orm]";
import { profileRouteModel } from "[www]/profile/profile.model.js";
import type { default as ExpressJS } from "express";
/** Service Class with all methods for comments */
class Profile_Service_Class {
    edit_bio = async (new_bio: string, profile_id: string): Promise<boolean> => {
        const found_profile = await profileRouteModel.find_profile_by_its_id(profile_id);
        if (new_bio === found_profile.bio) {
            throw new BadRequestException(["Текущий био и новый совпадают"]);
        }
        const updated_profile = await profileRouteModel.update_bio_by_id(found_profile.id, new_bio);
        return !!updated_profile;
    };

    update_nickname = async ({ new_nickname, profile_id }: { new_nickname: string; profile_id: string }): Promise<boolean> => {
        const found_profile = await profileRouteModel.find_profile_by_its_id(profile_id);
        if (new_nickname === found_profile.nickname) {
            throw new BadRequestException(["Текущий никнейм и новый совпадают"]);
        }
        const updated_profile = await profileRouteModel.update_nickname_by_id(found_profile.id, new_nickname);
        return !!updated_profile;
    };
    view_my_profile = async (
        account_id: string,
    ): Promise<{ account: UserAccount; profile: UserProfile & { avatar: ProfileAvatarPicture | null } }> => {
        const found_profile = await profileRouteModel.find_by_account_id_AND_return_account_and_profile(account_id);

        return found_profile;
    };
    other_profiles = async (username: string): Promise<{ profile: UserProfile; avatar: ProfileAvatarPicture | null; account: UserAccount }> => {
        const found_account = await profileRouteModel.find_profile_by_username_AND_give_avatar_data(username);
        return found_account;
    };
    readonly __check_if_has_avatar = async (profile_id: string) => {
        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_id);

        if (!found_profile.avatar) {
            throw new BadRequestException(["Вам нужно установить аватар, но вы пытаетесь обновить"]);
        }
        return { found_profile };
    };

    readonly __check_if_has_avatar_for_delete = async (profile_id: string) => {
        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_id);

        if (!found_profile.avatar) {
            throw new BadRequestException(["Аватар не найден"]);
        }
    };
    set_avatar_check = async (profile_id: string) => {
        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_id);
        if (found_profile.avatar) {
            throw new BadRequestException(["Вам нужно обновить аватар, но вы загружаете"]);
        }
    };
    set_avatar = async (profile_cuid: string): Promise<boolean> => {
        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_cuid);
        if (found_profile.avatar) {
            throw new BadRequestException(["Вам нужно обновить аватар, но вы загружаете"]);
        }
        const username = (await profileRouteModel.find_by_account_id_AND_return_account_and_profile(found_profile.by_account_id)).account.username;
        const new_avatar = await profileRouteModel.set_avatar_by_id(found_profile.id, username, "", 1);
        return !!new_avatar;
    };
    update_avatar = async (profile_id: string): Promise<boolean> => {
        const { found_profile } = await this.__check_if_has_avatar(profile_id);
        const username = (await profileRouteModel.find_by_account_id_AND_return_account_and_profile(found_profile.by_account_id)).account.username;
        const updated_avatar = await profileRouteModel.update_avatar_by_id(found_profile.id, username, "", 1);
        return !!updated_avatar;
    };

    delete_avatar = async (profile_id: string): Promise<boolean> => {
        await avatarService.avatar_delete(profile_id);
        const deleted_avatar = await profileRouteModel.delete_avatar_from_profile(profile_id);
        return !!deleted_avatar;
    };
    avatar_view = async (username: string, req: ExpressJS.Request, res: ExpressJS.Response) => {
        const foundProfile = await profileRouteModel.find_profile_by_username(username);
        if (!foundProfile) {
            throw new NotFoundException(["Пользователь с таким юзернеймом не найден"]);
        }
        const avatarData = await profileRouteModel.find_profile_by_its_id_with_avatar_data(foundProfile.profile.id);
        if (!avatarData.avatar) {
            return res.redirect("/default-avatar/m.jpg");
        }
        return await avatarService.serveAvatarImage(avatarData.avatar.by_profile_id, req, res);
    };
}
export const Profile_Service = new Profile_Service_Class();
