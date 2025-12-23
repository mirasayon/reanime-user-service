import { NotImplementedException } from "#/errors/server-side-exceptions.js";
import { goReplyHttp } from "#/handlers/all-http-responder.js";
import type { ResponseTypesFor_CommentForAnime_Section } from "#/shared/response-patterns-shared/comment.response-types.routes.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import type { default as ExpressJS } from "express";
import type { Comment_ReqDtos } from "#/app/comment-for-anime/comment-for-anime.pipes.js";
import { commentRouteService } from "#/app/comment-for-anime/comment-for-anime.service.js";

class CommentToAnimeRouteControllerClass {
    /** Controller for create one comment by profile */
    create_comment = async (req: Comment_ReqDtos.create, res: ExpressJS.Response) => {
        const { dto, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);

        const created_comment = await commentRouteService.create_comment({
            anime_id: dto.anime_id,
            content: dto.content,
            by_profile_id: sessionDto.profile_id,
        });

        const data: ResponseTypesFor_CommentForAnime_Section.create_comment = created_comment;
        const message = "Успешно создан новый комментарий";
        return goReplyHttp.accepted(res, { data, message });
    };

    /** Edit the comment by profile */
    update_comment = async (req: Comment_ReqDtos.update, res: ExpressJS.Response) => {
        const { dto, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);

        const updated_comment = await commentRouteService.update_comment({
            comment_id: dto.comment_id,
            new_content: dto.new_content,
            profile_id: sessionDto.profile_id,
        });

        const data: ResponseTypesFor_CommentForAnime_Section.update_comment = updated_comment;
        const message = "Комментарий успешно обновлен";
        return goReplyHttp.ok(res, { data, message });
    };
    /** Gives the list of comments from specified anime ID */
    get_all_for_anime = async (req: Comment_ReqDtos.get_all_for_anime, res: ExpressJS.Response) => {
        const { dto } = checkRequestForValidity(req, ["dto"]);
        const sr = await commentRouteService.get_all_comments_by_animeId(dto);

        const data: ResponseTypesFor_CommentForAnime_Section.get_all_for_anime = sr;
        const message = "Все комментарии к этому аниме";
        return goReplyHttp.ok(res, { data, message });
    };

    /** new 2025.11.15
     * Получить все комментарии для публичного профиля
     */
    all_for_public_profile = async (req: Comment_ReqDtos.all_for_public_profile, res: ExpressJS.Response) => {
        const { dto } = checkRequestForValidity(req, ["dto"]);
        const sr = await commentRouteService.all_for_public_profile({ by_username: dto.username, limit: dto.limit, page: dto.page });

        const data: ResponseTypesFor_CommentForAnime_Section.all_for_public_profile = sr;
        const message = "Все комментарии этого публичного профиля";
        return goReplyHttp.ok(res, { data, message });
    };
    all_my_comments = async (req: Comment_ReqDtos.all_my_comments, res: ExpressJS.Response) => {
        const { dto, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await commentRouteService.all_my_comments({ by_profile_id: sessionDto.profile_id, limit: dto.limit, page: dto.page });

        const data: ResponseTypesFor_CommentForAnime_Section.all_my_comments = sr;
        const message = "Все ваши комментарии";
        return goReplyHttp.ok(res, { data, message });
    };

    /** Vote for the comment. Accepts "like" or "dislike" */
    add_like = async (req: Comment_ReqDtos.vote_like, res: ExpressJS.Response) => {
        const { sessionDto, dto: comment_id } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await commentRouteService.add_like({
            comment_id,
            profile_id: sessionDto.profile_id,
        });
        const data: ResponseTypesFor_CommentForAnime_Section.add_like = sr;
        const message = "Успешно поставлен лайк к комментарию";
        return goReplyHttp.ok(res, { data, message });
    };

    /** Deletes Like */
    delete_like = async (req: Comment_ReqDtos.vote_like, res: ExpressJS.Response) => {
        const { sessionDto, dto: comment_id } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const deleted_vote = await commentRouteService.delete_like({
            comment_id,
            profile_id: sessionDto.profile_id,
        });

        const data: ResponseTypesFor_CommentForAnime_Section.delete_like = deleted_vote;
        const message = "Успешно удален лайк из комментария";
        return goReplyHttp.ok(res, { data, message });
    };

    add_dislike = async (req: Comment_ReqDtos.vote_dislike, res: ExpressJS.Response) => {
        const { dto: comment_id, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await commentRouteService.add_dislike({
            comment_id,
            profile_id: sessionDto.profile_id,
        });

        const data: ResponseTypesFor_CommentForAnime_Section.add_dislike = sr;
        const message = "Успешно поставлен дизлайк к комментарию";
        return goReplyHttp.ok(res, { data, message });
    };

    /** Deletes Dislike */
    delete_dislike = async (req: Comment_ReqDtos.vote_dislike, res: ExpressJS.Response) => {
        const { sessionDto, dto: comment_id } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const deleted_vote = await commentRouteService.delete_dislike({
            comment_id,
            profile_id: sessionDto.profile_id,
        });

        const data: ResponseTypesFor_CommentForAnime_Section.delete_dislike = deleted_vote;
        const message = "Успешно удален дизлайк из комментария";
        return goReplyHttp.ok(res, { data, message });
    };

    /** Reports the comment  by profile */
    report = async (req: Comment_ReqDtos.report, reply: ExpressJS.Response) => {
        throw new NotImplementedException("report comment controller");
    };
    /** Delete a comment */
    delete_comment = async (req: Comment_ReqDtos.delete_comment, reply: ExpressJS.Response) => {
        const { sessionDto, dto: comment_id } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const deleted_comment = await commentRouteService.delete_comment({
            comment_id,
            profile_id: sessionDto.profile_id,
        });
        const data: ResponseTypesFor_CommentForAnime_Section.delete_comment = deleted_comment;
        const message = "Комментарий успешно удалён";
        return goReplyHttp.accepted(reply, { data, message });
    };
}
export const commentToAnimeRouteController = new CommentToAnimeRouteControllerClass();
