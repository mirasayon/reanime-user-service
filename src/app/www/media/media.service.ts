import { BadRequestException, NotFoundException } from "#/errors/client-side-exceptions.js";
import { mediaRouteModel } from "[www]/media/media.model.js";
import type { default as ExpressJS } from "express";
import { avatarService } from "./utils-media-route/profile-avatar.service.js";
import { profileRouteModel } from "[www]/profile/profile.model.js";
/** Service Class with all methods for comments */
class MediaRouteModelsClass {
    private checkIfUserHasAvatar = async (profile_id: string) => {
        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_id);

        if (!found_profile.avatar) {
            throw new BadRequestException(["Вам нужно установить аватар, но вы пытаетесь обновить"]);
        }
        return { found_profile };
    };

    private checkIfProfileHasAvatarForDeletingIt = async (profile_id: string) => {
        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_id);

        if (!found_profile.avatar) {
            throw new BadRequestException(["Аватар не найден"]);
        }
    };
    private checkIfUserALreadyHasAvatar = async (profile_id: string) => {
        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_id);
        if (found_profile.avatar) {
            throw new BadRequestException(["Вам нужно обновить аватар, но вы загружаете"]);
        }
    };
    set_avatar = async (profile_cuid: string): Promise<boolean> => {
        await this.checkIfUserALreadyHasAvatar(profile_cuid);

        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_cuid);
        if (found_profile.avatar) {
            throw new BadRequestException(["Вам нужно обновить аватар, но вы загружаете"]);
        }
        const username = (await profileRouteModel.find_by_account_id_AND_return_account_and_profile(found_profile.by_account_id)).account.username;
        const new_avatar = await mediaRouteModel.set_avatar_by_id(found_profile.id, username, "", 1);
        return !!new_avatar;
    };
    update_avatar = async (profile_id: string): Promise<boolean> => {
        const { found_profile } = await this.checkIfUserHasAvatar(profile_id);
        const username = (await profileRouteModel.find_by_account_id_AND_return_account_and_profile(found_profile.by_account_id)).account.username;
        const updated_avatar = await mediaRouteModel.update_avatar_by_id(found_profile.id, username, "", 1);
        return !!updated_avatar;
    };

    delete_avatar = async (profile_id: string): Promise<boolean> => {
        await this.checkIfProfileHasAvatarForDeletingIt(profile_id);

        await avatarService.avatar_delete(profile_id);
        const deleted_avatar = await mediaRouteModel.delete_avatar_from_profile(profile_id);
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
export const mediaRouteModels = new MediaRouteModelsClass();
