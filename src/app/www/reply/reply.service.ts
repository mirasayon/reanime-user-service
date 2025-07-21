import { vote_not_found } from "#/configs/frequent-errors.js";
import { REPLIES_LIMIT_TO_ONE_COMMENT } from "#/configs/rules.js";
import { Reply, ReplyVote } from "#/db/orm/client.js";
import {
    ConflictException,
    ForbiddenException,
    NotFoundException,
    UnauthorizedException,
} from "@xamarin.city/reanime/user-service/errors/client-side/exceptions.js";
import { NotImplementedException } from "@xamarin.city/reanime/user-service/errors/server-side/exceptions.js";
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
    }): Promise<{ replies: Reply[] }> => {
        const found_comment = await model.find_1_comment_by_its_id(comment_id);
        const replies = await model.get_all_replies_for_1_comment_by_commment_id(found_comment.id, page, limit);
        return { replies };
    };

    add_dislike = async ({
        reply_id,
        profile_id,
    }: {
        reply_id: string;
        profile_id: string;
    }): Promise<{
        is_updated: boolean;
        vote: ReplyVote;
    }> => {
        const found_reply = await model.find_1_reply_by_its_id(reply_id);
        const existedVote = await model.find_1_vote_by_reply_id_and_profile_id(found_reply.id, profile_id);
        if (existedVote) {
            if (existedVote.vote === false) {
                throw new ConflictException(["Профил уже оставил дизлайк на этот ответ"]);
            }
            const updated_vote = await model.update_1_vote_to_reply(existedVote.id, !existedVote.vote);
            return { vote: updated_vote, is_updated: true };
        }
        const new_vote = await model.create_1_vote_to_reply(found_reply.id, false, profile_id);
        return { vote: new_vote, is_updated: false };
    };

    add_like = async ({
        reply_id,
        profile_id,
    }: {
        reply_id: string;
        profile_id: string;
    }): Promise<{
        is_updated: boolean;
        vote: ReplyVote;
    }> => {
        const found_reply = await model.find_1_reply_by_its_id(reply_id);
        const existedVote = await model.find_1_vote_by_reply_id_and_profile_id(found_reply.id, profile_id);

        if (existedVote) {
            if (existedVote.vote === true) {
                throw new ConflictException(["Профил уже оставил лайк на этот ответ"]);
            }
            const updated_vote = await model.update_1_vote_to_reply(existedVote.id, true);
            return { vote: updated_vote, is_updated: true };
        }
        const new_vote = await model.create_1_vote_to_reply(found_reply.id, true, profile_id);
        return { vote: new_vote, is_updated: false };
    };

    delete_dislike = async ({ reply_id, profile_id }: { reply_id: string; profile_id: string }) => {
        const found_reply = await model.find_1_reply_by_its_id(reply_id);

        const existedVote = await model.find_1_vote_by_reply_id_and_profile_id(found_reply.id, profile_id);
        if (!existedVote) {
            throw new NotFoundException([vote_not_found]);
        }
        if (existedVote.vote === true) {
            throw new ConflictException(["Ответ лайкнут но вы пытаетесь удалить дизлайк которого нет"]);
        }
        const deleted_vote = await model.Delete_vote_from_reply_by_its_id(existedVote.id);
        return { deleted_vote };
    };
    delete_like = async ({ reply_id, profile_id }: { reply_id: string; profile_id: string }) => {
        const found_reply = await model.find_1_reply_by_its_id(reply_id);

        const existedVote = await model.find_1_vote_by_reply_id_and_profile_id(found_reply.id, profile_id);
        if (!existedVote) {
            throw new NotFoundException([vote_not_found]);
        }
        if (existedVote.vote === false) {
            throw new ConflictException(["Ответ дизлайкнут но вы пытаетесь удалить лайк которого нет"]);
        }
        const deleted_vote = await model.Delete_vote_from_reply_by_its_id(existedVote.id);
        return { deleted_vote } as const;
    };

    report_to_reply = async ({
        reply_id,
        report_details,
        profile_id,
    }: {
        reply_id: string;
        report_details: string;
        profile_id: string;
    }) => {
        throw new NotImplementedException("еще не реализовано");
    };

    create_reply = async ({
        reply_to_id,
        content,
        profile_id,
    }: {
        reply_to_id: string;
        content: string;
        profile_id: string;
    }) => {
        const replies_count = await model.get_replies_count_on_1_comment(profile_id, reply_to_id);
        if (replies_count >= REPLIES_LIMIT_TO_ONE_COMMENT) {
            throw new ForbiddenException([
                `Максимальное количество ответов на один комментарий от одного пользователя не должно превышать ${REPLIES_LIMIT_TO_ONE_COMMENT}.`,
            ]);
        }
        const created_reply = await model.create_1_reply_to_1_comment(profile_id, content, reply_to_id);
        return { created_reply };
    };
    delete_reply = async ({ reply_id, profile_id }: { reply_id: string; profile_id: string }) => {
        const found_reply = await model.find_1_reply_by_its_id(reply_id);

        if (found_reply.by_profile_id !== profile_id) {
            throw new UnauthorizedException(["Этот ответ не ваш"]);
        }
        const deleted_reply = await model.delete_1_reply(found_reply.id);
        return { deleted_reply };
    };
    /** Edites the comment by its CUID and user profile CUID */
    edit_reply = async ({
        new_content,
        reply_id,
        profile_id,
    }: {
        new_content: string;
        reply_id: string;
        profile_id: string;
    }) => {
        const found_reply = await model.find_1_reply_by_its_id(reply_id);
        if (found_reply.by_profile_id !== profile_id) {
            throw new ForbiddenException(["Этот ответ не ваш"]);
        }
        const updated_reply = await model.update_1_reply_by_its_id(found_reply.id, new_content);
        return { updated_reply };
    };
})();
