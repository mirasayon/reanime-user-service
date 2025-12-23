import { BadRequestException, NotFoundException } from "#/errors/client-side-exceptions.js";
import type { ProfileAvatarPicture, UserAccount, UserProfile } from "[orm]/client.js";
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
}
export const profileRouteService = new Profile_Service_Class();
