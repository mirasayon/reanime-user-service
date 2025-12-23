import { prisma } from "#/databases/providers/database-connect.js";
import type { iObjectCuid } from "#/shared/types/inputs/informative.types.js";
import type { ProfileAvatarPicture, UserAccount, UserProfile } from "[orm]/client.js";
class MediaRouteModelClass {
    update_avatar_by_id = async (profile_id: iObjectCuid, path: string, mime_type: string, size_bytes: number): Promise<ProfileAvatarPicture> => {
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
    set_avatar_by_id = async (profile_id: iObjectCuid, path: string, mime_type: string, size_bytes: number): Promise<ProfileAvatarPicture> => {
        return await prisma.profileAvatarPicture.create({
            data: {
                by_profile_id: profile_id,
                path,
                size_bytes,
                mime_type,
            },
        });
    };

    delete_avatar_from_profile = async (profile_id: iObjectCuid): Promise<ProfileAvatarPicture> => {
        return await prisma.profileAvatarPicture.delete({
            where: {
                by_profile_id: profile_id,
            },
        });
    };
}
export const mediaRouteModel = new MediaRouteModelClass();
