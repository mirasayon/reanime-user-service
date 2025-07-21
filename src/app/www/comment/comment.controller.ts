import type e from "express";
import { ControllerUtils } from "#/utils/controller.js";
import { Comment_ReqDtos } from "[www]/comment/comment.pipes.js";
import { Comment_Service as service } from "[www]/comment/comment.service.js";
import { xResponse } from "@xamarin.city/reanime/user-service/patterns/response/handlers.js";
import { NotImplementedException } from "@xamarin.city/reanime/user-service/errors/server-side/exceptions.js";

export const Comment_Controller = new (class Comment_Controller {
    constructor() {}
    /** Controller for create one comment by user */
    create = async (req: Comment_ReqDtos.create, res: e.Response) => {
        const { dto, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);

        const { created_comment } = await service.create_comment({
            anime_id: dto.anime_id,
            content: dto.content,
            profile_id: auth.profile.id,
        });

        const data = created_comment;
        const message = "Успешно создан новый комментарий";
        return xResponse.accepted(res, { data, message });
    };

    /** Edit the comment by user */
    update = async (req: Comment_ReqDtos.update, res: e.Response) => {
        const { dto, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);

        const { updated_comment } = await service.update_comment({
            comment_id: dto.comment_id,
            new_content: dto.new_content,
            profile_id: auth.profile.id,
        });

        const data = updated_comment;
        const message = "Комментарий успешно обновлен";
        return xResponse.ok(res, { data, message });
    };
    /** Gives the list of comments from specified anime ID */
    get_all_for_anime = async (req: Comment_ReqDtos.get_all_for_anime, res: e.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await service.get_all_comments_by_animeid(dto);

        const data = sr;
        const message = "All comments to this anime";
        return xResponse.ok(res, { data, message });
    };

    /** Vote for the comment. Accepts "like" or "dislike" */
    add_like = async (req: Comment_ReqDtos.vote_like, res: e.Response) => {
        const { auth, dto: comment_id } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const data = await service.add_like({
            comment_id,
            profile_id: auth.profile.id,
        });
        const message = "Successfully voted the comment";
        return xResponse.ok(res, { data, message });
    };

    /** Deletes Like */
    delete_like = async (req: Comment_ReqDtos.vote_like, res: e.Response) => {
        const { auth, dto: comment_id } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_vote } = await service.delete_like({
            comment_id,
            profile_id: auth.profile.id,
        });

        const data = deleted_vote;
        const message = "Successfully deleted a like from the comment";
        return xResponse.ok(res, { data, message });
    };

    add_dislike = async (req: Comment_ReqDtos.vote_dislike, res: e.Response) => {
        const { dto: comment_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.add_dislike({
            comment_id,
            profile_id: auth.profile.id,
        });

        const data = sr;
        const message = "Successfully added a dislike the comment";
        return xResponse.ok(res, { data, message });
    };

    /** Deletes Dislike */
    delete_dislike = async (req: Comment_ReqDtos.vote_dislike, res: e.Response) => {
        const { auth, dto: comment_id } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_vote } = await service.delete_dislike({
            comment_id,
            profile_id: auth.profile.id,
        });

        const data = deleted_vote;
        const message = "Successfully deleted a dislike from the comment";
        return xResponse.ok(res, { data, message });
    };

    /** Reports the comment  by user */
    report = async (req: Comment_ReqDtos.report, reply: e.Response) => {
        throw new NotImplementedException("report comment controller");
    };
    /** Delete a comment */
    delete_comment = async (req: Comment_ReqDtos.delete_comment, reply: e.Response) => {
        const { auth, dto: comment_id } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_comment } = await service.delete_comment({
            comment_id,
            profile_id: auth.profile.id,
        });

        const data = deleted_comment;
        const message = "Successfully deleted a comment";
        return xResponse.accepted(reply, { data, message });
    };
})();
