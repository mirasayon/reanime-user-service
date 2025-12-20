import { NotImplementedException } from "#/modules/errors/server-side/exceptions.js";
import { goReplyHttp } from "#/modules/response/handlers.js";
import type { ResponseTypesForReplyToComment } from "#/shared/response-patterns/comment-reply.routes.js";
import { ControllerUtils } from "#/utils/controller.js";
import type { Reply_ReqDtos as REQDTO } from "[www]/reply/reply.pipes.js";
import { Reply_Service as service } from "[www]/reply/reply.service.js";
import type e from "express";
export const Reply_Controller = new (class Reply_Controller {
    /** Edit the comment by profile */
    edit_reply = async (req: REQDTO.edit_reply, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { updated_reply } = await service.edit_reply({ ...dto, profile_id: auth.profile.id });
        const data: ResponseTypesForReplyToComment.edit_reply = updated_reply;
        const message = "Ответ успешно обновлен";
        return goReplyHttp.accepted(res, { data, message });
    };
    /** Gives the list of comments from specified anime ID */
    get_1_reply_by_its_id = async (req: REQDTO.get_1_reply_by_its_id, res: e.Response) => {
        const Req = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await service.get_1_reply_by_its_id(Req.dto);
        const data: ResponseTypesForReplyToComment.get_1_reply_by_its_id = sr;
        const message = "Ответ успешно получен по его айди";
        return goReplyHttp.ok(res, { data, message });
    };
    /** Gives the list of comments from specified anime ID */
    get_replies_by_comment_id = async (req: REQDTO.get_replies_by_comment_id, res: e.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const { replies } = await service.get_all_replies_by_comment_id(dto);
        const message = "Все ответы на комментарий";
        const data: ResponseTypesForReplyToComment.get_replies_by_comment_id = replies;
        return goReplyHttp.ok(res, { data, message });
    };
    /** Vote for the comment. Accepts "like" or "dislike" */
    add_like = async (req: REQDTO.add_like, res: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.add_like({
            reply_id,
            profile_id: auth.profile.id,
        });
        const data: ResponseTypesForReplyToComment.add_like = sr;
        const message = "Успешно добавлен лайк к ответу";
        return goReplyHttp.created(res, { data, message });
    };

    add_dislike = async (req: REQDTO.add_dislike, res: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);

        const sr = await service.add_dislike({
            reply_id,
            profile_id: auth.profile.id,
        });
        const data: ResponseTypesForReplyToComment.add_dislike = sr;
        const message = "Успешно добавлено дизлайк на ответ";
        return goReplyHttp.created(res, { data, message });
    };

    /** Vote for the comment. Accepts "like" or "dislike" */
    delete_like = async (req: REQDTO.add_like, res: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_vote } = await service.delete_like({
            reply_id,
            profile_id: auth.profile.id,
        });
        const data: ResponseTypesForReplyToComment.delete_like = deleted_vote;
        const message = "Лайк с ответа успешно удалён";
        return goReplyHttp.accepted(res, { data, message });
    };

    delete_dislike = async (req: REQDTO.add_dislike, res: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_vote } = await service.delete_dislike({
            reply_id,
            profile_id: auth.profile.id,
        });
        const data: ResponseTypesForReplyToComment.delete_dislike = deleted_vote;
        const message = "Дизлайк с ответа успешно удалён";
        return goReplyHttp.accepted(res, { data, message });
    };

    /** Reports the comment  by profile */
    report = async (req: REQDTO.report_reply, reply: e.Response) => {
        const { dto, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        throw new NotImplementedException("report reply controller");
    };
    /** Reply to the comment by profile */
    create_reply = async (req: REQDTO.create_reply, reply: e.Response) => {
        const Req = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_reply } = await service.create_reply({
            content: Req.dto.content,
            reply_to_id: Req.dto.comment_id,
            profile_id: Req.auth.profile.id,
        });

        const data: ResponseTypesForReplyToComment.create_reply = !!created_reply;
        const message = "Успешно создан ответ на этот комментарий";
        return goReplyHttp.accepted(reply, {
            data,
            message,
        });
    };

    delete_reply = async (req: REQDTO.delete_reply, reply: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_reply } = await service.delete_reply({
            reply_id,
            profile_id: auth.profile.id,
        });
        const data: ResponseTypesForReplyToComment.delete_reply = !!deleted_reply;
        const message = "Ответ успешно удалён";
        return goReplyHttp.accepted(reply, { data, message });
    };
})();
