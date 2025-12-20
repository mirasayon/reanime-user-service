import { AnimeStatusEnum } from "#/databases/orm/enums.js";
import { prisma } from "#/databases/providers/database-connect.js";
import { NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import type { iObjectCuid } from "#/shared/types/inputs/informative.types.js";

export const MarkedAnimeCollection_Model = new (class MarkedAnimeCollection_Model {
    delete_watching_by_profile_id = async (profile_id: iObjectCuid, anime_id: number, id: string) => {
        return await prisma.animeBookmark.delete({
            where: {
                profile_id: profile_id,
                id: id,
                anime_id: anime_id,
                status: AnimeStatusEnum.WATCHING,
            },
        });
    };
    /** Checks if an anime is in a profile collection
     *
     * @param profile_id
     * @param anime_id
     * @returns
     */
    is_anime_in_collection = async (profile_id: iObjectCuid, anime_id: number) => {
        return await prisma.animeBookmark.findUnique({
            where: {
                profile_id_anime_id: {
                    profile_id: profile_id,
                    anime_id: anime_id,
                },
            },
        });
    };
    delete_abandoned_by_profile_id = async (profile_id: iObjectCuid, anime_id: number, id: string) => {
        return await prisma.animeBookmark.delete({
            where: {
                profile_id: profile_id,
                status: AnimeStatusEnum.ABANDONED,
                id: id,
                anime_id: anime_id,
            },
        });
    };
    delete_plan_to_watch_by_profile_id = async (profile_id: iObjectCuid, anime_id: number, id: string) => {
        return await prisma.animeBookmark.delete({
            where: {
                profile_id: profile_id,
                anime_id: anime_id,
                id: id,
                status: AnimeStatusEnum.PLANNED,
            },
        });
    };
    delete_completed_by_profile_id = async (profile_id: iObjectCuid, anime_id: number, id: string) => {
        return await prisma.animeBookmark.delete({
            where: {
                profile_id: profile_id,
                anime_id: anime_id,
                id: id,
                status: AnimeStatusEnum.COMPLETED,
            },
        });
    };

    create_1_watching_by_profile_id = async (profile_id: iObjectCuid, anime_id: number) => {
        return await prisma.animeBookmark.create({
            data: {
                profile_id: profile_id,
                anime_id: anime_id,
                status: AnimeStatusEnum.WATCHING,
            },
        });
    };
    create_1_abandoned_by_profile_id = async (profile_id: iObjectCuid, anime_id: number) => {
        return await prisma.animeBookmark.create({
            data: {
                profile_id: profile_id,
                status: AnimeStatusEnum.ABANDONED,
                anime_id: anime_id,
            },
        });
    };
    create_1_plan_to_watch_by_profile_id = async (profile_id: iObjectCuid, anime_id: number) => {
        return await prisma.animeBookmark.create({
            data: {
                profile_id: profile_id,
                anime_id: anime_id,
                status: AnimeStatusEnum.PLANNED,
            },
        });
    };
    create_1_completed_by_profile_id = async (profile_id: iObjectCuid, anime_id: number) => {
        return await prisma.animeBookmark.create({
            data: {
                profile_id: profile_id,
                anime_id: anime_id,
                status: AnimeStatusEnum.COMPLETED,
            },
        });
    };

    get_list_of_watching = async (profile_id: iObjectCuid) => {
        return await prisma.animeBookmark.findMany({
            where: {
                profile_id: profile_id,
                status: AnimeStatusEnum.WATCHING,
            },
        });
    };
    get_list_of_abandoned = async (profile_id: iObjectCuid) => {
        return await prisma.animeBookmark.findMany({
            where: {
                profile_id: profile_id,
                status: AnimeStatusEnum.ABANDONED,
            },
        });
    };
    get_list_of_planned = async (profile_id: iObjectCuid) => {
        return await prisma.animeBookmark.findMany({
            where: {
                profile_id: profile_id,
                status: AnimeStatusEnum.PLANNED,
            },
        });
    };
    get_list_of_completed = async (profile_id: iObjectCuid) => {
        return await prisma.animeBookmark.findMany({
            where: {
                profile_id: profile_id,
                status: AnimeStatusEnum.COMPLETED,
            },
        });
    };

    /** ATTENTION.  */
    get_all_list_by_profile_id = async (profile_id: iObjectCuid) => {
        return await prisma.animeBookmark.findMany({
            where: {
                profile_id: profile_id,
            },
        });
    };
    get_for_anime = async (profile_id: iObjectCuid, anime_id: number) => {
        const found_vote = await prisma.animeBookmark.findUnique({
            where: {
                profile_id_anime_id: {
                    anime_id: anime_id,
                    profile_id: profile_id,
                },
            },
        });
        if (!found_vote) {
            throw new NotFoundException(["Like or dislike not found for this anime"]);
        }
        return found_vote;
    };
})();
