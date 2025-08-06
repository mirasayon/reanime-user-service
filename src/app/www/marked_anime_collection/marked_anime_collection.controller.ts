import { ControllerUtils } from "#/utils/controller.js";
import { Reply } from "@reanime.art/user-service/user-service/response/handlers.js";
import { MarkedAnimeCollection_Service as service } from "[www]/marked_anime_collection/marked_anime_collection.service.js";
import type { MarkedAnimeCollection_ReqDtos as RTDO } from "[www]/marked_anime_collection/marked_anime_collection.pipes.js";
import type e from "express";
import type { MarkedAnimeCollection_ResponseTypes } from "@reanime.art/user-service/user-service/response/response-data-types.js";

export const MarkedAnimeCollection_Controller = new (class MarkedAnimeCollection_Controller {
    get_all_list = async (req: RTDO.get_all_list, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_all_list(auth.profile.id);
        const data: MarkedAnimeCollection_ResponseTypes.get_all_list = collection;
        const message = "Ваша полная коллекция";
        return Reply.ok(res, { data, message });
    };

    get_for_anime = async (req: RTDO.get_all_list, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.get_for_anime(auth.profile.id, dto);
        const data: MarkedAnimeCollection_ResponseTypes.get_for_anime = sr;
        const message = "Об аниме";
        return Reply.ok(res, { data, message });
    };
    get_list_of_completed = async (req: RTDO.get_list_of_completed, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_list_of_completed(auth.profile.id);
        const data: MarkedAnimeCollection_ResponseTypes.get_list_of_completed = collection;
        const message = "Список завершенных аниме";
        return Reply.ok(res, { data, message });
    };
    get_list_of_planned = async (req: RTDO.get_list_of_planned, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_list_of_planned(auth.profile.id);
        const data: MarkedAnimeCollection_ResponseTypes.get_list_of_planned = collection;
        const message = "Список запланированных аниме";
        return Reply.ok(res, { data, message });
    };
    get_list_of_abandoned = async (req: RTDO.get_list_of_abandoned, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_list_of_abandoned(auth.profile.id);
        const data: MarkedAnimeCollection_ResponseTypes.get_list_of_abandoned = collection;
        const message = "Список заброшенных аниме";
        return Reply.ok(res, { data, message });
    };
    get_list_of_watching = async (req: RTDO.get_list_of_watching, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_list_of_watching(auth.profile.id);
        const data: MarkedAnimeCollection_ResponseTypes.get_list_of_watching = collection;
        const message = "Список текущих аниме";
        return Reply.ok(res, { data, message });
    };

    /** CREATE   */

    create_abandoned = async (req: RTDO.create_abandoned, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_abandoned_anime } = await service.create_abandoned(auth.profile.id, dto);
        const data: MarkedAnimeCollection_ResponseTypes.create_abandoned = created_abandoned_anime;
        const message = "Успешно добавлен как заброшенное аниме";
        return Reply.accepted(res, { data, message });
    };

    create_planned = async (req: RTDO.create_planned, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_planned_to_watch_anime } = await service.create_planned(auth.profile.id, dto);
        const data: MarkedAnimeCollection_ResponseTypes.create_planned = created_planned_to_watch_anime;
        const message = "Успешно добавлен как запланированное аниме";
        return Reply.accepted(res, { data, message });
    };

    create_completed = async (req: RTDO.create_completed, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_planned_to_watch_anime } = await service.create_planned(auth.profile.id, dto);
        const data: MarkedAnimeCollection_ResponseTypes.create_completed = created_planned_to_watch_anime;
        const message = "Успешно добавлен как завершенное аниме";
        return Reply.accepted(res, { data, message });
    };

    create_watching = async (req: RTDO.create_watching, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_watching_anime } = await service.create_watching(auth.profile.id, dto);
        const data: MarkedAnimeCollection_ResponseTypes.create_watching = created_watching_anime;
        const message = "Успешно добавлен как текущее аниме";
        return Reply.accepted(res, { data, message });
    };
    /** DELETE */
    delete_completed = async (req: RTDO.delete_completed, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_completed_anime } = await service.delete_completed(auth.profile.id, dto);
        const data: MarkedAnimeCollection_ResponseTypes.delete_completed = deleted_completed_anime;
        const message = "Успешно удалён из списка завершеннных аниме";
        return Reply.accepted(res, { data, message });
    };
    delete_planned = async (req: RTDO.delete_planned, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_plan_to_watch_anime } = await service.delete_planned(auth.profile.id, dto);
        const data: MarkedAnimeCollection_ResponseTypes.delete_planned = deleted_plan_to_watch_anime;
        const message = "Успешно удалён из списка запланированных аниме";
        return Reply.accepted(res, { data, message });
    };
    delete_abandoned = async (req: RTDO.delete_abandoned, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_abandoned_anime } = await service.delete_abandoned(auth.profile.id, dto);
        const data: MarkedAnimeCollection_ResponseTypes.delete_abandoned = deleted_abandoned_anime;
        const message = "Успешно удалён из списка заброшенных аниме";
        return Reply.accepted(res, { data, message });
    };
    delete_watching = async (req: RTDO.delete_watching, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_watching_anime } = await service.delete_watching(auth.profile.id, dto);
        const data: MarkedAnimeCollection_ResponseTypes.delete_watching = deleted_watching_anime;
        const message = "Успешно удалён из списка текущих аниме";
        return Reply.accepted(res, { data, message });
    };
})();

