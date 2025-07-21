import { ControllerUtils } from "#/utils/controller.js";
import { xResponse } from "@xamarin.city/reanime/user-service/patterns/response/handlers.js";
import { MarkedAnimeCollection_Service as service } from "[www]/marked_anime_collection/marked_anime_collection.service.js";
import type { MarkedAnimeCollection_ReqDtos as RTDO } from "[www]/marked_anime_collection/marked_anime_collection.pipes.js";
import type e from "express";
export const MarkedAnimeCollection_Controller = new (class MarkedAnimeCollection_Controller {
    get_all_list = async (req: RTDO.get_all_list, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_all_list(auth.profile.id);
        const data = collection;
        const message = "Your Whole Anime Marked Collection";
        return xResponse.ok(res, { data, message });
    };

    get_for_anime = async (req: RTDO.get_all_list, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.get_for_anime(auth.profile.id, dto);
        const data = sr;
        const message = "info for one anime";
        return xResponse.ok(res, { data, message });
    };
    get_list_of_completed = async (req: RTDO.get_list_of_completed, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_list_of_completed(auth.profile.id);
        const data = collection;
        const message = "Your Completed Marked Collection";
        return xResponse.ok(res, { data, message });
    };
    get_list_of_planned = async (req: RTDO.get_list_of_planned, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_list_of_planned(auth.profile.id);
        const data = collection;
        const message = "Your planned animes";
        return xResponse.ok(res, { data, message });
    };
    get_list_of_abandoned = async (req: RTDO.get_list_of_abandoned, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_list_of_abandoned(auth.profile.id);
        const data = collection;
        const message = "Your abandoned animes";
        return xResponse.ok(res, { data, message });
    };
    get_list_of_watching = async (req: RTDO.get_list_of_watching, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { collection } = await service.get_list_of_watching(auth.profile.id);
        const data = collection;
        const message = "Your Watching animes";
        return xResponse.ok(res, { data, message });
    };

    /** CREATE   */

    create_1_watching_by_profile_id = async (req: RTDO.create_1_watching, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_watching_anime } = await service.create_1_watching(auth.profile.id, dto);
        const data = created_watching_anime;
        const message = "Succesfully created 'watching' anime";
        return xResponse.accepted(res, { data, message });
    };

    create_1_abandoned_by_profile_id = async (req: RTDO.create_1_abandoned, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_abandoned_anime } = await service.create_1_abandoned(auth.profile.id, dto);
        const data = created_abandoned_anime;
        const message = "Succesfully created 'abandoned' anime";
        return xResponse.accepted(res, { data, message });
    };

    create_1_planned_by_profile_id = async (req: RTDO.create_1_planned, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_planned_to_watch_anime: data } = await service.create_1_planned(auth.profile.id, dto);
        const message = "Succesfully created 'planned' anime";
        return xResponse.accepted(res, { data, message });
    };

    create_1_completed_by_profile_id = async (req: RTDO.create_1_completed, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { created_planned_to_watch_anime } = await service.create_1_planned(auth.profile.id, dto);
        const data = created_planned_to_watch_anime;
        const message = "Succesfully created 'completed' anime";
        return xResponse.accepted(res, { data, message });
    };

    /** DELETE */
    delete_completed = async (req: RTDO.delete_completed, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_completed_anime } = await service.delete_completed(auth.profile.id, dto);
        const data = deleted_completed_anime;
        return xResponse.accepted(res, { data });
    };
    delete_planned = async (req: RTDO.delete_planned, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_plan_to_watch_anime: data } = await service.delete_planned(auth.profile.id, dto);
        return xResponse.accepted(res, { data });
    };
    delete_abandoned = async (req: RTDO.delete_abandoned, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_abandoned_anime } = await service.delete_abandoned(auth.profile.id, dto);
        const data = deleted_abandoned_anime;
        return xResponse.accepted(res, { data });
    };
    delete_watching = async (req: RTDO.delete_watching, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted_watching_anime } = await service.delete_watching(auth.profile.id, dto);
        const data = deleted_watching_anime;
        return xResponse.accepted(res, { data });
    };
})();
