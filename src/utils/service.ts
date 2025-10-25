import { avatarService } from "#/modules/media/app/profile-avatar.service.js";

type Example_of_media_service_response = {
    avatar_hash: string;
};
export const serviceUtils = new (class ServiceUtils {
    /** Posts to media Service for setting picture for profile*/
    post_to_media_server_for_SET_avatar = async (file: Express.Multer.File, profile_cuid: string) => {
        const res = await avatarService.avatar_set({ profile_cuid, file });
        return res;
    };
    /** Posts to media Service */
    post_to_media_server_for_UPDATE_avatar = async (file: Express.Multer.File, profile_cuid: string) => {
        const res = await avatarService.avatar_update({ profile_cuid, file });
        return res;
    };
})();
