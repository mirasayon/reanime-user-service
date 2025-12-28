import { BadRequestException } from "#src/errors/client-side-exceptions.ts";
import type { ProfileAvatarPicture, UserAccount, UserProfile } from "#orm/client.ts";
import { profileRouteModel } from "#src/app/user-profile/user-profile.model.ts";
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
    view_my_profile = async (account_id: string) => {
        const found_profile = await profileRouteModel.find_by_account_id_AND_return_account_and_profile(account_id);
        return {
            account_type: found_profile.account.account_type,
            email: found_profile.account.email,
            username: found_profile.account.username,
            bio: found_profile.profile.bio,
            nickname: found_profile.profile.nickname,
        };
    };
    other_profiles = async (username: string): Promise<{ profile: UserProfile; avatar: ProfileAvatarPicture | null; account: UserAccount }> => {
        const found_account = await profileRouteModel.find_profile_by_username_AND_give_avatar_data(username);
        return found_account;
    };
}
export const profileRouteService = new Profile_Service_Class();
