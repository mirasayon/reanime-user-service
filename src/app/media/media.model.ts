import { prisma } from "#/databases/provider/database-connector.js";
import { NotFoundException } from "#/errors/client-side-exceptions.js";
import type { ProfileAvatarPicture } from "[orm]/client.js";
export type DataTypeForUploadOrUpdateAvatar = Omit<ProfileAvatarPicture, "id" | "created_at" | "updated_at">;
class MediaRouteModelClass {
    update_avatar_by_id = async (avatarData: DataTypeForUploadOrUpdateAvatar): Promise<ProfileAvatarPicture> => {
        return await prisma.profileAvatarPicture.update({
            where: {
                by_profile_id: avatarData.by_profile_id,
            },
            data: {
                height: avatarData.height,
                width: avatarData.width,
                path_dirname: avatarData.path_dirname,
                path_filename: avatarData.path_filename,
                size_bytes: avatarData.size_bytes,
                original_name: avatarData.original_name,
                mime_type: avatarData.mime_type,
                hash_algorithm_version: avatarData.hash_algorithm_version,
                file_hash: avatarData.file_hash,
            },
        });
    };
    set_avatar_by_id = async (avatarData: DataTypeForUploadOrUpdateAvatar): Promise<ProfileAvatarPicture> => {
        return await prisma.profileAvatarPicture.create({
            data: avatarData,
        });
    };

    find_avatar_by_profile_id = async (profile_id: string): Promise<ProfileAvatarPicture> => {
        const found_avatar = await prisma.profileAvatarPicture.findUnique({
            where: {
                by_profile_id: profile_id,
            },
        });
        if (!found_avatar) {
            throw new NotFoundException(["Аватар не найден для профиля"]);
        }
        return found_avatar;
    };
    delete_avatar_from_profile = async (profile_id: string): Promise<ProfileAvatarPicture> => {
        return await prisma.profileAvatarPicture.delete({
            where: {
                by_profile_id: profile_id,
            },
        });
    };

    delete_avatar_by_id = async (id: string): Promise<ProfileAvatarPicture> => {
        return await prisma.profileAvatarPicture.delete({
            where: {
                id: id,
            },
        });
    };
    delete_avatar_from_profile_if_exists = async (profile_id: string): Promise<void> => {
        const found_avatar = await prisma.profileAvatarPicture.findUnique({
            where: {
                by_profile_id: profile_id,
            },
        });
        if (!found_avatar) {
            return;
        }
        await prisma.profileAvatarPicture.delete({
            where: {
                id: found_avatar.id,
            },
        });
        return;
    };
}
export const mediaRouteModel = new MediaRouteModelClass();
