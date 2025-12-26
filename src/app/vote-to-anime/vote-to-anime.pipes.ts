import { favoriteAnimes_schemas, type FavoriteAnimeReqDtoTypes } from "#/shared/validators-shared/app-validator-for-all.routes.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { vmFactory } from "#/utilities/validator-middleware-factory.js";
export namespace FavoriteAnimesSectionRequestTypes {
    export type explore_likes = RequestDtoTypeFactory<FavoriteAnimeReqDtoTypes.explore_likes>;
    export type explore_dislikes = RequestDtoTypeFactory<FavoriteAnimeReqDtoTypes.explore_dislikes>;
    export type view_vote_on_anime = RequestDtoTypeFactory<FavoriteAnimeReqDtoTypes.view_vote_on_anime, { anime_id: string }>;
    export type add_like_to_anime = RequestDtoTypeFactory<FavoriteAnimeReqDtoTypes.add_like_to_anime, { anime_id: string }>;
    export type delete_like_from_anime = RequestDtoTypeFactory<FavoriteAnimeReqDtoTypes.delete_like_from_anime, { anime_id: string }>;
    export type add_dislike_to_anime = RequestDtoTypeFactory<FavoriteAnimeReqDtoTypes.add_dislike_to_anime, { anime_id: string }>;
    export type delete_dislike_from_anime = RequestDtoTypeFactory<FavoriteAnimeReqDtoTypes.delete_dislike_from_anime, { anime_id: string }>;
}

export const Favorite_Animes_ReqPipes = new (class Favorite_Animes_ReqPipes {
    explore_likes = vmFactory<FavoriteAnimesSectionRequestTypes.explore_likes>(favoriteAnimes_schemas.explore_likes);
    explore_dislikes = vmFactory<FavoriteAnimesSectionRequestTypes.explore_dislikes>(favoriteAnimes_schemas.explore_dislikes);
    view_vote_on_anime = vmFactory<FavoriteAnimesSectionRequestTypes.view_vote_on_anime>(
        favoriteAnimes_schemas.view_vote_on_anime,
        async (req) => req.params.anime_id,
    );
    add_like_to_anime = vmFactory<FavoriteAnimesSectionRequestTypes.add_like_to_anime>(
        favoriteAnimes_schemas.add_like_to_anime,
        async (req) => req.params.anime_id,
    );
    delete_like_from_anime = vmFactory<FavoriteAnimesSectionRequestTypes.delete_like_from_anime>(
        favoriteAnimes_schemas.delete_like_from_anime,
        async (req) => req.params.anime_id,
    );
    add_dislike_to_anime = vmFactory<FavoriteAnimesSectionRequestTypes.add_dislike_to_anime>(
        favoriteAnimes_schemas.add_dislike_to_anime,
        async (req) => req.params.anime_id,
    );
    delete_dislike_from_anime = vmFactory<FavoriteAnimesSectionRequestTypes.delete_dislike_from_anime>(
        favoriteAnimes_schemas.delete_dislike_from_anime,
        async (req) => req.params.anime_id,
    );
})();
