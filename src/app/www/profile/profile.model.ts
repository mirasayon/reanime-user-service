import { usernameNotFound } from "#/configs/frequent-errors.js";
import { prisma } from "#/databases/providers/database-connect.js";
import { NotFoundException } from "#/errors/client-side-exceptions.js";
import type { iObjectCuid } from "#/shared/types/inputs/informative.types.js";
import type { AvatarPicture, UserAccount, UserProfile } from "[orm]";

export const Profile_Model = new (class Profile_Model {
    find_profile_by_its_id = async (profile_id: iObjectCuid) => {
        const found_profile = await prisma.userProfile.findUnique({
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
        const found_profile = await prisma.userProfile.findUnique({
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
    find_profile_by_username = async (username: iObjectCuid): Promise<{ account: UserAccount; profile: UserProfile }> => {
        const account = await prisma.userAccount.findUnique({
            where: { username },
        });

        if (!account) {
            throw new NotFoundException([usernameNotFound]);
        }
        const profile = await prisma.userProfile.findUnique({
            where: {
                by_account_id: account.id,
            },
        });
        if (!profile) {
            throw new NotFoundException(["Профиль с таким аккаунтом айди не найден"]);
        }
        return { account, profile };
    };

    find_profile_by_username_AND_give_avatar_data = async (
        username: iObjectCuid,
    ): Promise<{ account: Omit<UserAccount, "password_hash">; profile: UserProfile & { avatar: AvatarPicture | null } }> => {
        const account = await prisma.userAccount.findUnique({
            where: { username },
            omit: { password_hash: true },
        });

        if (!account) {
            throw new NotFoundException(["Аккаунт с таким айди не найден"]);
        }
        const profile = await prisma.userProfile.findUnique({
            where: {
                by_account_id: account.id,
            },
            include: { avatar: true },
        });
        if (!profile) {
            throw new NotFoundException(["Профиль с таким аккаунтом айди не найден"]);
        }
        return { account, profile };
    };

    find_by_account_id_AND_return_account_and_profile = async (
        account_id: iObjectCuid,
    ): Promise<{ account: UserAccount; profile: UserProfile & { avatar: AvatarPicture | null } }> => {
        const account = await prisma.userAccount.findUnique({
            where: { id: account_id },
        });
        if (!account) {
            throw new NotFoundException(["Аккаунт с таким айди не найден"]);
        }
        const profile = await prisma.userProfile.findUnique({
            where: {
                by_account_id: account.id,
            },
            include: {
                avatar: true,
            },
        });

        if (!profile) {
            throw new NotFoundException(["Профиль с таким аккаунтом айди не найден"]);
        }
        return { account, profile };
    };
    update_bio_by_id = async (profile_id: iObjectCuid, bio: string | null) => {
        return await prisma.userProfile.update({
            where: {
                id: profile_id,
            },
            data: { bio },
        });
    };
    update_nickname_by_id = async (profile_id: iObjectCuid, nickname: string | null) => {
        return await prisma.userProfile.update({
            where: {
                id: profile_id,
            },
            data: { nickname },
        });
    };

    update_avatar_by_id = async (profile_id: iObjectCuid, username: string): Promise<AvatarPicture> => {
        return await prisma.avatarPicture.update({
            where: {
                by_profile_id: profile_id,
            },
            data: {
                url: username,
            },
        });
    };
    set_avatar_by_id = async (profile_id: iObjectCuid, username: string): Promise<AvatarPicture> => {
        return await prisma.avatarPicture.create({
            data: {
                by_profile_id: profile_id,
                url: username,
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
