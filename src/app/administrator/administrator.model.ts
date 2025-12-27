import { prisma } from "#/databases/provider/database-connector.js";
import { UnexpectedInternalServerErrorException } from "#/errors/server-side-exceptions.js";
import type { ProfileAvatarPicture, UserAccount, UserProfile } from "[orm]/client.js";
class AdministratorSectionModel {
    get_all_accounts_and_its_profiles = async (): Promise<
        {
            avatar: ProfileAvatarPicture | null;
            account: UserAccount;
            profile: UserProfile;
        }[]
    > => {
        const allUsers = await prisma.userAccount.findMany({
            orderBy: {
                created_at: "desc",
            },
            include: {
                profile: {
                    include: {
                        avatar: true,
                    },
                },
            },
        });

        return allUsers.map((item) => {
            if (!item.profile) {
                throw new UnexpectedInternalServerErrorException("Профиль не найден для аккаунта " + item.id, "get_all_accounts_and_its_profiles");
            }
            return {
                avatar: item.profile.avatar,
                account: item,
                profile: item.profile,
            };
        });
    };
}
export const administratorSectionModel = new AdministratorSectionModel();
