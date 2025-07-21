import { prisma as db } from "#/db/connect.js";
import { NotFoundException } from "@xamarin.city/reanime/user-service/errors/client-side/exceptions.js";
import type { infotype } from "[T]/informative.js";

export const Comment_Model = new (class Comment_Model {
    get_comment_count_on_1_anime = async (by_profile_id: infotype.Cuid, anime_id: number) => {
        return await db.comment.count({
            where: { by_profile_id, anime_id },
        });
    };

    create_1_comment = async (by_profile_id: infotype.Cuid, content: string, anime_id: number) => {
        return db.comment.create({
            data: {
                anime_id,
                by_profile_id,
                content,
            },
        });
    };

    get_all_comments_for_anime = async (args: { page: number; limit: number; anime_id: number }) => {
        const skip = (args.page - 1) * args.limit;

        return await db.comment.findMany({
            where: {
                anime_id: args.anime_id,
            },
            skip,
            include: {
                ratings: true,
                replies: true,
            },
            take: args.limit,
        });
    };

    find_1_comment_by_its_id = async (comment_id: infotype.Cuid) => {
        const found_comment = await db.comment.findUnique({
            where: {
                id: comment_id,
            },
        });

        if (!found_comment) {
            throw new NotFoundException(["Comment with this ID not found"]);
        }
        return found_comment;
    };

    find_1_vote_by_comment_id_and_profile_id = async (comment_id: infotype.Cuid, by_profile_id: infotype.Cuid) => {
        return await db.commentVote.findUnique({
            where: {
                by_profile_id_comment_id: {
                    comment_id,
                    by_profile_id,
                },
            },
        });
    };

    create_1_vote_to_comment = async (comment_id: infotype.Cuid, by_profile_id: infotype.Cuid, vote: boolean) => {
        return await db.commentVote.create({
            data: {
                vote,
                by_profile_id,
                comment_id,
            },
        });
    };

    delete_1_vote_from_comment = async (existed_vote_id: string) => {
        return await db.commentVote.delete({
            where: {
                id: existed_vote_id,
            },
        });
    };
    update_1_vote_to_comment = async (old_reply_id: infotype.Cuid, vote: boolean) => {
        return await db.commentVote.update({
            where: {
                id: old_reply_id,
            },
            data: {
                vote,
            },
        });
    };
    delete_1_comment = async (comment_id: infotype.Cuid) => {
        return db.comment.delete({
            where: {
                id: comment_id,
            },
        });
    };

    update_1_comment_by_its_id = async (reply_id: infotype.Cuid, new_content: string) => {
        return await db.comment.update({
            where: {
                id: reply_id,
            },
            data: {
                content: new_content,
            },
        });
    };
})();
