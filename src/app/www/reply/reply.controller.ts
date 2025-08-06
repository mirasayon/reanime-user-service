import type e from "express";
import { ControllerUtils } from "#/utils/controller.js";
import type { Reply_ReqDtos as REQDTO } from "[www]/reply/reply.pipes.js";
import { Reply_Service as service } from "[www]/reply/reply.service.js";
import { Reply } from "@reanime.art/user-service/user-service/response/handlers.js";
import { NotImplementedException } from "@reanime.art/user-service/user-service/errors/server-side/exceptions.js";
import type { Reply_ResponseTypes } from "@reanime.art/user-service/user-service/response/response-data-types.js";
export const Reply_Controller = new (class Reply_Controller {
    /** Edit the comment by user */
    edit_reply = async (req: REQDTO.edit_reply, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { updated_reply } = await service.edit_reply({ ...dto, profile_id: auth.profile.id });
        const data: Reply_ResponseTypes.edit_reply = updated_reply;
        const message = "Ответ успешно обновлен";
        return Reply.accepted(res, { data, message });
    };
    /** Gives the list of comments from specified anime ID */
    get_1_reply_by_its_id = async (req: REQDTO.get_1_reply_by_its_id, res: e.Response) => {
        const Req = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await service.get_1_reply_by_its_id(Req.dto);
        const data: Reply_ResponseTypes.get_1_reply_by_its_id = sr;
        const message = "Ответ успешно получен по его айди";
        return Reply.ok(res, { data, message });
    };
    /** Gives the list of comments from specified anime ID */
    get_replies_by_comment_id = async (req: REQDTO.get_replies_by_comment_id, res: e.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const { replies } = await service.get_all_replies_by_comment_id(dto);
        const message = "Все ответы на комментарий";
        const data: Reply_ResponseTypes.get_replies_by_comment_id = replies;
        return Reply.ok(res, { data, message });
    };
    /** Vote for the comment. Accepts "like" or "dislike" */
    add_like = async (req: REQDTO.add_like, res: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.add_like({
            reply_id,
            profile_id: auth.profile.id,
        });
        const data: Reply_ResponseTypes.add_like = sr;
        const message = "Успешно добавлен лайк к ответу";
        return Reply.created(res, { data, message });
    };

    add_dislike = async (req: REQDTO.add_dislike, res: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);

        const sr = await service.add_dislike({
            reply_id,
            profile_id: auth.profile.id,
        });
        const data: Reply_ResponseTypes.add_dislike = sr;
        const message = "Успешно добавлено дизлайк на ответ";
        return Reply.created(res, { data, message });
    };

    /** Vote for the comment. Accepts "like" or "dislike" */
    delete_like = async (req: REQDTO.add_like, res: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_vote } = await service.delete_like({
            reply_id,
            profile_id: auth.profile.id,
        });
        const data: Reply_ResponseTypes.delete_like = deleted_vote;
        const message = "Лайк с ответа успешно удалён";
        return Reply.accepted(res, { data, message });
    };

    delete_dislike = async (req: REQDTO.add_dislike, res: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_vote } = await service.delete_dislike({
            reply_id,
            profile_id: auth.profile.id,
        });
        const data: Reply_ResponseTypes.delete_dislike = deleted_vote;
        const message = "Дизлайк с ответа успешно удалён";
        return Reply.accepted(res, { data, message });
    };

    /** Reports the comment  by user */
    report = async (req: REQDTO.report_reply, reply: e.Response) => {
        const { dto, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        throw new NotImplementedException("report reply controller");
    };
    /** Reply to the comment by user */
    create_reply = async (req: REQDTO.create_reply, reply: e.Response) => {
        const Req = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_reply } = await service.create_reply({
            content: Req.dto.content,
            reply_to_id: Req.dto.comment_id,
            profile_id: Req.auth.profile.id,
        });

        const data: Reply_ResponseTypes.create_reply = created_reply;
        const message = "Успешно создан ответ на этот комментарий";
        return Reply.accepted(reply, {
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
        const data: Reply_ResponseTypes.delete_reply = deleted_reply;
        const message = "Ответ успешно удалён";
        return Reply.accepted(reply, { data, message });
    };
})();

