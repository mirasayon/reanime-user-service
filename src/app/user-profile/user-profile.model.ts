import { usernameNotFoundErrorMessage } from "#src/constants/frequent-errors.ts";
import { prisma } from "#src/provider/database-connector.ts";
import { NotFoundException } from "#src/errors/client-side-exceptions.ts";
import { UnexpectedInternalServerErrorException } from "#src/errors/server-side-exceptions.ts";
import type { ProfileAvatarPicture, UserAccount, UserProfile } from "#orm";
class ProfileRouteModelClass {
    find_profile_by_its_id = async (profile_id: string) => {
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
    find_profile_by_its_id_with_avatar_data = async (profile_id: string) => {
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

    findAvatarByProfileId = async (profile_id: string) => {
        const found_profile = await prisma.profileAvatarPicture.findUnique({
            where: {
                by_profile_id: profile_id,
            },
        });
        if (!found_profile) {
            throw new NotFoundException(["Аватарки у вас нет"]);
        }
        return found_profile;
    };
    find_profile_by_username = async (username: string): Promise<{ account: UserAccount; profile: UserProfile }> => {
        const account = await prisma.userAccount.findUnique({
            where: { username },
        });

        if (!account) {
            throw new NotFoundException([usernameNotFoundErrorMessage]);
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
        username: string,
    ): Promise<{ account: UserAccount; profile: UserProfile; avatar: ProfileAvatarPicture | null }> => {
        const account = await prisma.userAccount.findUnique({
            where: { username },
        });

        if (!account) {
            throw new NotFoundException();
        }
        const profile = await prisma.userProfile.findUnique({
            where: {
                by_account_id: account.id,
            },
        });

        if (!profile) {
            throw new UnexpectedInternalServerErrorException(
                `Для аккаунта ${account.id} не найден профиль`,
                this.find_profile_by_username_AND_give_avatar_data.name,
            );
        }
        const avatar = await prisma.profileAvatarPicture.findUnique({
            where: {
                by_profile_id: profile.id,
            },
        });
        return { account, profile, avatar };
    };

    find_by_account_id_AND_return_account_and_profile = async (
        account_id: string,
    ): Promise<{ account: UserAccount; profile: UserProfile & { avatar: ProfileAvatarPicture | null } }> => {
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
    update_bio_by_id = async (profile_id: string, bio: string | null) => {
        return await prisma.userProfile.update({
            where: {
                id: profile_id,
            },
            data: { bio },
        });
    };
    update_nickname_by_id = async (profile_id: string, nickname: string | null) => {
        return await prisma.userProfile.update({
            where: {
                id: profile_id,
            },
            data: { nickname },
        });
    };
}
export const profileRouteModel = new ProfileRouteModelClass();
