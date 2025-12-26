import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import { z } from "zod";
export const animeMarkedCollection_schemas = {
    get_all_list: zodUtilSchemas.void,
    explore_for_anime: zodUtilSchemas.anime_id,
    get_list_of_completed: zodUtilSchemas.void,
    get_list_of_planned: zodUtilSchemas.void,
    get_list_of_abandoned: zodUtilSchemas.void,
    get_list_of_watching: zodUtilSchemas.void,

    create_completed: zodUtilSchemas.anime_id,
    create_planned: zodUtilSchemas.anime_id,
    create_abandoned: zodUtilSchemas.anime_id,
    create_watching: zodUtilSchemas.anime_id,

    delete_completed: zodUtilSchemas.anime_id,
    delete_planned: zodUtilSchemas.anime_id,
    delete_abandoned: zodUtilSchemas.anime_id,
    delete_watching: zodUtilSchemas.anime_id,
};

/** Request Validator DTO Types */
export namespace dto {
    export type get_all_list = z.infer<(typeof animeMarkedCollection_schemas)["get_all_list"]>;
    export type explore_for_anime = z.infer<(typeof animeMarkedCollection_schemas)["explore_for_anime"]>;
    export type get_list_of_completed = z.infer<(typeof animeMarkedCollection_schemas)["get_list_of_completed"]>;
    export type get_list_of_planned = z.infer<(typeof animeMarkedCollection_schemas)["get_list_of_planned"]>;
    export type get_list_of_abandoned = z.infer<(typeof animeMarkedCollection_schemas)["get_list_of_abandoned"]>;
    export type get_list_of_watching = z.infer<(typeof animeMarkedCollection_schemas)["get_list_of_watching"]>;
    export type create_completed = z.infer<(typeof animeMarkedCollection_schemas)["create_completed"]>;
    export type create_planned = z.infer<(typeof animeMarkedCollection_schemas)["create_planned"]>;
    export type create_abandoned = z.infer<(typeof animeMarkedCollection_schemas)["create_abandoned"]>;
    export type create_watching = z.infer<(typeof animeMarkedCollection_schemas)["create_watching"]>;
    export type delete_completed = z.infer<(typeof animeMarkedCollection_schemas)["delete_completed"]>;
    export type delete_planned = z.infer<(typeof animeMarkedCollection_schemas)["delete_planned"]>;
    export type delete_abandoned = z.infer<(typeof animeMarkedCollection_schemas)["delete_abandoned"]>;
    export type delete_watching = z.infer<(typeof animeMarkedCollection_schemas)["delete_watching"]>;
}
