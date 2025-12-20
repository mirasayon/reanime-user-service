import type { Account, Profile } from "#/databases/orm/client.js";
import { prisma } from "#/databases/providers/database-connect.js";
export const Admin_Model = new (class Account_Model {
    get_all_accounts_and_its_profiles = async (): Promise<(Account & { profile: Profile | null })[]> => {
        const allUsers = await prisma.account.findMany({
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
