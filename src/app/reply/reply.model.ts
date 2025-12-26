import { prisma } from "#/databases/provider/database-connector.js";
import { NotFoundException } from "#/errors/client-side-exceptions.js";
import type { DbCuidType } from "#/shared/types/informative-input-types-shared.js";
import type { VoteToReply } from "[orm]/client.js";

export const Reply_Model = new (class Reply_Model {
    get_replies_count_on_1_comment = async (by_profile_id: DbCuidType, to_comment_id: DbCuidType) => {
        return await prisma.replyForComment.count({
            where: {
                by_profile_id,
                to_comment_id,
            },
        });
    };

    get_all_replies_for_1_comment_by_comment_id = async (to_comment_id: DbCuidType, page: number, limit: number) => {
        const skip = (page - 1) * limit;
        return await prisma.replyForComment.findMany({
            where: {
                to_comment_id,
            },
            skip,
            take: limit,
            orderBy: { created_at: "desc" },
        });
    };
    create_1_reply_to_1_comment = async (by_profile_id: DbCuidType, content: string, to_comment_id: DbCuidType) => {
        return await prisma.replyForComment.create({
            data: {
                by_profile_id,
                content,
                to_comment_id,
            },
        });
    };
    find_1_reply_by_its_id = async (reply_id: DbCuidType) => {
        const found_reply = await prisma.replyForComment.findUnique({
            where: {
                id: reply_id,
            },
        });

        if (!found_reply) {
            throw new NotFoundException(["Ответ не существует."]);
        }
        return found_reply;
    };

    find_1_comment_by_its_id = async (comment_id: DbCuidType) => {
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
    find_1_vote_by_reply_id_and_profile_id = async (to_reply_id: DbCuidType, by_profile_id: DbCuidType): Promise<VoteToReply | null> => {
        return await prisma.voteToReply.findUnique({
            where: {
                by_profile_id_to_reply_id: {
                    to_reply_id,
                    by_profile_id,
                },
            },
        });
    };

    create_1_vote_to_reply = async (to_reply_id: DbCuidType, value: 1 | -1, by_profile_id: DbCuidType) => {
        return await prisma.voteToReply.create({
            data: {
                to_reply_id,
                value,
                by_profile_id,
            },
        });
    };

    update_1_vote_to_reply = async (vote_id: DbCuidType, value: number) => {
        return await prisma.voteToReply.update({
            where: {
                id: vote_id,
            },
            data: {
                value,
            },
        });
    };

    Delete_vote_from_reply_by_its_id = async (reply_vote_id: DbCuidType) => {
        return await prisma.voteToReply.delete({
            where: {
                id: reply_vote_id,
            },
        });
    };

    delete_1_reply = async (reply_id: DbCuidType) => {
        return prisma.replyForComment.delete({
            where: {
                id: reply_id,
            },
        });
    };

    update_1_reply_by_its_id = async (reply_id: DbCuidType, new_reply_content: string) => {
        return await prisma.replyForComment.update({
            where: {
                id: reply_id,
            },
            data: {
                content: new_reply_content,
            },
        });
    };
})();
