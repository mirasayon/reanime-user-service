import type { Request_dto_auth as _ } from "[T]/request_with_dto.js";
import { vmfactory as m } from "#/utils/validators/factory.js";
import {
    favoriteAnimes_schemas as schemas,
    Types,
} from "@xamarin.city/reanime/user-service/validators/favorite_animes.js";
namespace rd {
    export type explore_my_likes = _<Types.Inputs.explore_my_likes>;
    export type explore_my_dislikes = _<Types.Inputs.explore_my_dislikes>;
    export type view_my_vote_on_anime = _<Types.Inputs.view_my_vote_on_anime, { anime_id: string }>;
    export type add_my_like_to_anime = _<Types.Inputs.add_my_like_to_anime, { anime_id: string }>;
    export type delete_my_like_from_anime = _<Types.Inputs.delete_my_like_from_anime, { anime_id: string }>;
    export type add_my_dislike_to_anime = _<Types.Inputs.add_my_dislike_to_anime, { anime_id: string }>;
    export type delete_my_dislike_from_anime = _<Types.Inputs.delete_my_dislike_from_anime, { anime_id: string }>;
}
export type { rd as Favorite_Animes_ReqDto };

export const Favorite_Animes_ReqPipes = new (class Favorite_Animes_ReqPipes {
    explore_my_likes = m<rd.explore_my_likes>(schemas.explore_my_likes);
    explore_my_dislikes = m<rd.explore_my_dislikes>(schemas.explore_my_dislikes);
    view_my_vote_on_anime = m<rd.view_my_vote_on_anime>(
        schemas.view_my_vote_on_anime,
        async (req) => req.params.anime_id,
    );
    add_my_like_to_anime = m<rd.add_my_like_to_anime>(schemas.add_my_like_to_anime, async (req) => req.params.anime_id);
    delete_my_like_from_anime = m<rd.delete_my_like_from_anime>(
        schemas.delete_my_like_from_anime,
        async (req) => req.params.anime_id,
    );
    add_my_dislike_to_anime = m<rd.add_my_dislike_to_anime>(
        schemas.add_my_dislike_to_anime,
        async (req) => req.params.anime_id,
    );
    delete_my_dislike_from_anime = m<rd.delete_my_dislike_from_anime>(
        schemas.delete_my_dislike_from_anime,
        async (req) => req.params.anime_id,
    );
})();
