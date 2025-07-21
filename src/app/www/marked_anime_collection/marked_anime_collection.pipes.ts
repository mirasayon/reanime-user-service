import type { Request_dto_auth as _ } from "[T]/request_with_dto.js";
import { vmfactory as m } from "#/utils/validators/factory.js";
import {
    animeMarkedCollection_schemas as schema,
    Types,
} from "@xamarin.city/reanime/user-service/validators/marked_anime_collection.js";

namespace rd {
    export type get_all_list = _<Types.Inputs.get_all_list>;
    export type explore_for_anime = _<Types.Inputs.explore_for_anime, { anime_id: string }>;
    export type get_list_of_completed = _<Types.Inputs.get_list_of_completed>;
    export type get_list_of_planned = _<Types.Inputs.get_list_of_planned>;
    export type get_list_of_abandoned = _<Types.Inputs.get_list_of_abandoned>;
    export type get_list_of_watching = _<Types.Inputs.get_list_of_watching>;

    export type create_1_completed = _<Types.Inputs.create_1_completed, { anime_id: string }>;
    export type create_1_planned = _<Types.Inputs.create_1_planned, { anime_id: string }>;
    export type create_1_abandoned = _<Types.Inputs.create_1_abandoned, { anime_id: string }>;
    export type create_1_watching = _<Types.Inputs.create_1_watching, { anime_id: string }>;

    export type delete_completed = _<Types.Inputs.delete_completed, { anime_id: string }>;
    export type delete_planned = _<Types.Inputs.delete_planned, { anime_id: string }>;
    export type delete_abandoned = _<Types.Inputs.delete_abandoned, { anime_id: string }>;
    export type delete_watching = _<Types.Inputs.delete_watching, { anime_id: string }>;
}
export type { rd as MarkedAnimeCollection_ReqDtos };

export const MarkedAnimeCollection_ReqPipes = new (class MarkedAnimeCollection_ReqPipes {
    get_all_list = m<rd.get_all_list>(schema.get_all_list);
    get_for_anime = m<rd.explore_for_anime>(schema.explore_for_anime, async (req) => req.params.anime_id);

    get_list_of_completed = m<rd.get_list_of_completed>(schema.get_list_of_completed);
    get_list_of_planned = m<rd.get_list_of_planned>(schema.get_list_of_planned);
    get_list_of_abandoned = m<rd.get_list_of_abandoned>(schema.get_list_of_abandoned);
    get_list_of_watching = m<rd.get_list_of_watching>(schema.get_list_of_watching);

    create_1_watching = m<rd.create_1_watching>(schema.create_1_watching, async (req) => req.params.anime_id);
    create_1_abandoned = m<rd.create_1_abandoned>(schema.create_1_abandoned, async (req) => req.params.anime_id);
    create_1_planned = m<rd.create_1_planned>(schema.create_1_planned, async (req) => req.params.anime_id);
    create_1_completed = m<rd.create_1_completed>(schema.create_1_completed, async (req) => req.params.anime_id);

    delete_completed = m<rd.delete_completed>(schema.delete_completed, async (req) => req.params.anime_id);
    delete_planned = m<rd.delete_planned>(schema.delete_planned, async (req) => req.params.anime_id);
    delete_abandoned = m<rd.delete_abandoned>(schema.delete_abandoned, async (req) => req.params.anime_id);
    delete_watching = m<rd.delete_watching>(schema.delete_watching, async (req) => req.params.anime_id);
})();
