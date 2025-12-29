import { prisma } from "#src/provider/database-connector.ts";
class VoteToAnimeSectionModel {
    get_all_likes_by_profile_id = async (by_profile_id: string) => {
        return await prisma.voteToAnime.findMany({
            where: {
                by_profile_id,
                value: 1,
            },
        });
    };
    get_all_dislikes_by_profile_id = async (by_profile_id: string) => {
        return await prisma.voteToAnime.findMany({
            where: {
                by_profile_id,
                value: -1,
            },
        });
    };

    get_the_vote_from_anime_id_and_profile_id = async (by_profile_id: string, external_anime_id: number) => {
        return await prisma.voteToAnime.findUnique({
            where: {
                by_profile_id_external_anime_id: {
                    by_profile_id,
                    external_anime_id,
                },
            },
        });
    };
    update_vote_by_its_id = async (vote_id: string, value: -1 | 1) => {
        return await prisma.voteToAnime.update({
            where: {
                id: vote_id,
            },
            data: {
                value,
            },
        });
    };
    create_like_by_profile_id = async (by_profile_id: string, external_anime_id: number) => {
        return await prisma.voteToAnime.create({
            data: {
                external_anime_id,
                by_profile_id,
                value: 1,
            },
        });
    };
    create_dislike_by_profile_id = async (by_profile_id: string, external_anime_id: number) => {
        return await prisma.voteToAnime.create({
            data: {
                external_anime_id,
                by_profile_id,
                value: -1,
            },
        });
    };

    delete_like_by_profile_id = async (by_profile_id: string, external_anime_id: number) => {
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
    delete_dislike_by_profile_id = async (by_profile_id: string, external_anime_id: number) => {
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
}
export const voteToAnimeSectionModel = new VoteToAnimeSectionModel();
