import { animeMarkedCollection_schemas, type MarkedAnimeCollectionReqDtoTypes } from "#/shared/validators-shared/app-validator-for-all.routes.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { vmFactory } from "#/utilities/validator-middleware-factory.js";

export namespace MarkedAnimeCollectionRequestTypes {
    export type get_all_list = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.get_all_list>;
    export type get_for_anime = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.explore_for_anime, { anime_id: string }>;
    export type get_list_of_completed = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.get_list_of_completed>;
    export type get_list_of_planned = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.get_list_of_planned>;
    export type get_list_of_abandoned = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.get_list_of_abandoned>;
    export type get_list_of_watching = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.get_list_of_watching>;

    export type create_completed = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.create_completed, { anime_id: string }>;
    export type create_planned = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.create_planned, { anime_id: string }>;
    export type create_abandoned = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.create_abandoned, { anime_id: string }>;
    export type create_watching = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.create_watching, { anime_id: string }>;

    export type delete_completed = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.delete_completed, { anime_id: string }>;
    export type delete_planned = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.delete_planned, { anime_id: string }>;
    export type delete_abandoned = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.delete_abandoned, { anime_id: string }>;
    export type delete_watching = RequestDtoTypeFactory<MarkedAnimeCollectionReqDtoTypes.delete_watching, { anime_id: string }>;
}

export const MarkedAnimeCollection_ReqPipes = new (class MarkedAnimeCollection_ReqPipes {
    get_all_list = vmFactory<MarkedAnimeCollectionRequestTypes.get_all_list>(animeMarkedCollection_schemas.get_all_list);
    get_for_anime = vmFactory<MarkedAnimeCollectionRequestTypes.get_for_anime>(
        animeMarkedCollection_schemas.explore_for_anime,
        async (req) => req.params.anime_id,
    );

    get_list_of_completed = vmFactory<MarkedAnimeCollectionRequestTypes.get_list_of_completed>(animeMarkedCollection_schemas.get_list_of_completed);
    get_list_of_planned = vmFactory<MarkedAnimeCollectionRequestTypes.get_list_of_planned>(animeMarkedCollection_schemas.get_list_of_planned);
    get_list_of_abandoned = vmFactory<MarkedAnimeCollectionRequestTypes.get_list_of_abandoned>(animeMarkedCollection_schemas.get_list_of_abandoned);
    get_list_of_watching = vmFactory<MarkedAnimeCollectionRequestTypes.get_list_of_watching>(animeMarkedCollection_schemas.get_list_of_watching);

    create_watching = vmFactory<MarkedAnimeCollectionRequestTypes.create_watching>(
        animeMarkedCollection_schemas.create_watching,
        async (req) => req.params.anime_id,
    );
    create_abandoned = vmFactory<MarkedAnimeCollectionRequestTypes.create_abandoned>(
        animeMarkedCollection_schemas.create_abandoned,
        async (req) => req.params.anime_id,
    );
    create_planned = vmFactory<MarkedAnimeCollectionRequestTypes.create_planned>(
        animeMarkedCollection_schemas.create_planned,
        async (req) => req.params.anime_id,
    );
    create_completed = vmFactory<MarkedAnimeCollectionRequestTypes.create_completed>(
        animeMarkedCollection_schemas.create_completed,
        async (req) => req.params.anime_id,
    );

    delete_completed = vmFactory<MarkedAnimeCollectionRequestTypes.delete_completed>(
        animeMarkedCollection_schemas.delete_completed,
        async (req) => req.params.anime_id,
    );
    delete_planned = vmFactory<MarkedAnimeCollectionRequestTypes.delete_planned>(
        animeMarkedCollection_schemas.delete_planned,
        async (req) => req.params.anime_id,
    );
    delete_abandoned = vmFactory<MarkedAnimeCollectionRequestTypes.delete_abandoned>(
        animeMarkedCollection_schemas.delete_abandoned,
        async (req) => req.params.anime_id,
    );
    delete_watching = vmFactory<MarkedAnimeCollectionRequestTypes.delete_watching>(
        animeMarkedCollection_schemas.delete_watching,
        async (req) => req.params.anime_id,
    );
})();
