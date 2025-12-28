import { MAX_COMMENT_ON_ANIME_LIMIT } from "#src/configs/application-rules-config.ts";
import { ConflictException, ForbiddenException, NotFoundException } from "#src/errors/client-side-exceptions.ts";
import { NotImplementedException } from "#src/errors/server-side-exceptions.ts";
import type { CommentForAnime } from "#orm";
import { commentRouteModel } from "#src/app/comment-for-anime/comment-for-anime.model.ts";
import { voteNotFoundErrorMessage } from "#src/constants/frequent-errors.ts";
import type { ResponseTypesFor_CommentForAnime_Section } from "#src/shared/user-service-response-types-for-all.routes.ts";
import { profileRouteModel } from "#src/app/user-profile/user-profile.model.ts";

/** Service Class with all methods for comments */
class CommentToAnimeSectionService {
    /** Creates new Comment record and chains to new created comment record in the DB*/
    create_comment = async ({ anime_id, content, by_profile_id }: { anime_id: number; content: string; by_profile_id: string }): Promise<boolean> => {
        const max = await commentRouteModel.get_comment_count_on_1_anime(by_profile_id, anime_id);
        if (max >= MAX_COMMENT_ON_ANIME_LIMIT) {
            throw new ForbiddenException([
                `Максимальное количество комментариев к аниме от одного пользователя не должно превышать ${MAX_COMMENT_ON_ANIME_LIMIT}`,
            ]);
        }

        const duplicate = await commentRouteModel.find_1_comment_by_its_content_and_owner_profile_id_and_anime_id({
            anime_id,
            content,
            by_profile_id,
        });
        if (duplicate) {
            throw new ConflictException(["Вы уже оставляли такой комментарии."]);
        }
        await commentRouteModel.create_1_comment(by_profile_id, content, anime_id);
        return true;
    };
    /** Gets all the comments from a public profile */
    all_for_public_profile = async ({
        by_username,
        limit,
        page,
    }: {
        page: number;
        limit: number;
        by_username: string;
    }): Promise<CommentForAnime[]> => {
        const {
            profile: { id: by_profile_id },
        } = await profileRouteModel.find_profile_by_username(by_username);
        const comments = await commentRouteModel.get_all_comments_for_public_profile({ by_profile_id, limit, page });
        return comments;
    };

    /** Gets all the comments from a private profile  */
    all_my_comments = async ({ by_profile_id, limit, page }: { page: number; limit: number; by_profile_id: string }): Promise<CommentForAnime[]> => {
        const comments = await commentRouteModel.get_all_comments_for_public_profile({ by_profile_id, limit, page });
        return comments;
    };

    get_all_comments_by_animeId = async (args: {
        page: number;
        limit: number;
        anime_id: number;
    }): Promise<ResponseTypesFor_CommentForAnime_Section["get_all_for_anime"]> => {
        const comments = await commentRouteModel.get_all_comments_for_anime(args);
        return comments;
    };
    add_dislike = async (args: { comment_id: string; profile_id: string }): Promise<boolean> => {
        const found_comment = await commentRouteModel.find_1_comment_by_its_id(args.comment_id);

        const existedVote = await commentRouteModel.find_1_vote_by_comment_id_and_profile_id(found_comment.id, args.profile_id);
        if (existedVote) {
            if (existedVote.value === -1) {
                throw new ConflictException(["Дизлайк на этот комментарий уже поставлен"]);
            }
            await commentRouteModel.update_1_vote_to_comment(existedVote.id, -1);
            return false;
        }
        await commentRouteModel.create_1_vote_to_comment(found_comment.id, args.profile_id, -1);
        return true;
    };

    delete_dislike = async ({ comment_id, profile_id }: { comment_id: string; profile_id: string }) => {
        const found_comment = await commentRouteModel.find_1_comment_by_its_id(comment_id);

        const existedVote = await commentRouteModel.find_1_vote_by_comment_id_and_profile_id(found_comment.id, profile_id);
        if (!existedVote) {
            throw new NotFoundException([voteNotFoundErrorMessage]);
        }
        if (existedVote.value === 1) {
            throw new ConflictException(["У этого аниме лайк"]);
        }
        const deleted_vote = await commentRouteModel.delete_1_vote_from_comment(existedVote.id);
        return !!deleted_vote;
    };
    add_like = async (args: { comment_id: string; profile_id: string }): Promise<boolean> => {
        const found_comment = await commentRouteModel.find_1_comment_by_its_id(args.comment_id);
        const existedVote = await commentRouteModel.find_1_vote_by_comment_id_and_profile_id(found_comment.id, args.profile_id);
        if (existedVote) {
            if (existedVote.value === 1) {
                throw new ConflictException(["Профиль уже лайкнул этот комментарий"]);
            }
            await commentRouteModel.update_1_vote_to_comment(existedVote.id, 1);
            return false;
        }
        await commentRouteModel.create_1_vote_to_comment(found_comment.id, args.profile_id, 1);
        return true;
    };
    delete_like = async ({ comment_id, profile_id }: { comment_id: string; profile_id: string }) => {
        const found_comment = await commentRouteModel.find_1_comment_by_its_id(comment_id);
        const existedVote = await commentRouteModel.find_1_vote_by_comment_id_and_profile_id(found_comment.id, profile_id);
        if (!existedVote) {
            throw new NotFoundException([voteNotFoundErrorMessage]);
        }
        if (existedVote.value === -1) {
            throw new ConflictException(["У этого аниме дизлайк"]);
        }
        await commentRouteModel.delete_1_vote_from_comment(existedVote.id);
        return true;
    };
    report_comment = async (args: { comment_id: string; report_details: string; profile_id: string }): Promise<boolean> => {
        throw new NotImplementedException(["Еще не реализовано"]);
    };
    /** Deletes a comment */
    delete_comment = async (args: { profile_id: string; comment_id: string }): Promise<boolean> => {
        const found_comment = await commentRouteModel.find_1_comment_by_its_id(args.comment_id);
        await commentRouteModel.delete_1_comment(found_comment.id);
        return !true;
    };
    /** Edits the comment by its ID and profile ID */
    update_comment = async (args: { new_content: string; comment_id: string; profile_id: string }): Promise<boolean> => {
        const found_one = await commentRouteModel.find_1_comment_by_its_id(args.comment_id);
        if (found_one.by_profile_id !== args.profile_id) {
            throw new ForbiddenException(["Пользователь не оставил никаких комментариев"]);
        }
        const updated_comment = await commentRouteModel.update_1_comment_by_its_id(found_one.id, args.new_content);
        return !!updated_comment;
    };
}
export const commentToAnimeSectionService = new CommentToAnimeSectionService();
