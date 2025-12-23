import { usernameNotFoundErrorMessage } from "#/constants/frequent-errors.js";
import { prisma } from "#/databases/provider/database-connector.js";
import { NotFoundException } from "#/errors/client-side-exceptions.js";
import { UnexpectedInternalServerErrorException } from "#/errors/server-side-exceptions.js";
import type { DbCuidType } from "#/shared/types-shared/informative-input-types-shared.js";
import type { ProfileAvatarPicture, UserAccount, UserProfile } from "[orm]/client.js";
class ProfileRouteModelClass {
    find_profile_by_its_id = async (profile_id: DbCuidType) => {
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
    find_profile_by_its_id_with_avatar_data = async (profile_id: DbCuidType) => {
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
    find_profile_by_username = async (username: DbCuidType): Promise<{ account: UserAccount; profile: UserProfile }> => {
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
        username: DbCuidType,
    ): Promise<{ account: UserAccount; profile: UserProfile; avatar: ProfileAvatarPicture | null }> => {
        const account = await prisma.userAccount.findUnique({
            where: { username },
        });

        if (!account) {
            throw new NotFoundException(["Аккаунт с таким айди не найден"]);
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
        account_id: DbCuidType,
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
    update_bio_by_id = async (profile_id: DbCuidType, bio: string | null) => {
        return await prisma.userProfile.update({
            where: {
                id: profile_id,
            },
            data: { bio },
        });
    };
    update_nickname_by_id = async (profile_id: DbCuidType, nickname: string | null) => {
        return await prisma.userProfile.update({
            where: {
                id: profile_id,
            },
            data: { nickname },
        });
    };
}
export const profileRouteModel = new ProfileRouteModelClass();
