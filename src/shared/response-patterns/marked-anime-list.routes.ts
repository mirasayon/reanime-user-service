import type { AnimeBookmark } from "../../databases/orm/client.js";
/** Типы ответов для маршрута коллекции аниме */
export namespace ResponseTypesForAnimeBookmark {
    export type get_all_list = AnimeBookmark[];
    export type get_for_anime = AnimeBookmark;
    export type get_list_of_completed = AnimeBookmark[];
    export type get_list_of_planned = AnimeBookmark[];
    export type get_list_of_abandoned = AnimeBookmark[];
    export type get_list_of_watching = AnimeBookmark[];
    export type create_watching = boolean;
    export type create_planned = boolean;
    export type create_abandoned = boolean;
    export type create_completed = boolean;
    export type delete_abandoned = boolean;
    export type delete_watching = boolean;
    export type delete_planned = boolean;
    export type delete_completed = boolean;
}
