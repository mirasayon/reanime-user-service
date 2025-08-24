import { prisma } from "#/db/connect.js";
import type { ReplyVote } from "#/db/orm/client.js";
import { NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import type { ObjectCuid } from "#/shared/types/inputs/infotype.js";

export const Reply_Model = new (class Reply_Model {
    get_replies_count_on_1_comment = async (by_profile_id: ObjectCuid, to_comment_id: ObjectCuid) => {
        return await prisma.reply.count({
            where: {
                by_profile_id,
                to_comment_id,
            },
        });
    };

    get_all_replies_for_1_comment_by_commment_id = async (to_comment_id: ObjectCuid, page: number, limit: number) => {
        const skip = (page - 1) * limit;
        return await prisma.reply.findMany({
            where: {
                to_comment_id,
            },
            skip,
            take: limit,
            orderBy: { created_at: "desc" },
        });
    };
    create_1_reply_to_1_comment = async (by_profile_id: ObjectCuid, content: string, to_comment_id: ObjectCuid) => {
        return await prisma.reply.create({
            data: {
                by_profile_id,
                content,
                to_comment_id,
            },
        });
    };
    find_1_reply_by_its_id = async (reply_id: ObjectCuid) => {
        const found_reply = await prisma.reply.findUnique({
            where: {
                id: reply_id,
            },
        });

        if (!found_reply) {
            throw new NotFoundException(["Ответ не существует."]);
        }
        return found_reply;
    };

    find_1_comment_by_its_id = async (comment_id: ObjectCuid) => {
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
    find_1_vote_by_reply_id_and_profile_id = async (reply_id: ObjectCuid, by_profile_id: ObjectCuid): Promise<ReplyVote | null> => {
        return await prisma.replyVote.findUnique({
            where: {
                by_profile_id_reply_id: {
                    reply_id,
                    by_profile_id,
                },
            },
        });
    };

    create_1_vote_to_reply = async (reply_id: ObjectCuid, vote: boolean, by_profile_id: ObjectCuid) => {
        return await prisma.replyVote.create({
            data: {
                reply_id,
                vote,
                by_profile_id,
            },
        });
    };

    update_1_vote_to_reply = async (vote_id: ObjectCuid, vote: boolean) => {
        return await prisma.replyVote.update({
            where: {
                id: vote_id,
            },
            data: {
                vote,
            },
        });
    };

    Delete_vote_from_reply_by_its_id = async (reply_vote_id: ObjectCuid) => {
        return await prisma.replyVote.delete({
            where: {
                id: reply_vote_id,
            },
        });
    };

    delete_1_reply = async (reply_id: ObjectCuid) => {
        return prisma.reply.delete({
            where: {
                id: reply_id,
            },
        });
    };

    update_1_reply_by_its_id = async (reply_id: ObjectCuid, new_reply_content: string) => {
        return await prisma.reply.update({
            where: {
                id: reply_id,
            },
            data: {
                content: new_reply_content,
            },
        });
    };
})();

