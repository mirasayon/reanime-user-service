import {
    cannot_delete_dislike_if_there_is_like,
    cannot_delete_like_if_there_is_dislike,
    profile_has_already_disliked_anime,
    profile_has_already_liked_anime,
    vote_not_found,
} from "#/configs/frequent-errors.js";
import { BadRequestException, ConflictException, NotFoundException } from "#/errors/client-side-exceptions.js";
import type { iObjectCuid } from "#/shared/types/inputs/informative.types.js";
import type { VoteToAnime } from "[orm]";
import { FavoriteAnimes_Model as model } from "[www]/vote-to-anime/vote-to-anime.model.js";
export const FavoriteAnimes_Services = new (class FavoriteAnimes_Services {
    explore_likes = async (profile_id: iObjectCuid) => {
        const likes = await model.get_all_likes_by_profile_id(profile_id);
        return { likes };
    };

    explore_dislikes = async (profile_id: iObjectCuid) => {
        const dislikes = await model.get_all_dislikes_by_profile_id(profile_id);
        return { dislikes };
    };
    view_vote_on_anime = async (profile_id: iObjectCuid, anime_id: number): Promise<VoteToAnime | null> => {
        const vote = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);
        return vote;
    };
    add_like_to_anime = async (profile_id: iObjectCuid, anime_id: number): Promise<boolean> => {
        const if_exists = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);

        if (if_exists) {
            if (if_exists.value === 1) {
                throw new BadRequestException([profile_has_already_liked_anime]);
            }
            const updated_vote = await model.update_vote_by_its_id(if_exists.id, 1);
            return true;
        }
        const created = await model.create_like_by_profile_id(profile_id, anime_id);
        return true;
    };
    add_dislike_to_anime = async (profile_id: iObjectCuid, anime_id: number): Promise<boolean> => {
        const if_exists = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);

        if (if_exists) {
            if (if_exists.value === -1) {
                throw new BadRequestException([profile_has_already_disliked_anime]);
            }
            const updated_vote = await model.update_vote_by_its_id(if_exists.id, -1);
            return true;
        }
        const created = await model.create_dislike_by_profile_id(profile_id, anime_id);
        return true;
    };
    delete_like_from_anime = async (profile_id: iObjectCuid, anime_id: number) => {
        const if_exists = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);
        if (!if_exists) {
            throw new NotFoundException([vote_not_found]);
        }
        if (if_exists.value === -1) {
            throw new ConflictException([cannot_delete_like_if_there_is_dislike]);
        }
        const deleted = await model.delete_like_by_profile_id(if_exists.by_profile_id, if_exists.external_anime_id);
        return !!deleted;
    };

    delete_dislike_from_anime = async (profile_id: iObjectCuid, anime_id: number): Promise<boolean> => {
        const if_exists = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);
        if (!if_exists) {
            throw new NotFoundException([vote_not_found]);
        }
        if (if_exists.value === 1) {
            throw new ConflictException([cannot_delete_dislike_if_there_is_like]);
        }
        await model.delete_dislike_by_profile_id(if_exists.by_profile_id, if_exists.external_anime_id);
        return true;
    };
})();
