import { BadRequestException, ConflictException, NotFoundException } from "#/errors/client-side-exceptions.js";
import type { DbCuidType } from "#/shared/types/informative-input-types-shared.js";
import type { VoteToAnime } from "[orm]/client.js";
import { FavoriteAnimes_Model as model } from "#/app/vote-to-anime/vote-to-anime.model.js";
import {
    profileHasAlreadyLikeAnimeErrorMessage,
    profile_has_already_disliked_animeErrorMessage,
    voteNotFoundErrorMessage,
    cannot_delete_like_if_there_is_dislikeErrorMessage,
    cannot_delete_dislike_if_there_is_likeErrorMessage,
} from "#/constants/frequent-errors.js";
export const voteToAnimeRouteService = new (class FavoriteAnimes_Services {
    explore_likes = async (profile_id: DbCuidType) => {
        const likes = await model.get_all_likes_by_profile_id(profile_id);
        return { likes };
    };

    explore_dislikes = async (profile_id: DbCuidType) => {
        const dislikes = await model.get_all_dislikes_by_profile_id(profile_id);
        return { dislikes };
    };
    view_vote_on_anime = async (profile_id: DbCuidType, anime_id: number): Promise<VoteToAnime | null> => {
        const vote = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);
        return vote;
    };
    add_like_to_anime = async (profile_id: DbCuidType, anime_id: number): Promise<boolean> => {
        const if_exists = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);

        if (if_exists) {
            if (if_exists.value === 1) {
                throw new BadRequestException([profileHasAlreadyLikeAnimeErrorMessage]);
            }
            const updated_vote = await model.update_vote_by_its_id(if_exists.id, 1);
            return true;
        }
        const created = await model.create_like_by_profile_id(profile_id, anime_id);
        return true;
    };
    add_dislike_to_anime = async (profile_id: DbCuidType, anime_id: number): Promise<boolean> => {
        const if_exists = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);

        if (if_exists) {
            if (if_exists.value === -1) {
                throw new BadRequestException([profile_has_already_disliked_animeErrorMessage]);
            }
            const updated_vote = await model.update_vote_by_its_id(if_exists.id, -1);
            return true;
        }
        const created = await model.create_dislike_by_profile_id(profile_id, anime_id);
        return true;
    };
    delete_like_from_anime = async (profile_id: DbCuidType, anime_id: number) => {
        const if_exists = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);
        if (!if_exists) {
            throw new NotFoundException([voteNotFoundErrorMessage]);
        }
        if (if_exists.value === -1) {
            throw new ConflictException([cannot_delete_like_if_there_is_dislikeErrorMessage]);
        }
        const deleted = await model.delete_like_by_profile_id(if_exists.by_profile_id, if_exists.external_anime_id);
        return !!deleted;
    };

    delete_dislike_from_anime = async (profile_id: DbCuidType, anime_id: number): Promise<boolean> => {
        const if_exists = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);
        if (!if_exists) {
            throw new NotFoundException([voteNotFoundErrorMessage]);
        }
        if (if_exists.value === 1) {
            throw new ConflictException([cannot_delete_dislike_if_there_is_likeErrorMessage]);
        }
        await model.delete_dislike_by_profile_id(if_exists.by_profile_id, if_exists.external_anime_id);
        return true;
    };
})();
