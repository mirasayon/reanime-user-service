import { vote_not_found } from "#/configs/frequent-errors.js";
import { MAX_COMMENT_ON_ANIME_LIMIT } from "#/configs/rules.js";
import type { CommentVote } from "#/databases/orm/client.js";
import { ConflictException, ForbiddenException, NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import { NotImplementedException } from "#/modules/errors/server-side/exceptions.js";
import { Comment_Model as model } from "[www]/comment/comment.model.js";

/** Service Class with all methods for comments */
export const Comment_Service = new (class Comment_Service {
    /** Creates new Comment record and chains to new created comment record in the DB*/
    create_comment = async (args: { anime_id: number; content: string; profile_id: string }) => {
        const max = await model.get_comment_count_on_1_anime(args.profile_id, args.anime_id);
        if (max >= MAX_COMMENT_ON_ANIME_LIMIT) {
            throw new ForbiddenException([
                `Максимальное количество комментариев к аниме от одного пользователя не должно превышать ${MAX_COMMENT_ON_ANIME_LIMIT}`,
            ]);
        }
        const created_comment = await model.create_1_comment(args.profile_id, args.content, args.anime_id);
        return { created_comment };
    };
    /** Gets all the comments from anime id */
    get_all_comments_by_animeid = async (args: { page: number; limit: number; anime_id: number }) => {
        const comments = await model.get_all_comments_for_anime(args);
        return comments;
    };
    add_dislike = async (args: {
        comment_id: string;
        profile_id: string;
    }): Promise<{
        vote: CommentVote;
        is_updated: boolean;
    }> => {
        const found_comment = await model.find_1_comment_by_its_id(args.comment_id);

        const existedVote = await model.find_1_vote_by_comment_id_and_profile_id(found_comment.id, args.profile_id);
        if (existedVote) {
            if (existedVote.vote === false) {
                throw new ConflictException(["Дизлайк на этот комментарий уже поставлен"]);
            }
            const updated_vote = await model.update_1_vote_to_comment(existedVote.id, !existedVote.vote);
            return { vote: updated_vote, is_updated: true };
        }
        const new_vote = await model.create_1_vote_to_comment(found_comment.id, args.profile_id, false);
        return { vote: new_vote, is_updated: false };
    };

    delete_dislike = async ({ comment_id, profile_id }: { comment_id: string; profile_id: string }) => {
        const found_comment = await model.find_1_comment_by_its_id(comment_id);

        const existedVote = await model.find_1_vote_by_comment_id_and_profile_id(found_comment.id, profile_id);
        if (!existedVote) {
            throw new NotFoundException([vote_not_found]);
        }
        if (existedVote.vote === true) {
            throw new ConflictException(["У этого аниме лайк"]);
        }
        const deleted_vote = await model.delete_1_vote_from_comment(existedVote.id);
        return { deleted_vote };
    };
    add_like = async (args: {
        comment_id: string;
        profile_id: string;
    }): Promise<{
        vote: CommentVote;
        is_updated: boolean;
    }> => {
        const found_comment = await model.find_1_comment_by_its_id(args.comment_id);

        const existedVote = await model.find_1_vote_by_comment_id_and_profile_id(found_comment.id, args.profile_id);
        if (existedVote) {
            if (existedVote.vote === true) {
                throw new ConflictException(["Профиль уже лайкнул этот комментарий"]);
            }
            const updated_vote = await model.update_1_vote_to_comment(existedVote.id, !existedVote.vote);
            return { vote: updated_vote, is_updated: true };
        }
        const new_vote = await model.create_1_vote_to_comment(found_comment.id, args.profile_id, true);
        return { vote: new_vote, is_updated: true };
    };
    delete_like = async ({ comment_id, profile_id }: { comment_id: string; profile_id: string }) => {
        const found_comment = await model.find_1_comment_by_its_id(comment_id);

        const existedVote = await model.find_1_vote_by_comment_id_and_profile_id(found_comment.id, profile_id);
        if (!existedVote) {
            throw new NotFoundException([vote_not_found]);
        }
        if (existedVote.vote === false) {
            throw new ConflictException(["У этого аниме дизлайк"]);
        }
        const deleted_vote = await model.delete_1_vote_from_comment(existedVote.id);
        return { deleted_vote };
    };
    report_comment = async (args: { comment_id: string; report_details: string; profile_id: string }) => {
        throw new NotImplementedException(["Еще не реализовано"]);
    };
    /** Deletes a comment */
    delete_comment = async (args: { profile_id: string; comment_id: string }) => {
        const found_comment = await model.find_1_comment_by_its_id(args.comment_id);
        const deleted_comment = await model.delete_1_comment(found_comment.id);
        return { deleted_comment };
    };
    /** Edites the comment by its ID and profile ID */
    update_comment = async (args: { new_content: string; comment_id: string; profile_id: string }) => {
        const found_one = await model.find_1_comment_by_its_id(args.comment_id);
        if (found_one.by_profile_id !== args.profile_id) {
            throw new ForbiddenException(["Пользователь не оставил никаких комментариев"]);
        }
        const updated_comment = await model.update_1_comment_by_its_id(found_one.id, args.new_content);
        return { updated_comment };
    };
})();

