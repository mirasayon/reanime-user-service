import { AnimeStatusEnum } from "#src/databases/orm/enums.ts";
import { ConflictException, NotFoundException } from "#src/errors/client-side-exceptions.ts";
import { animeBookmarkSectionModel } from "#src/app/anime-bookmark-collection/anime-bookmark-collection.model.ts";
import consola from "consola";

class AnimeBookmarkSectionService {
    private isAnimeInCollection = async (profile_id: string, anime_id: number) => {
        const is_anime_in_collection = await animeBookmarkSectionModel.is_anime_in_collection(profile_id, anime_id);
        if (is_anime_in_collection) {
            throw new ConflictException(["Аниме уже в коллекции"]);
        }
    };

    get_all_list = async (profile_id: string) => {
        const collection = await animeBookmarkSectionModel.get_all_list_by_profile_id(profile_id);
        return { collection };
    };

    get_for_anime = async (profile_id: string, anime_id: number) => {
        const info = await animeBookmarkSectionModel.get_for_anime(profile_id, anime_id);
        return info;
    };
    get_list_of_completed = async (profile_id: string) => {
        const collection = await animeBookmarkSectionModel.get_list_of_completed(profile_id);
        return { collection };
    };
    get_list_of_planned = async (profile_id: string) => {
        const collection = await animeBookmarkSectionModel.get_list_of_planned(profile_id);
        return { collection };
    };
    get_list_of_abandoned = async (profile_id: string) => {
        const collection = await animeBookmarkSectionModel.get_list_of_abandoned(profile_id);
        return { collection };
    };
    get_list_of_watching = async (profile_id: string) => {
        const collection = await animeBookmarkSectionModel.get_list_of_watching(profile_id);
        return collection;
    };

    create_completed = async (profile_id: string, anime_id: number): Promise<boolean> => {
        await this.isAnimeInCollection(profile_id, anime_id);
        const created_completed_anime = await animeBookmarkSectionModel.create_1_completed_by_profile_id(profile_id, anime_id);
        return !!created_completed_anime;
    };
    create_planned = async (profile_id: string, anime_id: number): Promise<boolean> => {
        await this.isAnimeInCollection(profile_id, anime_id);
        const created_planned_to_watch_anime = await animeBookmarkSectionModel.create_1_plan_to_watch_by_profile_id(profile_id, anime_id);
        return !!created_planned_to_watch_anime;
    };
    create_abandoned = async (profile_id: string, anime_id: number): Promise<boolean> => {
        await this.isAnimeInCollection(profile_id, anime_id);
        const created_abandoned_anime = await animeBookmarkSectionModel.create_1_abandoned_by_profile_id(profile_id, anime_id);
        return !!created_abandoned_anime;
    };
    create_watching = async (profile_id: string, anime_id: number): Promise<boolean> => {
        await this.isAnimeInCollection(profile_id, anime_id);
        const created_watching_anime = await animeBookmarkSectionModel.create_1_watching_by_profile_id(profile_id, anime_id);
        return !!created_watching_anime;
    };

    delete_completed = async (profile_id: string, anime_id: number): Promise<boolean> => {
        const existed = await this.checkExactForDeleting(profile_id, anime_id, AnimeStatusEnum.COMPLETED);
        const deleted_completed_anime = await animeBookmarkSectionModel.delete_completed_by_profile_id(profile_id, anime_id, existed.id);
        return !!deleted_completed_anime;
    };
    delete_planned = async (profile_id: string, anime_id: number): Promise<boolean> => {
        const existed = await this.checkExactForDeleting(profile_id, anime_id, AnimeStatusEnum.PLANNED);
        const deleted_plan_to_watch_anime = await animeBookmarkSectionModel.delete_plan_to_watch_by_profile_id(profile_id, anime_id, existed.id);
        return !!deleted_plan_to_watch_anime;
    };
    private checkExactForDeleting = async (profile_id: string, anime_id: number, status: AnimeStatusEnum) => {
        const found_anime = await animeBookmarkSectionModel.is_anime_in_collection(profile_id, anime_id);
        if (!found_anime) {
            throw new NotFoundException(["Аниме нет в коллекции"]);
        }
        if (found_anime.status !== status) {
            throw new NotFoundException([`Аниме с таким статусом ${status.toLowerCase()} не найдено`]);
        }
        return found_anime;
    };
    delete_abandoned = async (profile_id: string, anime_id: number): Promise<boolean> => {
        const existed = await this.checkExactForDeleting(profile_id, anime_id, AnimeStatusEnum.ABANDONED);
        consola.info({ existed });
        const deleted_abandoned_anime = await animeBookmarkSectionModel.delete_abandoned_by_profile_id(profile_id, anime_id, existed.id);
        return !!deleted_abandoned_anime;
    };
    delete_watching = async (profile_id: string, anime_id: number): Promise<boolean> => {
        const existed = await this.checkExactForDeleting(profile_id, anime_id, AnimeStatusEnum.WATCHING);
        const deleted_watching_anime = await animeBookmarkSectionModel.delete_watching_by_profile_id(profile_id, anime_id, existed.id);
        return !!deleted_watching_anime;
    };
}
export const animeBookmarkSectionService = new AnimeBookmarkSectionService();
