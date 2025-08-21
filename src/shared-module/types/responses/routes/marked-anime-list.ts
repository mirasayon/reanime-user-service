import type { MarkedAnimeCollection } from "#/db/orm/client.js";

/** RESPONSES For Marked anime list Route */
export namespace MarkedAnimeCollection_ResponseTypes {
    export type get_all_list = MarkedAnimeCollection[];
    export type get_for_anime = MarkedAnimeCollection;
    export type get_list_of_completed = MarkedAnimeCollection[];
    export type get_list_of_planned = MarkedAnimeCollection[];
    export type get_list_of_abandoned = MarkedAnimeCollection[];
    export type get_list_of_watching = MarkedAnimeCollection[];
    export type create_watching = MarkedAnimeCollection;
    export type create_planned = MarkedAnimeCollection;
    export type create_abandoned = MarkedAnimeCollection;
    export type create_completed = MarkedAnimeCollection;
    export type delete_abandoned = MarkedAnimeCollection;
    export type delete_watching = MarkedAnimeCollection;
    export type delete_planned = MarkedAnimeCollection;
    export type delete_completed = MarkedAnimeCollection;
}
