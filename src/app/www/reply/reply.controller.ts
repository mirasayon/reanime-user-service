import type e from "express";
import { ControllerUtils } from "#/utils/controller.js";
import type { Reply_ReqDtos as REQDTO } from "[www]/reply/reply.pipes.js";
import { Reply_Service as service } from "[www]/reply/reply.service.js";
import { xResponse } from "@xamarin.city/reanime/user-service/patterns/response/handlers.js";
import { NotImplementedException } from "@xamarin.city/reanime/user-service/errors/server-side/exceptions.js";
export const Reply_Controller = new (class Reply_Controller {
    /** Edit the comment by user */
    edit_reply = async (req: REQDTO.edit_reply, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { updated_reply } = await service.edit_reply({
            reply_id: dto.reply_id,
            new_content: dto.content,
            profile_id: auth.profile.id,
        });
        return xResponse.accepted(res, { data: updated_reply, message: "Succesfully updated the reply" });
    };
    /** Gives the list of comments from specified anime ID */
    get_1_reply_by_its_id = async (req: REQDTO.get_1_reply_by_its_id, res: e.Response) => {
        const Req = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const sr = await service.get_1_reply_by_its_id(Req.dto);
        return xResponse.ok(res, { data: sr, message: "Reply info by its id" });
    };
    /** Gives the list of comments from specified anime ID */
    get_replies_by_comment_id = async (req: REQDTO.get_replies_by_comment_id, res: e.Response) => {
        const { dto } = ControllerUtils.check_dto_for_validity(req, ["dto"]);
        const { replies } = await service.get_all_replies_by_comment_id(dto);
        return xResponse.ok(res, { data: replies, message: "All replies to the comment" });
    };
    /** Vote for the comment. Accepts "like" or "dislike" */
    add_like = async (req: REQDTO.add_like, res: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.add_like({
            reply_id,
            profile_id: auth.profile.id,
        });
        return xResponse.created(res, { data: sr, message: "Successfully added like to the reply" });
    };

    add_dislike = async (req: REQDTO.add_dislike, res: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);

        const sr = await service.add_dislike({
            reply_id,
            profile_id: auth.profile.id,
        });
        return xResponse.created(res, { data: sr, message: "Successfully added dislike to reply" });
    };

    /** Vote for the comment. Accepts "like" or "dislike" */
    delete_like = async (req: REQDTO.add_like, res: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_vote } = await service.delete_like({
            reply_id,
            profile_id: auth.profile.id,
        });
        return xResponse.accepted(res, { data: deleted_vote, message: "Deleted a like from reply" });
    };

    delete_dislike = async (req: REQDTO.add_dislike, res: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_vote } = await service.delete_dislike({
            reply_id,
            profile_id: auth.profile.id,
        });
        return xResponse.accepted(res, { data: deleted_vote, message: "Deleted a dislike from the reply" });
    };

    /** Reports the comment  by user */
    report = async (req: REQDTO.report_reply, reply: e.Response) => {
        const { dto, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        throw new NotImplementedException("report reply controller");
    };
    /** Reply to the comment by user */
    create_reply = async (req: REQDTO.create_reply, reply: e.Response) => {
        const Req = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.create_reply({
            content: Req.dto.content,
            reply_to_id: Req.dto.comment_id,
            profile_id: Req.auth.profile.id,
        });
        return xResponse.accepted(reply, {
            data: sr.created_reply,
            message: "Successfully created reply to this comment",
        });
    };

    delete_reply = async (req: REQDTO.delete_reply, reply: e.Response) => {
        const { dto: reply_id, auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_reply } = await service.delete_reply({
            reply_id,
            profile_id: auth.profile.id,
        });
        return xResponse.accepted(reply, { data: deleted_reply, message: "Successfully deleted reply" });
    };
})();

