import type { UserAccount, UserProfile } from "#/databases/orm/client.js";
import { prisma } from "#/databases/providers/database-connect.js";
export const Admin_Model = new (class Account_Model {
    get_all_accounts_and_its_profiles = async (): Promise<(UserAccount & { profile: UserProfile | null })[]> => {
        const allUsers = await prisma.userAccount.findMany({
            orderBy: {
                created_at: "desc",
            },
            include: {
                profile: true,
            },
        });
        return allUsers;
    };
})();
