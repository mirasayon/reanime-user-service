import { prisma } from "#/providers/database-connect.js";
import { NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import type { iObjectCuid } from "#/shared/types/inputs/informative.types.js";
import type { Account, AvatarPicture, Profile } from "#/databases/orm/client.js";

export const Profile_Model = new (class Profile_Model {
    find_profile_by_its_id = async (profile_id: iObjectCuid) => {
        const found_profile = await prisma.profile.findUnique({
            where: {
                id: profile_id,
            },
        });
        if (!found_profile) {
            throw new NotFoundException(["Профиль не найден"]);
        }
        return found_profile;
    };
    find_profile_by_its_id_with_avatar_data = async (profile_id: iObjectCuid) => {
        const found_profile = await prisma.profile.findUnique({
            where: {
                id: profile_id,
            },
            include: { avatar: true },
        });
        if (!found_profile) {
            throw new NotFoundException(["Профиль не найден"]);
        }
        return found_profile;
    };
    find_profile_by_username = async (username: iObjectCuid): Promise<{ account: Account; profile: Profile }> => {
        const account = await prisma.account.findUnique({
            where: { username },
        });

        if (!account) {
            throw new NotFoundException(["Аккаунт с таким айди не найден"]);
        }
        const profile = await prisma.profile.findUnique({
            where: {
                by_account_id: account.id,
            },
        });
        if (!profile) {
            throw new NotFoundException(["Профиль с таким аккант айди не найден"]);
        }
        return { account, profile };
    };

    find_by_account_id_AND_return_account_and_profile = async (accound_id: iObjectCuid): Promise<{ account: Account; profile: Profile }> => {
        const account = await prisma.account.findUnique({
            where: { id: accound_id },
        });
        if (!account) {
            throw new NotFoundException(["Аккаунт с таким айди не найден"]);
        }
        const profile = await prisma.profile.findUnique({
            where: {
                by_account_id: account.id,
            },
            include: {
                avatar: true,
            },
        });

        if (!profile) {
            throw new NotFoundException(["Профиль с таким аккант айди не найден"]);
        }
        return { account, profile };
    };
    update_bio_by_id = async (profile_id: iObjectCuid, bio: string | null) => {
        return await prisma.profile.update({
            where: {
                id: profile_id,
            },
            data: { bio },
        });
    };
    update_nickname_by_id = async (profile_id: iObjectCuid, nickname: string | null) => {
        return await prisma.profile.update({
            where: {
                id: profile_id,
            },
            data: { nickname },
        });
    };

    update_avatar_by_id = async (profile_id: iObjectCuid, avatar_url_hash: string | null): Promise<AvatarPicture> => {
        if (avatar_url_hash === null) {
            return await prisma.avatarPicture.delete({
                where: {
                    by_profile_id: profile_id,
                },
            });
        }
        return await prisma.avatarPicture.update({
            where: {
                by_profile_id: profile_id,
            },
            data: {
                url: avatar_url_hash,
            },
        });
    };
    set_avatar_by_id = async (profile_id: iObjectCuid, avatar_url_hash: string): Promise<AvatarPicture> => {
        return await prisma.avatarPicture.create({
            data: {
                by_profile_id: profile_id,
                url: avatar_url_hash,
            },
        });
    };

    delete_avatar_from_profile = async (profile_id: iObjectCuid): Promise<AvatarPicture> => {
        return await prisma.avatarPicture.delete({
            where: {
                by_profile_id: profile_id,
            },
        });
    };
})();
