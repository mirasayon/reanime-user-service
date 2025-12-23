import { prisma } from "#/databases/provider/database-connector.js";
import type { UserAccount, UserProfile } from "[orm]/client.js";
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
