import {
    animeMarkedCollection_schemas,
    type MarkedAnimeCollectionSectionValidationSchemaType,
} from "#src/shared/request-validator-for-all.routes.ts";
import type { RequestDtoTypeFactory } from "#src/types/dto-middleware-shape.ts";
import { validatorMiddlewareFactory } from "#src/utilities/validator-middleware-factory.ts";

export interface AnimeBookmarkSectionRequestTypes {
    get_all_list: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["get_all_list"]>;
    get_for_anime: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["explore_for_anime"], { anime_id: string }>;
    get_list_of_completed: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["get_list_of_completed"]>;
    get_list_of_planned: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["get_list_of_planned"]>;
    get_list_of_abandoned: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["get_list_of_abandoned"]>;
    get_list_of_watching: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["get_list_of_watching"]>;

    create_completed: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["create_completed"], { anime_id: string }>;
    create_planned: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["create_planned"], { anime_id: string }>;
    create_abandoned: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["create_abandoned"], { anime_id: string }>;
    create_watching: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["create_watching"], { anime_id: string }>;

    delete_completed: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["delete_completed"], { anime_id: string }>;
    delete_planned: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["delete_planned"], { anime_id: string }>;
    delete_abandoned: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["delete_abandoned"], { anime_id: string }>;
    delete_watching: RequestDtoTypeFactory<MarkedAnimeCollectionSectionValidationSchemaType["delete_watching"], { anime_id: string }>;
}
export const animeBookmarkSectionReqPipes = {
    get_all_list: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["get_all_list"]>(animeMarkedCollection_schemas.get_all_list),
    get_for_anime: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["get_for_anime"]>(
        animeMarkedCollection_schemas.explore_for_anime,
        (req) => req.params.anime_id,
    ),

    get_list_of_completed: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["get_list_of_completed"]>(
        animeMarkedCollection_schemas.get_list_of_completed,
    ),
    get_list_of_planned: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["get_list_of_planned"]>(
        animeMarkedCollection_schemas.get_list_of_planned,
    ),
    get_list_of_abandoned: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["get_list_of_abandoned"]>(
        animeMarkedCollection_schemas.get_list_of_abandoned,
    ),
    get_list_of_watching: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["get_list_of_watching"]>(
        animeMarkedCollection_schemas.get_list_of_watching,
    ),

    create_watching: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["create_watching"]>(
        animeMarkedCollection_schemas.create_watching,
        (req) => req.params.anime_id,
    ),
    create_abandoned: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["create_abandoned"]>(
        animeMarkedCollection_schemas.create_abandoned,
        (req) => req.params.anime_id,
    ),
    create_planned: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["create_planned"]>(
        animeMarkedCollection_schemas.create_planned,
        (req) => req.params.anime_id,
    ),
    create_completed: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["create_completed"]>(
        animeMarkedCollection_schemas.create_completed,
        (req) => req.params.anime_id,
    ),

    delete_completed: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["delete_completed"]>(
        animeMarkedCollection_schemas.delete_completed,
        (req) => req.params.anime_id,
    ),
    delete_planned: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["delete_planned"]>(
        animeMarkedCollection_schemas.delete_planned,
        (req) => req.params.anime_id,
    ),
    delete_abandoned: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["delete_abandoned"]>(
        animeMarkedCollection_schemas.delete_abandoned,
        (req) => req.params.anime_id,
    ),
    delete_watching: validatorMiddlewareFactory<AnimeBookmarkSectionRequestTypes["delete_watching"]>(
        animeMarkedCollection_schemas.delete_watching,
        (req) => req.params.anime_id,
    ),
};
