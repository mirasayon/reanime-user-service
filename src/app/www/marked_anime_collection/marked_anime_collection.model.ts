import { prisma as db } from "#/db/connect.js";
import { AnimeStatus } from "#/db/orm/enums.js";
import { NotFoundException } from "reanime/user-service/errors/client-side/exceptions.js";
import type { infotype } from "[T]/informative.js";

export const MarkedAnimeCollection_Model = new (class MarkedAnimeCollection_Model {
    delete_watching_by_profile_id = async (profile_id: infotype.Cuid, anime_id: number, id: string) => {
        return await db.markedAnimeCollection.delete({
            where: {
                profile_id,
                id,
                anime_id,
                status: AnimeStatus.WATCHING,
            },
        });
    };
    /** Checks if an anime is in a user's collection
     *
     * @param profile_id
     * @param anime_id
     * @returns
     */
    is_anime_in_collection = async (profile_id: infotype.Cuid, anime_id: number) => {
        return await db.markedAnimeCollection.findUnique({
            where: {
                profile_id_anime_id: {
                    profile_id,
                    anime_id,
                },
            },
        });
    };
    delete_abandoned_by_profile_id = async (profile_id: infotype.Cuid, anime_id: number, id: string) => {
        return await db.markedAnimeCollection.delete({
            where: {
                profile_id,
                status: AnimeStatus.ABANDONED,
                id,
                anime_id,
            },
        });
    };
    delete_plan_to_watch_by_profile_id = async (profile_id: infotype.Cuid, anime_id: number, id: string) => {
        return await db.markedAnimeCollection.delete({
            where: {
                profile_id,
                anime_id,
                id,
                status: AnimeStatus.PLANNED,
            },
        });
    };
    delete_completed_by_profile_id = async (profile_id: infotype.Cuid, anime_id: number, id: string) => {
        return await db.markedAnimeCollection.delete({
            where: {
                profile_id,
                anime_id,
                id,
                status: AnimeStatus.COMPLETED,
            },
        });
    };

    create_1_watching_by_profile_id = async (profile_id: infotype.Cuid, anime_id: number) => {
        return await db.markedAnimeCollection.create({
            data: {
                profile_id,
                anime_id,
                status: AnimeStatus.WATCHING,
            },
        });
    };
    create_1_abandoned_by_profile_id = async (profile_id: infotype.Cuid, anime_id: number) => {
        return await db.markedAnimeCollection.create({
            data: {
                profile_id,
                status: AnimeStatus.ABANDONED,
                anime_id,
            },
        });
    };
    create_1_plan_to_watch_by_profile_id = async (profile_id: infotype.Cuid, anime_id: number) => {
        return await db.markedAnimeCollection.create({
            data: {
                profile_id,
                anime_id,
                status: AnimeStatus.PLANNED,
            },
        });
    };
    create_1_completed_by_profile_id = async (profile_id: infotype.Cuid, anime_id: number) => {
        return await db.markedAnimeCollection.create({
            data: {
                profile_id,
                anime_id,
                status: AnimeStatus.COMPLETED,
            },
        });
    };

    get_list_of_watching = async (profile_id: infotype.Cuid) => {
        return await db.markedAnimeCollection.findMany({
            where: {
                profile_id,
                status: AnimeStatus.WATCHING,
            },
        });
    };
    get_list_of_abandoned = async (profile_id: infotype.Cuid) => {
        return await db.markedAnimeCollection.findMany({
            where: {
                profile_id,
                status: AnimeStatus.ABANDONED,
            },
        });
    };
    get_list_of_planned = async (profile_id: infotype.Cuid) => {
        return await db.markedAnimeCollection.findMany({
            where: {
                profile_id,
                status: AnimeStatus.PLANNED,
            },
        });
    };
    get_list_of_completed = async (profile_id: infotype.Cuid) => {
        return await db.markedAnimeCollection.findMany({
            where: {
                profile_id,
                status: AnimeStatus.COMPLETED,
            },
        });
    };

    /** ATTENTION.  */
    get_all_list_by_profile_id = async (profile_id: infotype.Cuid) => {
        return await db.markedAnimeCollection.findMany({
            where: {
                profile_id,
            },
        });
    };
    get_for_anime = async (profile_id: infotype.Cuid, anime_id: number) => {
        const found_vote = await db.markedAnimeCollection.findUnique({
            where: {
                profile_id_anime_id: {
                    anime_id,
                    profile_id,
                },
            },
        });
        if (!found_vote) {
            throw new NotFoundException(["Like or dislike not found for this anime"]);
        }
        return found_vote;
    };
})();

