import { NotImplementedException } from "#/errors/server-side-exceptions.js";
import { goReplyHttp } from "#/handlers/all-http-responder.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import type { ReplyForCommentSectionRequestTypes } from "#/app/reply-to-comment/reply-to-comment.pipes.js";
import { replyForCommentSectionService } from "#/app/reply-to-comment/reply-to-comment.service.js";
import type ExpressJS from "express";
import type { ResponseTypesFor_ReplyToComment_Section } from "#/shared/user-service-response-types-for-all.routes.js";
class ReplyToCommentRouteControllerClass {
    /** Edit the comment by profile */
    edit_reply = async (req: ReplyForCommentSectionRequestTypes.edit_reply, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const is_updated_reply = await replyForCommentSectionService.edit_reply({ ...dto, profile_id: sessionDto.profile_id });
        const data: ResponseTypesFor_ReplyToComment_Section.edit_reply = is_updated_reply;
        const message = "Ответ успешно обновлен";
        return goReplyHttp.accepted(res, { data, message });
    };
    /** Gives the list of comments from specified anime ID */
    get_1_reply_by_its_id = async (req: ReplyForCommentSectionRequestTypes.get_1_reply_by_its_id, res: ExpressJS.Response) => {
        const Req = checkRequestForValidity(req, ["dto"]);
        const sr = await replyForCommentSectionService.get_1_reply_by_its_id(Req.dto);
        const data: ResponseTypesFor_ReplyToComment_Section.get_1_reply_by_its_id = sr;
        const message = "Ответ успешно получен по его айди";
        return goReplyHttp.ok(res, { data, message });
    };
    /** Gives the list of comments from specified anime ID */
    get_replies_by_comment_id = async (req: ReplyForCommentSectionRequestTypes.get_replies_by_comment_id, res: ExpressJS.Response) => {
        const { dto } = checkRequestForValidity(req, ["dto"]);
        const { replies } = await replyForCommentSectionService.get_all_replies_by_comment_id(dto);
        const message = "Все ответы на комментарий";
        const data: ResponseTypesFor_ReplyToComment_Section.get_replies_by_comment_id = replies;
        return goReplyHttp.ok(res, { data, message });
    };
    /** Vote for the comment. Accepts "like" or "dislike" */
    add_like = async (req: ReplyForCommentSectionRequestTypes.add_like, res: ExpressJS.Response) => {
        const { dto, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await replyForCommentSectionService.add_like({
            reply_id: dto,
            profile_id: sessionDto.profile_id,
        });
        const data: ResponseTypesFor_ReplyToComment_Section.add_like = sr;
        const message = "Успешно добавлен лайк к ответу";
        return goReplyHttp.created(res, { data, message });
    };

    add_dislike = async (req: ReplyForCommentSectionRequestTypes.add_dislike, res: ExpressJS.Response) => {
        const { dto, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);

        const is_added_dislike = await replyForCommentSectionService.add_dislike({
            reply_id: dto,
            profile_id: sessionDto.profile_id,
        });
        const data: ResponseTypesFor_ReplyToComment_Section.add_dislike = is_added_dislike;
        const message = "Успешно добавлено дизлайк на ответ";
        return goReplyHttp.created(res, { data, message });
    };

    /** Vote for the comment. Accepts "like" or "dislike" */
    delete_like = async (req: ReplyForCommentSectionRequestTypes.add_like, res: ExpressJS.Response) => {
        const { dto, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const is_deleted_vote = await replyForCommentSectionService.delete_like({
            reply_id: dto,
            profile_id: sessionDto.profile_id,
        });
        const data: ResponseTypesFor_ReplyToComment_Section.delete_like = is_deleted_vote;
        const message = "Лайк с ответа успешно удалён";
        return goReplyHttp.accepted(res, { data, message });
    };

    delete_dislike = async (req: ReplyForCommentSectionRequestTypes.add_dislike, res: ExpressJS.Response) => {
        const { dto, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const is_deleted_dislike = await replyForCommentSectionService.delete_dislike({
            reply_id: dto,
            profile_id: sessionDto.profile_id,
        });
        const data: ResponseTypesFor_ReplyToComment_Section.delete_dislike = is_deleted_dislike;
        const message = "Дизлайк с ответа успешно удалён";
        return goReplyHttp.accepted(res, { data, message });
    };

    /** Reports the comment  by profile */
    report = async (req: ReplyForCommentSectionRequestTypes.report_reply, reply: ExpressJS.Response) => {
        const { dto, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        throw new NotImplementedException("report reply controller");
    };
    /** Reply to the comment by profile */
    create_reply = async (req: ReplyForCommentSectionRequestTypes.create_reply, reply: ExpressJS.Response) => {
        const { dto, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const is_created_reply = await replyForCommentSectionService.create_reply({
            content: dto.content,
            reply_to_id: dto.comment_id,
            profile_id: sessionDto.profile_id,
        });

        const data: ResponseTypesFor_ReplyToComment_Section.create_reply = is_created_reply;
        const message = "Успешно создан ответ на этот комментарий";
        return goReplyHttp.accepted(reply, {
            data,
            message,
        });
    };

    delete_reply = async (req: ReplyForCommentSectionRequestTypes.delete_reply, reply: ExpressJS.Response) => {
        const { dto, sessionDto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const is_deleted_reply = await replyForCommentSectionService.delete_reply({
            reply_id: dto,
            profile_id: sessionDto.profile_id,
        });
        const data: ResponseTypesFor_ReplyToComment_Section.delete_reply = is_deleted_reply;
        const message = "Ответ успешно удалён";
        return goReplyHttp.accepted(reply, { data, message });
    };
}

export const replyToCommentRouteController = new ReplyToCommentRouteControllerClass();
