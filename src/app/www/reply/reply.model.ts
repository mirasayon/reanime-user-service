import { prisma as db } from "#/db/connect.js";
import { ReplyVote } from "#/db/orm/client.js";
import { NotFoundException } from "reanime/user-service/errors/client-side/exceptions.js";
import type { infotype } from "[T]/informative.js";

export const Reply_Model = new (class Reply_Model {
    get_replies_count_on_1_comment = async (by_profile_id: infotype.Cuid, to_comment_id: infotype.Cuid) => {
        return await db.reply.count({
            where: {
                by_profile_id,
                to_comment_id,
            },
        });
    };

    get_all_replies_for_1_comment_by_commment_id = async (to_comment_id: infotype.Cuid, page: number, limit: number) => {
        const skip = (page - 1) * limit;
        return await db.reply.findMany({
            where: {
                to_comment_id,
            },
            skip,
            take: limit,
            orderBy: { created_at: "desc" },
        });
    };
    create_1_reply_to_1_comment = async (by_profile_id: infotype.Cuid, content: string, to_comment_id: infotype.Cuid) => {
        return await db.reply.create({
            data: {
                by_profile_id,
                content,
                to_comment_id,
            },
        });
    };
    find_1_reply_by_its_id = async (reply_id: infotype.Cuid) => {
        const found_reply = await db.reply.findUnique({
            where: {
                id: reply_id,
            },
        });

        if (!found_reply) {
            throw new NotFoundException(["The reply does not exist."]);
        }
        return found_reply;
    };

    find_1_comment_by_its_id = async (comment_id: infotype.Cuid) => {
        const found_comment = await db.comment.findUnique({
            where: {
                id: comment_id,
            },
        });
        if (!found_comment) {
            throw new NotFoundException(["Comment with this ID is not found"]);
        }

        return found_comment;
    };
    find_1_vote_by_reply_id_and_profile_id = async (reply_id: infotype.Cuid, by_profile_id: infotype.Cuid): Promise<ReplyVote | null> => {
        return await db.replyVote.findUnique({
            where: {
                by_profile_id_reply_id: {
                    reply_id,
                    by_profile_id,
                },
            },
        });
    };

    create_1_vote_to_reply = async (reply_id: infotype.Cuid, vote: boolean, by_profile_id: infotype.Cuid) => {
        return await db.replyVote.create({
            data: {
                reply_id,
                vote,
                by_profile_id,
            },
        });
    };

    update_1_vote_to_reply = async (vote_id: infotype.Cuid, vote: boolean) => {
        return await db.replyVote.update({
            where: {
                id: vote_id,
            },
            data: {
                vote,
            },
        });
    };

    Delete_vote_from_reply_by_its_id = async (reply_vote_id: infotype.Cuid) => {
        return await db.replyVote.delete({
            where: {
                id: reply_vote_id,
            },
        });
    };

    delete_1_reply = async (reply_id: infotype.Cuid) => {
        return db.reply.delete({
            where: {
                id: reply_id,
            },
        });
    };

    update_1_reply_by_its_id = async (reply_id: infotype.Cuid, new_reply_content: string) => {
        return await db.reply.update({
            where: {
                id: reply_id,
            },
            data: {
                content: new_reply_content,
            },
        });
    };
})();

