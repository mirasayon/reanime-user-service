import { vote_not_found } from "#/configs/frequent-errors.js";
import { REPLIES_LIMIT_TO_ONE_COMMENT } from "#/configs/rules.js";
import { ConflictException, ForbiddenException, NotFoundException, UnauthorizedException } from "#/errors/client-side-exceptions.js";
import { NotImplementedException } from "#/errors/server-side-exceptions.js";
import type { ReplyForComment } from "[orm]";
import { Reply_Model as model } from "[www]/reply/reply.model.js";

/** Service Class with all methods for Replies */
export const Reply_Service = new (class Reply_Service {
    get_1_reply_by_its_id = async (reply_id: string) => {
        const found_reply = await model.find_1_reply_by_its_id(reply_id);
        return found_reply;
    };
    get_all_replies_by_comment_id = async ({
        comment_id,
        page,
        limit,
    }: {
        comment_id: string;
        page: number;
        limit: number;
    }): Promise<{ replies: ReplyForComment[] }> => {
        const found_comment = await model.find_1_comment_by_its_id(comment_id);
        const replies = await model.get_all_replies_for_1_comment_by_comment_id(found_comment.id, page, limit);
        return { replies };
    };

    add_dislike = async ({ reply_id, profile_id }: { reply_id: string; profile_id: string }): Promise<boolean> => {
        const found_reply = await model.find_1_reply_by_its_id(reply_id);
        const existedVote = await model.find_1_vote_by_reply_id_and_profile_id(found_reply.id, profile_id);
        if (existedVote) {
            if (existedVote.value === -1) {
                throw new ConflictException(["Профиль уже оставил дизлайк на этот ответ"]);
            }
            const updated_vote = await model.update_1_vote_to_reply(existedVote.id, -1);
            return !!updated_vote;
        }
        const new_vote = await model.create_1_vote_to_reply(found_reply.id, -1, profile_id);
        return !!new_vote;
    };

    add_like = async ({ reply_id, profile_id }: { reply_id: string; profile_id: string }): Promise<boolean> => {
        const found_reply = await model.find_1_reply_by_its_id(reply_id);
        const existedVote = await model.find_1_vote_by_reply_id_and_profile_id(found_reply.id, profile_id);

        if (existedVote) {
            if (existedVote.value === 1) {
                throw new ConflictException(["Профиль уже оставил лайк на этот ответ"]);
            }
            const updated_vote = await model.update_1_vote_to_reply(existedVote.id, 1);
            return !!updated_vote;
        }
        const new_vote = await model.create_1_vote_to_reply(found_reply.id, 1, profile_id);
        return !!new_vote;
    };

    delete_dislike = async ({ reply_id, profile_id }: { reply_id: string; profile_id: string }): Promise<boolean> => {
        const found_reply = await model.find_1_reply_by_its_id(reply_id);

        const existedVote = await model.find_1_vote_by_reply_id_and_profile_id(found_reply.id, profile_id);
        if (!existedVote) {
            throw new NotFoundException([vote_not_found]);
        }
        if (existedVote.value === 1) {
            throw new ConflictException(["Ответ лайкнут но вы пытаетесь удалить дизлайк которого нет"]);
        }
        const deleted_dislike = await model.Delete_vote_from_reply_by_its_id(existedVote.id);
        return !!deleted_dislike;
    };
    delete_like = async ({ reply_id, profile_id }: { reply_id: string; profile_id: string }): Promise<boolean> => {
        const found_reply = await model.find_1_reply_by_its_id(reply_id);

        const existedVote = await model.find_1_vote_by_reply_id_and_profile_id(found_reply.id, profile_id);
        if (!existedVote) {
            throw new NotFoundException([vote_not_found]);
        }
        if (existedVote.value === -1) {
            throw new ConflictException(["Ответ дизлайкнут но вы пытаетесь удалить лайк которого нет"]);
        }
        const deleted_like = await model.Delete_vote_from_reply_by_its_id(existedVote.id);
        return !!deleted_like;
    };

    report_to_reply = async ({ reply_id, report_details, profile_id }: { reply_id: string; report_details: string; profile_id: string }) => {
        throw new NotImplementedException("еще не реализовано");
    };

    create_reply = async ({ reply_to_id, content, profile_id }: { reply_to_id: string; content: string; profile_id: string }): Promise<boolean> => {
        const replies_count = await model.get_replies_count_on_1_comment(profile_id, reply_to_id);
        if (replies_count >= REPLIES_LIMIT_TO_ONE_COMMENT) {
            throw new ForbiddenException([
                `Максимальное количество ответов на один комментарий от одного пользователя не должно превышать ${REPLIES_LIMIT_TO_ONE_COMMENT}.`,
            ]);
        }
        const created_reply = await model.create_1_reply_to_1_comment(profile_id, content, reply_to_id);
        return !!created_reply;
    };
    delete_reply = async ({ reply_id, profile_id }: { reply_id: string; profile_id: string }): Promise<boolean> => {
        const found_reply = await model.find_1_reply_by_its_id(reply_id);

        if (found_reply.by_profile_id !== profile_id) {
            throw new UnauthorizedException(["Этот ответ не ваш"]);
        }
        const deleted_reply = await model.delete_1_reply(found_reply.id);
        return !!deleted_reply;
    };
    /** Edits the comment by its ID and profile profile ID */
    edit_reply = async ({ content, reply_id, profile_id }: { content: string; reply_id: string; profile_id: string }): Promise<boolean> => {
        const found_reply = await model.find_1_reply_by_its_id(reply_id);
        if (found_reply.by_profile_id !== profile_id) {
            throw new ForbiddenException(["Этот ответ не ваш"]);
        }
        const updated_reply = await model.update_1_reply_by_its_id(found_reply.id, content);
        return !!updated_reply;
    };
})();
