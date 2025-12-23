import { goReplyHttp } from "#/handlers/all-http-responder.js";
import type { ResponseTypesForAnimeBookmark } from "#/shared/response-patterns-shared/marked-anime-list.routes.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import type { MarkedAnimeCollection_ReqDtos as RTDO } from "#/app/anime-bookmark-collection/anime-bookmark-collection.pipes.js";
import { MarkedAnimeCollection_Service as service } from "#/app/anime-bookmark-collection/anime-bookmark-collection.service.js";
import type { default as ExpressJS } from "express";
export const MarkedAnimeCollection_Controller = new (class MarkedAnimeCollection_Controller {
    get_all_list = async (req: RTDO.get_all_list, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const { collection } = await service.get_all_list(sessionDto.profile_id);
        const data: ResponseTypesForAnimeBookmark.get_all_list = collection;
        const message = "Ваша полная коллекция";
        return goReplyHttp.ok(res, { data, message });
    };

    get_for_anime = async (req: RTDO.get_for_anime, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await service.get_for_anime(sessionDto.profile_id, dto);
        const data: ResponseTypesForAnimeBookmark.get_for_anime = sr;
        const message = "Об аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    get_list_of_completed = async (req: RTDO.get_list_of_completed, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const { collection } = await service.get_list_of_completed(sessionDto.profile_id);
        const data: ResponseTypesForAnimeBookmark.get_list_of_completed = collection;
        const message = "Список завершенных аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    get_list_of_planned = async (req: RTDO.get_list_of_planned, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const { collection } = await service.get_list_of_planned(sessionDto.profile_id);
        const data: ResponseTypesForAnimeBookmark.get_list_of_planned = collection;
        const message = "Список запланированных аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    get_list_of_abandoned = async (req: RTDO.get_list_of_abandoned, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const { collection } = await service.get_list_of_abandoned(sessionDto.profile_id);
        const data: ResponseTypesForAnimeBookmark.get_list_of_abandoned = collection;
        const message = "Список заброшенных аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    get_list_of_watching = async (req: RTDO.get_list_of_watching, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const collection = await service.get_list_of_watching(sessionDto.profile_id);
        const data: ResponseTypesForAnimeBookmark.get_list_of_watching = collection;
        const message = "Список текущих аниме";
        return goReplyHttp.ok(res, { data, message });
    };

    /** CREATE   */

    create_abandoned = async (req: RTDO.create_abandoned, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const created_abandoned_anime = await service.create_abandoned(sessionDto.profile_id, dto);
        const data: ResponseTypesForAnimeBookmark.create_abandoned = created_abandoned_anime;
        const message = "Успешно добавлен как заброшенное аниме";
        return goReplyHttp.accepted(res, { data, message });
    };

    create_planned = async (req: RTDO.create_planned, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const created_planned_to_watch_anime = await service.create_planned(sessionDto.profile_id, dto);
        const data: ResponseTypesForAnimeBookmark.create_planned = created_planned_to_watch_anime;
        const message = "Успешно добавлен как запланированное аниме";
        return goReplyHttp.accepted(res, { data, message });
    };

    create_completed = async (req: RTDO.create_completed, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const created_planned_to_watch_anime = await service.create_planned(sessionDto.profile_id, dto);
        const data: ResponseTypesForAnimeBookmark.create_completed = created_planned_to_watch_anime;
        const message = "Успешно добавлен как завершенное аниме";
        return goReplyHttp.accepted(res, { data, message });
    };

    create_watching = async (req: RTDO.create_watching, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const created_watching_anime = await service.create_watching(sessionDto.profile_id, dto);
        const data: ResponseTypesForAnimeBookmark.create_watching = created_watching_anime;
        const message = "Успешно добавлен как текущее аниме";
        return goReplyHttp.accepted(res, { data, message });
    };
    /** DELETE */
    delete_completed = async (req: RTDO.delete_completed, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const deleted_completed_anime = await service.delete_completed(sessionDto.profile_id, dto);
        const data: ResponseTypesForAnimeBookmark.delete_completed = deleted_completed_anime;
        const message = "Успешно удалён из списка завершённых аниме";
        return goReplyHttp.accepted(res, { data, message });
    };
    delete_planned = async (req: RTDO.delete_planned, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const deleted_plan_to_watch_anime = await service.delete_planned(sessionDto.profile_id, dto);
        const data: ResponseTypesForAnimeBookmark.delete_planned = deleted_plan_to_watch_anime;
        const message = "Успешно удалён из списка запланированных аниме";
        return goReplyHttp.accepted(res, { data, message });
    };
    delete_abandoned = async (req: RTDO.delete_abandoned, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const deleted_abandoned_anime = await service.delete_abandoned(sessionDto.profile_id, dto);
        const data: ResponseTypesForAnimeBookmark.delete_abandoned = deleted_abandoned_anime;
        const message = "Успешно удалён из списка заброшенных аниме";
        return goReplyHttp.accepted(res, { data, message });
    };
    delete_watching = async (req: RTDO.delete_watching, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const deleted_watching_anime = await service.delete_watching(sessionDto.profile_id, dto);
        const data: ResponseTypesForAnimeBookmark.delete_watching = deleted_watching_anime;
        const message = "Успешно удалён из списка текущих аниме";
        return goReplyHttp.accepted(res, { data, message });
    };
})();
