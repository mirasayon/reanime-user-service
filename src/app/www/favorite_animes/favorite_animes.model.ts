import { prisma } from "#/providers/database-connect.js";
import type { ObjectCuid } from "#/shared/types/inputs/infotype.js";

export const FavoriteAnimes_Model = new (class FavoriteAnimes_Model {
    get_all_likes_by_profile_id = async (profile_id: ObjectCuid) => {
        return await prisma.animeFavorite.findMany({
            where: {
                profile_id,
                vote: true,
            },
        });
    };
    get_all_dislikes_by_profile_id = async (profile_id: ObjectCuid) => {
        return await prisma.animeFavorite.findMany({
            where: {
                profile_id,
                vote: false,
            },
        });
    };

    get_the_vote_from_anime_id_and_profile_id = async (profile_id: ObjectCuid, anime_id: number) => {
        return await prisma.animeFavorite.findUnique({
            where: {
                profile_id_anime_id: {
                    profile_id,
                    anime_id,
                },
            },
        });
    };
    update_vote_by_its_id = async (vote_id: ObjectCuid, vote: boolean) => {
        return await prisma.animeFavorite.update({
            where: {
                id: vote_id,
            },
            data: {
                vote,
            },
        });
    };
    create_like_by_profile_id = async (profile_id: ObjectCuid, anime_id: number) => {
        return await prisma.animeFavorite.create({
            data: {
                anime_id,
                profile_id,
                vote: true,
            },
        });
    };
    create_dislike_by_profile_id = async (profile_id: ObjectCuid, anime_id: number) => {
        return await prisma.animeFavorite.create({
            data: {
                anime_id,
                profile_id,
                vote: false,
            },
        });
    };

    delete_like_by_profile_id = async (profile_id: ObjectCuid, anime_id: number) => {
        return await prisma.animeFavorite.delete({
            where: {
                profile_id_anime_id: {
                    anime_id,
                    profile_id,
                },
                vote: true,
            },
        });
    };
    delete_dislike_by_profile_id = async (profile_id: ObjectCuid, anime_id: number) => {
        return await prisma.animeFavorite.delete({
            where: {
                profile_id_anime_id: {
                    anime_id,
                    profile_id,
                },
                vote: false,
            },
        });
    };
})();

