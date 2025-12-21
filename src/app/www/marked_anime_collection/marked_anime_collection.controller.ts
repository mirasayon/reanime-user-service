import { goReplyHttp } from "#/handlers/final-responder/all-http-responder.js";
import type { ResponseTypesForAnimeBookmark } from "#/shared/response-patterns/marked-anime-list.routes.js";
import { ControllerUtils } from "#/utilities/controller.js";
import type { MarkedAnimeCollection_ReqDtos as RTDO } from "[www]/marked_anime_collection/marked_anime_collection.pipes.js";
import { MarkedAnimeCollection_Service as service } from "[www]/marked_anime_collection/marked_anime_collection.service.js";
import type { default as ExpressJS } from "express";
export const MarkedAnimeCollection_Controller = new (class MarkedAnimeCollection_Controller {
    get_all_list = async (req: RTDO.get_all_list, res: ExpressJS.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_all_list(auth.profile.id);
        const data: ResponseTypesForAnimeBookmark.get_all_list = collection;
        const message = "Ваша полная коллекция";
        return goReplyHttp.ok(res, { data, message });
    };

    get_for_anime = async (req: RTDO.get_for_anime, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.get_for_anime(auth.profile.id, dto);
        const data: ResponseTypesForAnimeBookmark.get_for_anime = sr;
        const message = "Об аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    get_list_of_completed = async (req: RTDO.get_list_of_completed, res: ExpressJS.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_list_of_completed(auth.profile.id);
        const data: ResponseTypesForAnimeBookmark.get_list_of_completed = collection;
        const message = "Список завершенных аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    get_list_of_planned = async (req: RTDO.get_list_of_planned, res: ExpressJS.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_list_of_planned(auth.profile.id);
        const data: ResponseTypesForAnimeBookmark.get_list_of_planned = collection;
        const message = "Список запланированных аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    get_list_of_abandoned = async (req: RTDO.get_list_of_abandoned, res: ExpressJS.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_list_of_abandoned(auth.profile.id);
        const data: ResponseTypesForAnimeBookmark.get_list_of_abandoned = collection;
        const message = "Список заброшенных аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    get_list_of_watching = async (req: RTDO.get_list_of_watching, res: ExpressJS.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_list_of_watching(auth.profile.id);
        const data: ResponseTypesForAnimeBookmark.get_list_of_watching = collection;
        const message = "Список текущих аниме";
        return goReplyHttp.ok(res, { data, message });
    };

    /** CREATE   */

    create_abandoned = async (req: RTDO.create_abandoned, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_abandoned_anime } = await service.create_abandoned(auth.profile.id, dto);
        const data: ResponseTypesForAnimeBookmark.create_abandoned = created_abandoned_anime;
        const message = "Успешно добавлен как заброшенное аниме";
        return goReplyHttp.accepted(res, { data, message });
    };

    create_planned = async (req: RTDO.create_planned, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_planned_to_watch_anime } = await service.create_planned(auth.profile.id, dto);
        const data: ResponseTypesForAnimeBookmark.create_planned = created_planned_to_watch_anime;
        const message = "Успешно добавлен как запланированное аниме";
        return goReplyHttp.accepted(res, { data, message });
    };

    create_completed = async (req: RTDO.create_completed, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_planned_to_watch_anime } = await service.create_planned(auth.profile.id, dto);
        const data: ResponseTypesForAnimeBookmark.create_completed = created_planned_to_watch_anime;
        const message = "Успешно добавлен как завершенное аниме";
        return goReplyHttp.accepted(res, { data, message });
    };

    create_watching = async (req: RTDO.create_watching, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_watching_anime } = await service.create_watching(auth.profile.id, dto);
        const data: ResponseTypesForAnimeBookmark.create_watching = created_watching_anime;
        const message = "Успешно добавлен как текущее аниме";
        return goReplyHttp.accepted(res, { data, message });
    };
    /** DELETE */
    delete_completed = async (req: RTDO.delete_completed, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_completed_anime } = await service.delete_completed(auth.profile.id, dto);
        const data: ResponseTypesForAnimeBookmark.delete_completed = deleted_completed_anime;
        const message = "Успешно удалён из списка завершеннных аниме";
        return goReplyHttp.accepted(res, { data, message });
    };
    delete_planned = async (req: RTDO.delete_planned, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_plan_to_watch_anime } = await service.delete_planned(auth.profile.id, dto);
        const data: ResponseTypesForAnimeBookmark.delete_planned = deleted_plan_to_watch_anime;
        const message = "Успешно удалён из списка запланированных аниме";
        return goReplyHttp.accepted(res, { data, message });
    };
    delete_abandoned = async (req: RTDO.delete_abandoned, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_abandoned_anime } = await service.delete_abandoned(auth.profile.id, dto);
        const data: ResponseTypesForAnimeBookmark.delete_abandoned = deleted_abandoned_anime;
        const message = "Успешно удалён из списка заброшенных аниме";
        return goReplyHttp.accepted(res, { data, message });
    };
    delete_watching = async (req: RTDO.delete_watching, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_watching_anime } = await service.delete_watching(auth.profile.id, dto);
        const data: ResponseTypesForAnimeBookmark.delete_watching = deleted_watching_anime;
        const message = "Успешно удалён из списка текущих аниме";
        return goReplyHttp.accepted(res, { data, message });
    };
})();
