import { prisma } from "#src/provider/database-connector.ts";
import { NotFoundException } from "#src/errors/client-side-exceptions.ts";
import type { CommentForAnime } from "#orm";
import type { ResponseTypesFor_CommentForAnime_Section } from "#src/shared/user-service-response-types-for-all.routes.ts";

export const commentRouteModel = new (class Comment_Model {
    get_comment_count_on_1_anime = async (by_profile_id: string, anime_id: number) => {
        return await prisma.commentForAnime.count({
            where: { by_profile_id, external_anime_id: anime_id },
        });
    };

    find_1_comment_by_its_content_and_owner_profile_id_and_anime_id = async ({
        anime_id,
        content,
        by_profile_id,
    }: {
        anime_id: number;
        content: string;
        by_profile_id: string;
    }) => {
        const found_comment = await prisma.commentForAnime.findFirst({
            where: {
                content: content,
                external_anime_id: anime_id,
                by_profile_id: by_profile_id,
            },
        });

        if (!found_comment) {
            return null;
        }
        return found_comment;
    };

    create_1_comment = async (by_profile_id: string, content: string, external_anime_id: number) => {
        return prisma.commentForAnime.create({
            data: {
                external_anime_id,
                by_profile_id,
                content,
            },
        });
    };

    get_all_comments_for_anime = async (args: {
        page: number;
        limit: number;
        anime_id: number;
    }): Promise<ResponseTypesFor_CommentForAnime_Section["get_all_for_anime"]> => {
        const skip = (args.page - 1) * args.limit;

        const all = await prisma.commentForAnime.findMany({
            where: {
                external_anime_id: args.anime_id,
            },
            skip: skip,
            select: {
                by_profile_id: true,
                id: true,
                created_at: true,
                updated_at: true,
                content: true,
                is_visible: true,
                external_anime_id: true,
                ratings: true,
                by_profile: {
                    select: {
                        nickname: true,
                        avatar: {
                            select: {
                                path_dirname: true,
                                path_filename: true,
                            },
                        },
                        by_account: { select: { username: true } },
                    },
                },
            },
            orderBy: { created_at: "desc" },
            take: args.limit,
        });
        return all.map((item) => {
            return {
                by_profile_id: item.by_profile_id,
                id: item.id,
                created_at: item.created_at,
                updated_at: item.updated_at,
                avatar: item.by_profile.avatar
                    ? {
                          path_dirname: item.by_profile.avatar.path_dirname,
                          path_filename: item.by_profile.avatar.path_filename,
                      }
                    : null,
                username: item.by_profile.by_account.username,
                nickname: item.by_profile.nickname,
                content: item.content,
                is_visible: item.is_visible,
                external_anime_id: item.external_anime_id,
                ratings: item.ratings,
            } satisfies ResponseTypesFor_CommentForAnime_Section["get_all_for_anime"][number];
        });
    };

    get_all_comments_for_public_profile = async ({
        by_profile_id,
        limit,
        page,
    }: {
        page: number;
        limit: number;
        by_profile_id: string;
    }): Promise<CommentForAnime[]> => {
        const skip = (page - 1) * limit;
        const all = await prisma.commentForAnime.findMany({
            where: { by_profile_id },
            skip: skip,
            take: limit,
        });
        return all;
    };

    find_1_comment_by_its_id = async (comment_id: string) => {
        const found_comment = await prisma.commentForAnime.findUnique({
            where: {
                id: comment_id,
            },
        });

        if (!found_comment) {
            throw new NotFoundException(["Комментарий с этим айди не найден"]);
        }
        return found_comment;
    };

    find_1_vote_by_comment_id_and_profile_id = async (to_comment_id: string, by_profile_id: string) => {
        return await prisma.voteToComment.findUnique({
            where: {
                by_profile_id_to_comment_id: {
                    to_comment_id,
                    by_profile_id,
                },
            },
        });
    };

    create_1_vote_to_comment = async (to_comment_id: string, by_profile_id: string, value: 1 | -1) => {
        return await prisma.voteToComment.create({
            data: {
                value,
                by_profile_id,
                to_comment_id,
            },
        });
    };

    delete_1_vote_from_comment = async (existed_vote_id: string) => {
        return await prisma.voteToComment.delete({
            where: {
                id: existed_vote_id,
            },
        });
    };
    update_1_vote_to_comment = async (old_reply_id: string, value: 1 | -1) => {
        return await prisma.voteToComment.update({
            where: {
                id: old_reply_id,
            },
            data: {
                value,
            },
        });
    };
    delete_1_comment = async (comment_id: string) => {
        return prisma.commentForAnime.delete({
            where: {
                id: comment_id,
            },
        });
    };

    update_1_comment_by_its_id = async (reply_id: string, new_content: string) => {
        return await prisma.commentForAnime.update({
            where: {
                id: reply_id,
            },
            data: {
                content: new_content,
            },
        });
    };
})();
