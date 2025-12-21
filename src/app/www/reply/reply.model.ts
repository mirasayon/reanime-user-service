import { prisma } from "#/databases/providers/database-connect.js";
import { NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import type { iObjectCuid } from "#/shared/types/inputs/informative.types.js";
import type { VoteToReply } from "[orm]";

export const Reply_Model = new (class Reply_Model {
    get_replies_count_on_1_comment = async (by_profile_id: iObjectCuid, to_comment_id: iObjectCuid) => {
        return await prisma.replyToComment.count({
            where: {
                by_profile_id,
                to_comment_id,
            },
        });
    };

    get_all_replies_for_1_comment_by_comment_id = async (to_comment_id: iObjectCuid, page: number, limit: number) => {
        const skip = (page - 1) * limit;
        return await prisma.replyToComment.findMany({
            where: {
                to_comment_id,
            },
            skip,
            take: limit,
            orderBy: { created_at: "desc" },
        });
    };
    create_1_reply_to_1_comment = async (by_profile_id: iObjectCuid, content: string, to_comment_id: iObjectCuid) => {
        return await prisma.replyToComment.create({
            data: {
                by_profile_id,
                content,
                to_comment_id,
            },
        });
    };
    find_1_reply_by_its_id = async (reply_id: iObjectCuid) => {
        const found_reply = await prisma.replyToComment.findUnique({
            where: {
                id: reply_id,
            },
        });

        if (!found_reply) {
            throw new NotFoundException(["Ответ не существует."]);
        }
        return found_reply;
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
    find_1_vote_by_reply_id_and_profile_id = async (reply_id: iObjectCuid, by_profile_id: iObjectCuid): Promise<VoteToReply | null> => {
        return await prisma.voteToReply.findUnique({
            where: {
                by_profile_id_reply_id: {
                    reply_id,
                    by_profile_id,
                },
            },
        });
    };

    create_1_vote_to_reply = async (reply_id: iObjectCuid, vote: boolean, by_profile_id: iObjectCuid) => {
        return await prisma.voteToReply.create({
            data: {
                reply_id,
                vote,
                by_profile_id,
            },
        });
    };

    update_1_vote_to_reply = async (vote_id: iObjectCuid, value: number) => {
        return await prisma.voteToReply.update({
            where: {
                id: vote_id,
            },
            data: {
                value,
            },
        });
    };

    Delete_vote_from_reply_by_its_id = async (reply_vote_id: iObjectCuid) => {
        return await prisma.voteToReply.delete({
            where: {
                id: reply_vote_id,
            },
        });
    };

    delete_1_reply = async (reply_id: iObjectCuid) => {
        return prisma.replyToComment.delete({
            where: {
                id: reply_id,
            },
        });
    };

    update_1_reply_by_its_id = async (reply_id: iObjectCuid, new_reply_content: string) => {
        return await prisma.replyToComment.update({
            where: {
                id: reply_id,
            },
            data: {
                content: new_reply_content,
            },
        });
    };
})();
