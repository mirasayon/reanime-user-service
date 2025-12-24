import { prisma } from "#/databases/provider/database-connector.js";
import { NotFoundException } from "#/errors/client-side-exceptions.js";
import type { DbCuidType } from "#/shared/types-shared/informative-input-types-shared.js";
import type { ProfileAvatarPicture, UserAccount, UserProfile } from "[orm]/client.js";
class MediaRouteModelClass {
    update_avatar_by_id = async (profile_id: DbCuidType, path: string, mime_type: string, size_bytes: number): Promise<ProfileAvatarPicture> => {
        return await prisma.profileAvatarPicture.update({
            where: {
                by_profile_id: profile_id,
            },
            data: {
                path,
                size_bytes,
                mime_type,
            },
        });
    };
    set_avatar_by_id = async (profile_id: DbCuidType, path: string, mime_type: string, size_bytes: number): Promise<ProfileAvatarPicture> => {
        return await prisma.profileAvatarPicture.create({
            data: {
                by_profile_id: profile_id,
                path,
                size_bytes,
                mime_type,
            },
        });
    };

    find_avatar_by_profile_id = async (profile_id: DbCuidType): Promise<ProfileAvatarPicture> => {
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
    delete_avatar_from_profile = async (profile_id: DbCuidType): Promise<ProfileAvatarPicture> => {
        return await prisma.profileAvatarPicture.delete({
            where: {
                by_profile_id: profile_id,
            },
        });
    };

    delete_avatar_from_profile_if_exists = async (profile_id: DbCuidType): Promise<void> => {
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
