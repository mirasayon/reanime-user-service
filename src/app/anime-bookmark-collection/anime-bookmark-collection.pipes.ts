import { animeMarkedCollection_schemas, type MarkedAnimeCollectionReqDtoTypes } from "#/shared/request-validator-for-all.routes.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { validatorMiddlewareFactory } from "#/utilities/validator-middleware-factory.js";

export namespace AnimeBookmarkSectionRequestTypes {
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

export const animeBookmarkSectionReqPipes = new (class MarkedAnimeCollection_ReqPipes {
    get_all_list = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.get_all_list>(animeMarkedCollection_schemas.get_all_list);
    get_for_anime = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.get_for_anime>(
        animeMarkedCollection_schemas.explore_for_anime,
        (req) => req.params.anime_id,
    );

    get_list_of_completed = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.get_list_of_completed>(
        animeMarkedCollection_schemas.get_list_of_completed,
    );
    get_list_of_planned = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.get_list_of_planned>(
        animeMarkedCollection_schemas.get_list_of_planned,
    );
    get_list_of_abandoned = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.get_list_of_abandoned>(
        animeMarkedCollection_schemas.get_list_of_abandoned,
    );
    get_list_of_watching = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.get_list_of_watching>(
        animeMarkedCollection_schemas.get_list_of_watching,
    );

    create_watching = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.create_watching>(
        animeMarkedCollection_schemas.create_watching,
        (req) => req.params.anime_id,
    );
    create_abandoned = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.create_abandoned>(
        animeMarkedCollection_schemas.create_abandoned,
        (req) => req.params.anime_id,
    );
    create_planned = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.create_planned>(
        animeMarkedCollection_schemas.create_planned,
        (req) => req.params.anime_id,
    );
    create_completed = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.create_completed>(
        animeMarkedCollection_schemas.create_completed,
        (req) => req.params.anime_id,
    );

    delete_completed = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.delete_completed>(
        animeMarkedCollection_schemas.delete_completed,
        (req) => req.params.anime_id,
    );
    delete_planned = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.delete_planned>(
        animeMarkedCollection_schemas.delete_planned,
        (req) => req.params.anime_id,
    );
    delete_abandoned = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.delete_abandoned>(
        animeMarkedCollection_schemas.delete_abandoned,
        (req) => req.params.anime_id,
    );
    delete_watching = validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes.delete_watching>(
        animeMarkedCollection_schemas.delete_watching,
        (req) => req.params.anime_id,
    );
})();
