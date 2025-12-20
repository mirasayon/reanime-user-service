import type { AnimeBookmark } from "../../databases/orm/client.js";

/** RESPONSES For Marked anime list Route */
export namespace ResponseTypesForAnimeBookmark {
    export type get_all_list = AnimeBookmark[];
    export type get_for_anime = AnimeBookmark;
    export type get_list_of_completed = AnimeBookmark[];
    export type get_list_of_planned = AnimeBookmark[];
    export type get_list_of_abandoned = AnimeBookmark[];
    export type get_list_of_watching = AnimeBookmark[];
    /** true if anime was added to collection as watching, false if not */
    export type create_watching = boolean;
    /** true if anime was added to collection as planned, false if not */
    export type create_planned = boolean;
    /** true if anime was added to collection as abandoned, false if not */
    export type create_abandoned = boolean;

    /** true if anime was deleted from collection as completed, false if not */
    export type create_completed = boolean;
    /** true if anime was deleted from collection as abandoned, false if not */
    export type delete_abandoned = boolean;
    /** true if anime was deleted from collection as watching, false if not */
    export type delete_watching = boolean;
    /** true if anime was deleted from collection as planned, false if not */
    export type delete_planned = boolean;
    /** true if anime was deleted from collection as completed, false if not */
    export type delete_completed = boolean;
}
