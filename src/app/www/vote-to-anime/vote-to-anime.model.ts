import { prisma } from "#/databases/providers/database-connect.js";
import type { iObjectCuid } from "#/shared/types/inputs/informative.types.js";
import type { VoteToSomethingType } from "#/types/utility-types-for-db-models.js";

export const FavoriteAnimes_Model = new (class FavoriteAnimes_Model {
    get_all_likes_by_profile_id = async (by_profile_id: iObjectCuid) => {
        return await prisma.voteToAnime.findMany({
            where: {
                by_profile_id,
                value: 1,
            },
        });
    };
    get_all_dislikes_by_profile_id = async (by_profile_id: iObjectCuid) => {
        return await prisma.voteToAnime.findMany({
            where: {
                by_profile_id,
                value: -1,
            },
        });
    };

    get_the_vote_from_anime_id_and_profile_id = async (by_profile_id: iObjectCuid, external_anime_id: number) => {
        return await prisma.voteToAnime.findUnique({
            where: {
                by_profile_id_external_anime_id: {
                    by_profile_id,
                    external_anime_id,
                },
            },
        });
    };
    update_vote_by_its_id = async (vote_id: iObjectCuid, value: VoteToSomethingType) => {
        return await prisma.voteToAnime.update({
            where: {
                id: vote_id,
            },
            data: {
                value,
            },
        });
    };
    create_like_by_profile_id = async (by_profile_id: iObjectCuid, external_anime_id: number) => {
        return await prisma.voteToAnime.create({
            data: {
                external_anime_id,
                by_profile_id,
                value: 1,
            },
        });
    };
    create_dislike_by_profile_id = async (by_profile_id: iObjectCuid, external_anime_id: number) => {
        return await prisma.voteToAnime.create({
            data: {
                external_anime_id,
                by_profile_id,
                value: -1,
            },
        });
    };

    delete_like_by_profile_id = async (by_profile_id: iObjectCuid, external_anime_id: number) => {
        return await prisma.voteToAnime.delete({
            where: {
                by_profile_id_external_anime_id: {
                    external_anime_id,
                    by_profile_id,
                },
                value: 1,
            },
        });
    };
    delete_dislike_by_profile_id = async (by_profile_id: iObjectCuid, external_anime_id: number) => {
        return await prisma.voteToAnime.delete({
            where: {
                by_profile_id_external_anime_id: {
                    external_anime_id,
                    by_profile_id,
                },
                value: -1,
            },
        });
    };
})();
