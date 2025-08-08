import { prisma as db } from "#/db/connect.js";
import { NotFoundException } from "@reanime.art/user-service/errors/client-side/exceptions.js";
import type { ObjectCuid } from "@reanime.art/user-service/types/inputs/infotype.js";
import { Account, Profile } from "#/db/orm/client.js";

export const Profile_Model = new (class Profile_Model {
    find_profile_by_its_id = async (profile_id: ObjectCuid) => {
        const found_profile = await db.profile.findUnique({
            where: {
                id: profile_id,
            },
        });
        if (!found_profile) {
            throw new NotFoundException(["Профиль не найден"]);
        }
        return found_profile;
    };
    find_profile_by_username = async (username: ObjectCuid): Promise<{ account: Account; profile: Profile }> => {
        const account = await db.account.findUnique({
            where: { username },
        });

        if (!account) {
            throw new NotFoundException(["Аккаунт с таким айди не найден"]);
        }
        const profile = await db.profile.findUnique({
            where: {
                by_account_id: account.id,
            },
        });
        if (!profile) {
            throw new NotFoundException(["Профиль с таким аккант айди не найден"]);
        }
        return { account, profile };
    };

    find_by_account_id_AND_return_account_and_profile = async (accound_id: ObjectCuid): Promise<{ account: Account; profile: Profile }> => {
        const account = await db.account.findUnique({
            where: { id: accound_id },
        });
        if (!account) {
            throw new NotFoundException(["Аккаунт с таким айди не найден"]);
        }
        const profile = await db.profile.findUnique({
            where: {
                by_account_id: account.id,
            },
        });

        if (!profile) {
            throw new NotFoundException(["Профиль с таким аккант айди не найден"]);
        }
        return { account, profile };
    };
    update_bio_by_id = async (profile_id: ObjectCuid, bio?: string) => {
        return await db.profile.update({
            where: {
                id: profile_id,
            },
            data: { bio },
        });
    };
    update_nickname_by_id = async (profile_id: ObjectCuid, nickname?: string) => {
        return await db.profile.update({
            where: {
                id: profile_id,
            },
            data: { nickname },
        });
    };

    update_avatar_by_id = async (profile_id: ObjectCuid, avatar_url_hash?: string) => {
        return await db.profile.update({
            where: {
                id: profile_id,
            },
            data: {
                avatar_url_hash,
            },
        });
    };

    delete_avatar_from_profile = async (profile_id: ObjectCuid) => {
        return await db.profile.update({
            where: {
                id: profile_id,
            },
            data: {
                avatar_url_hash: null,
            },
        });
    };
})();

