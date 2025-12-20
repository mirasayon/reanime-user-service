import { NotImplementedException } from "#/modules/errors/server-side/exceptions.js";
import { goReplyHttp } from "#/modules/response/handlers.js";
import type { ResponseTypesForComment } from "#/shared/response-patterns/comment.routes.js";
import { ControllerUtils } from "#/utils/controller.js";
import type { Comment_ReqDtos } from "[www]/comment/comment.pipes.js";
import { Comment_Service as service } from "[www]/comment/comment.service.js";
import type Express from "express";

export const Comment_Controller = new (class Comment_Controller {
    /** Controller for create one comment by profile */
    create_comment = async (req: Comment_ReqDtos.create, res: Express.Response) => {
        const { dto, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);

        const { created_comment } = await service.create_comment({
            anime_id: dto.anime_id,
            content: dto.content,
            by_profile_id: auth.profile.id,
        });

        const data: ResponseTypesForComment.create_comment = created_comment;
        const message = "Успешно создан новый комментарий";
        return goReplyHttp.accepted(res, { data, message });
    };

    /** Edit the comment by profile */
    update_comment = async (req: Comment_ReqDtos.update, res: Express.Response) => {
        const { dto, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);

        const { updated_comment } = await service.update_comment({
            comment_id: dto.comment_id,
            new_content: dto.new_content,
            profile_id: auth.profile.id,
        });

        const data: ResponseTypesForComment.update_comment = updated_comment;
        const message = "Комментарий успешно обновлен";
        return goReplyHttp.ok(res, { data, message });
    };
    /** Gives the list of comments from specified anime ID */
    get_all_for_anime = async (req: Comment_ReqDtos.get_all_for_anime, res: Express.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await service.get_all_comments_by_animeId(dto);

        const data: ResponseTypesForComment.get_all_for_anime = sr;
        const message = "Все комментарии к этому аниме";
        return goReplyHttp.ok(res, { data, message });
    };

    /** new 2025.11.15
     * Получить все комментарии для публичного профиля
     */
    all_for_public_profile = async (req: Comment_ReqDtos.all_for_public_profile, res: Express.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await service.all_for_public_profile({ by_username: dto.username, limit: dto.limit, page: dto.page });

        const data: ResponseTypesForComment.all_for_public_profile = sr;
        const message = "Все комментарии этого публичного профиля";
        return goReplyHttp.ok(res, { data, message });
    };

    /** new 2025.11.15
     * Получить все комментарии для одного пользователя
     */
    all_my_comments = async (req: Comment_ReqDtos.all_my_comments, res: Express.Response) => {
        const { dto, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.all_my_comments({ by_profile_id: auth.profile.id, limit: dto.limit, page: dto.page });

        const data: ResponseTypesForComment.all_my_comments = sr;
        const message = "Все ваши комментарии";
        return goReplyHttp.ok(res, { data, message });
    };

    /** Vote for the comment. Accepts "like" or "dislike" */
    add_like = async (req: Comment_ReqDtos.vote_like, res: Express.Response) => {
        const { auth, dto: comment_id } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.add_like({
            comment_id,
            profile_id: auth.profile.id,
        });
        const data: ResponseTypesForComment.add_like = sr;
        const message = "Успешно поставлен лайк к комментарию";
        return goReplyHttp.ok(res, { data, message });
    };

    /** Deletes Like */
    delete_like = async (req: Comment_ReqDtos.vote_like, res: Express.Response) => {
        const { auth, dto: comment_id } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_vote } = await service.delete_like({
            comment_id,
            profile_id: auth.profile.id,
        });

        const data: ResponseTypesForComment.delete_like = deleted_vote;
        const message = "Успешно удален лайк из комментария";
        return goReplyHttp.ok(res, { data, message });
    };

    add_dislike = async (req: Comment_ReqDtos.vote_dislike, res: Express.Response) => {
        const { dto: comment_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.add_dislike({
            comment_id,
            profile_id: auth.profile.id,
        });

        const data: ResponseTypesForComment.add_dislike = sr;
        const message = "Успешно поставлен дизлайк к комментарию";
        return goReplyHttp.ok(res, { data, message });
    };

    /** Deletes Dislike */
    delete_dislike = async (req: Comment_ReqDtos.vote_dislike, res: Express.Response) => {
        const { auth, dto: comment_id } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_vote } = await service.delete_dislike({
            comment_id,
            profile_id: auth.profile.id,
        });

        const data: ResponseTypesForComment.delete_dislike = deleted_vote;
        const message = "Успешно удален дизлайк из комментария";
        return goReplyHttp.ok(res, { data, message });
    };

    /** Reports the comment  by profile */
    report = async (req: Comment_ReqDtos.report, reply: Express.Response) => {
        throw new NotImplementedException("report comment controller");
    };
    /** Delete a comment */
    delete_comment = async (req: Comment_ReqDtos.delete_comment, reply: Express.Response) => {
        const { auth, dto: comment_id } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_comment } = await service.delete_comment({
            comment_id,
            profile_id: auth.profile.id,
        });
        const data: ResponseTypesForComment.delete_comment = deleted_comment;
        const message = "Комментарий успешно удалён";
        return goReplyHttp.accepted(reply, { data, message });
    };
})();
