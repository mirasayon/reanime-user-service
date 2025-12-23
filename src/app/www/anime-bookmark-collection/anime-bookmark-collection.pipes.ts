import type { Request_dto_auth as _ } from "#/types/dto-middleware-shape.js";
import { vmFactory as m } from "#/utilities/validator-middleware-factory.js";
import { animeMarkedCollection_schemas as schema, type dto } from "#/shared/validators/marked-anime-collection.validator.routes.js";

namespace rd {
    export type get_all_list = _<dto.get_all_list>;
    export type get_for_anime = _<dto.explore_for_anime, { anime_id: string }>;
    export type get_list_of_completed = _<dto.get_list_of_completed>;
    export type get_list_of_planned = _<dto.get_list_of_planned>;
    export type get_list_of_abandoned = _<dto.get_list_of_abandoned>;
    export type get_list_of_watching = _<dto.get_list_of_watching>;

    export type create_completed = _<dto.create_completed, { anime_id: string }>;
    export type create_planned = _<dto.create_planned, { anime_id: string }>;
    export type create_abandoned = _<dto.create_abandoned, { anime_id: string }>;
    export type create_watching = _<dto.create_watching, { anime_id: string }>;

    export type delete_completed = _<dto.delete_completed, { anime_id: string }>;
    export type delete_planned = _<dto.delete_planned, { anime_id: string }>;
    export type delete_abandoned = _<dto.delete_abandoned, { anime_id: string }>;
    export type delete_watching = _<dto.delete_watching, { anime_id: string }>;
}
export type { rd as MarkedAnimeCollection_ReqDtos };

export const MarkedAnimeCollection_ReqPipes = new (class MarkedAnimeCollection_ReqPipes {
    get_all_list = m<rd.get_all_list>(schema.get_all_list);
    get_for_anime = m<rd.get_for_anime>(schema.explore_for_anime, async (req) => req.params.anime_id);

    get_list_of_completed = m<rd.get_list_of_completed>(schema.get_list_of_completed);
    get_list_of_planned = m<rd.get_list_of_planned>(schema.get_list_of_planned);
    get_list_of_abandoned = m<rd.get_list_of_abandoned>(schema.get_list_of_abandoned);
    get_list_of_watching = m<rd.get_list_of_watching>(schema.get_list_of_watching);

    create_watching = m<rd.create_watching>(schema.create_watching, async (req) => req.params.anime_id);
    create_abandoned = m<rd.create_abandoned>(schema.create_abandoned, async (req) => req.params.anime_id);
    create_planned = m<rd.create_planned>(schema.create_planned, async (req) => req.params.anime_id);
    create_completed = m<rd.create_completed>(schema.create_completed, async (req) => req.params.anime_id);

    delete_completed = m<rd.delete_completed>(schema.delete_completed, async (req) => req.params.anime_id);
    delete_planned = m<rd.delete_planned>(schema.delete_planned, async (req) => req.params.anime_id);
    delete_abandoned = m<rd.delete_abandoned>(schema.delete_abandoned, async (req) => req.params.anime_id);
    delete_watching = m<rd.delete_watching>(schema.delete_watching, async (req) => req.params.anime_id);
})();
