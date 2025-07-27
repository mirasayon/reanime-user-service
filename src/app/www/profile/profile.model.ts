import { prisma as db } from "#/db/connect.js";
import { NotFoundException } from "reanime/user-service/errors/client-side/exceptions.js";
import type { infotype } from "[T]/informative.js";

export const Profile_Model = new (class Profile_Model {
    find_profile_by_its_id = async (profile_id: infotype.Cuid) => {
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
    find_profile_by_username = async (username: infotype.Cuid) => {
        const found = await db.account.findUnique({
            where: { username },
            include: {
                profile: true,
            },
        });
        return found;
    };
    update_bio_by_id = async (profile_id: infotype.Cuid, bio?: string) => {
        return await db.profile.update({
            where: {
                id: profile_id,
            },
            data: { bio },
        });
    };
    update_nickname_by_id = async (profile_id: infotype.Cuid, nickname?: string) => {
        return await db.profile.update({
            where: {
                id: profile_id,
            },
            data: { nickname },
        });
    };

    update_avatar_by_id = async (profile_id: infotype.Cuid, avatar_url_hash?: string) => {
        return await db.profile.update({
            where: {
                id: profile_id,
            },
            data: {
                avatar_url_hash,
            },
        });
    };

    delete_avatar_from_profile = async (profile_id: infotype.Cuid) => {
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

