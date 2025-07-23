import { AnimeStatus } from "#/db/orm/enums.js";
import type { infotype } from "#/types/informative.js";
import { ConflictException, NotFoundException } from "reanime/user-service/errors/client-side/exceptions.js";
import { MarkedAnimeCollection_Model as model } from "[www]/marked_anime_collection/marked_anime_collection.model.js";
import consola from "consola";

export const MarkedAnimeCollection_Service = new (class MarkedAnimeCollection_Service {
    private readonly _is_anime_in_collection = async (profile_id: infotype.Cuid, anime_id: number) => {
        const is_anime_in_collection = await model.is_anime_in_collection(profile_id, anime_id);
        if (is_anime_in_collection) {
            throw new ConflictException(["Anime is already in collection"]);
        }
    };

    get_all_list = async (profile_id: infotype.Cuid) => {
        const collection = await model.get_all_list_by_profile_id(profile_id);
        return { collection };
    };

    get_for_anime = async (profile_id: infotype.Cuid, anime_id: number) => {
        const info = await model.get_for_anime(profile_id, anime_id);
        return info;
    };
    get_list_of_completed = async (profile_id: infotype.Cuid) => {
        const collection = await model.get_list_of_completed(profile_id);
        return { collection };
    };
    get_list_of_planned = async (profile_id: infotype.Cuid) => {
        const collection = await model.get_list_of_planned(profile_id);
        return { collection };
    };
    get_list_of_abandoned = async (profile_id: infotype.Cuid) => {
        const collection = await model.get_list_of_abandoned(profile_id);
        return { collection };
    };
    get_list_of_watching = async (profile_id: infotype.Cuid) => {
        const collection = await model.get_list_of_watching(profile_id);
        return { collection };
    };

    create_completed = async (profile_id: infotype.Cuid, anime_id: number) => {
        await this._is_anime_in_collection(profile_id, anime_id);
        const created_comeleted_anime = await model.create_1_completed_by_profile_id(profile_id, anime_id);
        return { created_comeleted_anime };
    };
    create_planned = async (profile_id: infotype.Cuid, anime_id: number) => {
        await this._is_anime_in_collection(profile_id, anime_id);
        const created_planned_to_watch_anime = await model.create_1_plan_to_watch_by_profile_id(profile_id, anime_id);
        return { created_planned_to_watch_anime };
    };
    create_abandoned = async (profile_id: infotype.Cuid, anime_id: number) => {
        await this._is_anime_in_collection(profile_id, anime_id);
        const created_abandoned_anime = await model.create_1_abandoned_by_profile_id(profile_id, anime_id);
        return { created_abandoned_anime };
    };
    create_watching = async (profile_id: infotype.Cuid, anime_id: number) => {
        await this._is_anime_in_collection(profile_id, anime_id);
        const created_watching_anime = await model.create_1_watching_by_profile_id(profile_id, anime_id);
        return { created_watching_anime };
    };

    delete_completed = async (profile_id: infotype.Cuid, anime_id: number) => {
        const existed = await this.__check_exact_for_deleting(profile_id, anime_id, AnimeStatus.COMPLETED);
        const deleted_completed_anime = await model.delete_completed_by_profile_id(profile_id, anime_id, existed.id);
        return { deleted_completed_anime };
    };
    delete_planned = async (profile_id: infotype.Cuid, anime_id: number) => {
        const existed = await this.__check_exact_for_deleting(profile_id, anime_id, AnimeStatus.PLANNED);
        const deleted_plan_to_watch_anime = await model.delete_plan_to_watch_by_profile_id(profile_id, anime_id, existed.id);
        return { deleted_plan_to_watch_anime };
    };
    private readonly __check_exact_for_deleting = async (profile_id: string, anime_id: number, status: AnimeStatus) => {
        const found_anime = await model.is_anime_in_collection(profile_id, anime_id);
        if (!found_anime) {
            throw new NotFoundException(["Anime is not in the collection"]);
        }
        if (found_anime.status !== status) {
            throw new NotFoundException([`${status.toLowerCase()} anime not found`]);
        }
        return found_anime;
    };
    delete_abandoned = async (profile_id: infotype.Cuid, anime_id: number) => {
        const existed = await this.__check_exact_for_deleting(profile_id, anime_id, AnimeStatus.ABANDONED);
        consola.info({ existed });
        const deleted_abandoned_anime = await model.delete_abandoned_by_profile_id(profile_id, anime_id, existed.id);
        return { deleted_abandoned_anime };
    };
    delete_watching = async (profile_id: infotype.Cuid, anime_id: number) => {
        const existed = await this.__check_exact_for_deleting(profile_id, anime_id, AnimeStatus.WATCHING);
        const deleted_watching_anime = await model.delete_watching_by_profile_id(profile_id, anime_id, existed.id);
        return { deleted_watching_anime };
    };
})();

