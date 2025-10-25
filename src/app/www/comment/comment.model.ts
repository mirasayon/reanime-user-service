import { prisma } from "#/providers/database-connect.js";
import type { AvatarPicture, Comment, CommentVote, Profile } from "#/databases/orm/client.js";
import { NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import type { iObjectCuid } from "#/shared/types/inputs/informative.types.js";

export const Comment_Model = new (class Comment_Model {
    get_comment_count_on_1_anime = async (by_profile_id: iObjectCuid, anime_id: number) => {
        return await prisma.comment.count({
            where: { by_profile_id, anime_id },
        });
    };

    create_1_comment = async (by_profile_id: iObjectCuid, content: string, anime_id: number) => {
        return prisma.comment.create({
            data: {
                anime_id,
                by_profile_id,
                content,
            },
        });
    };

    get_all_comments_for_anime = async (args: {
        page: number;
        limit: number;
        anime_id: number;
    }): Promise<
        (Comment & {
            ratings: CommentVote[];
            by_profile: Profile & {
                avatar: AvatarPicture | null;
                by_account: {
                    username: string;
                };
            };
        })[]
    > => {
        const skip = (args.page - 1) * args.limit;

        const all = await prisma.comment.findMany({
            where: {
                anime_id: args.anime_id,
            },
            skip: skip,
            include: {
                ratings: true,
                // replies: true,
                by_profile: { include: { avatar: true, by_account: { select: { username: true } } } },
            },
            take: args.limit,
        });
        return all;
    };

    find_1_comment_by_its_id = async (comment_id: iObjectCuid) => {
        const found_comment = await prisma.comment.findUnique({
            where: {
                id: comment_id,
            },
        });

        if (!found_comment) {
            throw new NotFoundException(["Комментарий с этим айди не найден"]);
        }
        return found_comment;
    };

    find_1_vote_by_comment_id_and_profile_id = async (comment_id: iObjectCuid, by_profile_id: iObjectCuid) => {
        return await prisma.commentVote.findUnique({
            where: {
                by_profile_id_comment_id: {
                    comment_id,
                    by_profile_id,
                },
            },
        });
    };

    create_1_vote_to_comment = async (comment_id: iObjectCuid, by_profile_id: iObjectCuid, vote: boolean) => {
        return await prisma.commentVote.create({
            data: {
                vote,
                by_profile_id,
                comment_id,
            },
        });
    };

    delete_1_vote_from_comment = async (existed_vote_id: string) => {
        return await prisma.commentVote.delete({
            where: {
                id: existed_vote_id,
            },
        });
    };
    update_1_vote_to_comment = async (old_reply_id: iObjectCuid, vote: boolean) => {
        return await prisma.commentVote.update({
            where: {
                id: old_reply_id,
            },
            data: {
                vote,
            },
        });
    };
    delete_1_comment = async (comment_id: iObjectCuid) => {
        return prisma.comment.delete({
            where: {
                id: comment_id,
            },
        });
    };

    update_1_comment_by_its_id = async (reply_id: iObjectCuid, new_content: string) => {
        return await prisma.comment.update({
            where: {
                id: reply_id,
            },
            data: {
                content: new_content,
            },
        });
    };
})();
