import type { Request_dto_auth as _ } from "#/types/dto-middleware-shape.js";
import { vmFactory as m } from "#/utilities/validator-middleware-factory.js";
import { favoriteAnimes_schemas as schemas, type dto } from "#/shared/validators/favorite-animes.validator.routes.js";
namespace rd {
    export type explore_likes = _<dto.explore_likes>;
    export type explore_dislikes = _<dto.explore_dislikes>;
    export type view_vote_on_anime = _<dto.view_vote_on_anime, { anime_id: string }>;
    export type add_like_to_anime = _<dto.add_like_to_anime, { anime_id: string }>;
    export type delete_like_from_anime = _<dto.delete_like_from_anime, { anime_id: string }>;
    export type add_dislike_to_anime = _<dto.add_dislike_to_anime, { anime_id: string }>;
    export type delete_dislike_from_anime = _<dto.delete_dislike_from_anime, { anime_id: string }>;
}
export type { rd as Favorite_Animes_ReqDto };

export const Favorite_Animes_ReqPipes = new (class Favorite_Animes_ReqPipes {
    explore_likes = m<rd.explore_likes>(schemas.explore_likes);
    explore_dislikes = m<rd.explore_dislikes>(schemas.explore_dislikes);
    view_vote_on_anime = m<rd.view_vote_on_anime>(schemas.view_vote_on_anime, async (req) => req.params.anime_id);
    add_like_to_anime = m<rd.add_like_to_anime>(schemas.add_like_to_anime, async (req) => req.params.anime_id);
    delete_like_from_anime = m<rd.delete_like_from_anime>(schemas.delete_like_from_anime, async (req) => req.params.anime_id);
    add_dislike_to_anime = m<rd.add_dislike_to_anime>(schemas.add_dislike_to_anime, async (req) => req.params.anime_id);
    delete_dislike_from_anime = m<rd.delete_dislike_from_anime>(schemas.delete_dislike_from_anime, async (req) => req.params.anime_id);
})();
