import {
    cannot_delete_dislike_if_there_is_like,
    cannot_delete_like_if_there_is_dislike,
    profile_has_already_disliked_anime,
    profile_has_already_liked_anime,
    vote_not_found,
} from "#/configs/frequent-errors.js";
import { AnimeFavorite } from "#/db/orm/client.js";
import { BadRequestException, ConflictException, NotFoundException } from "@reanime.art/user-service/errors/client-side/exceptions.js";
import type { ObjectCuid } from "@reanime.art/user-service/types/inputs/infotype.js";
import { FavoriteAnimes_Model as model } from "[www]/favorite_animes/favorite_animes.model.js";
export const FavoriteAnimes_Services = new (class FavoriteAnimes_Services {
    explore_likes = async (profile_id: ObjectCuid) => {
        const likes = await model.get_all_likes_by_profile_id(profile_id);
        return { likes };
    };

    explore_dislikes = async (profile_id: ObjectCuid) => {
        const dislikes = await model.get_all_dislikes_by_profile_id(profile_id);
        return { dislikes };
    };
    view_vote_on_anime = async (profile_id: ObjectCuid, anime_id: number) => {
        const vote = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);

        return { vote };
    };
    add_like_to_anime = async (
        profile_id: ObjectCuid,
        anime_id: number,
    ): Promise<{
        vote: AnimeFavorite;
        is_updated: boolean;
    }> => {
        const if_exists = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);

        if (if_exists) {
            if (if_exists.vote === true) {
                throw new BadRequestException([profile_has_already_liked_anime]);
            }
            const updated_vote = await model.update_vote_by_its_id(if_exists.id, !if_exists.vote);
            return { is_updated: true, vote: updated_vote };
        }
        const created = await model.create_like_by_profile_id(profile_id, anime_id);
        return { vote: created, is_updated: false };
    };
    add_dislike_to_anime = async (
        profile_id: ObjectCuid,
        anime_id: number,
    ): Promise<{
        vote: AnimeFavorite;
        is_updated: boolean;
    }> => {
        const if_exists = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);

        if (if_exists) {
            if (if_exists.vote === false) {
                throw new BadRequestException([profile_has_already_disliked_anime]);
            }
            const updated_vote = await model.update_vote_by_its_id(if_exists.id, !if_exists.vote);
            return { is_updated: true, vote: updated_vote };
        }
        const created = await model.create_dislike_by_profile_id(profile_id, anime_id);
        return { vote: created, is_updated: false };
    };
    delete_like_from_anime = async (profile_id: ObjectCuid, anime_id: number) => {
        const if_exists = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);
        if (!if_exists) {
            throw new NotFoundException([vote_not_found]);
        }
        if (if_exists.vote === false) {
            throw new ConflictException([cannot_delete_like_if_there_is_dislike]);
        }
        const deleted = await model.delete_like_by_profile_id(if_exists.profile_id, if_exists.anime_id);
        return { deleted };
    };

    delete_dislike_from_anime = async (profile_id: ObjectCuid, anime_id: number) => {
        const if_exists = await model.get_the_vote_from_anime_id_and_profile_id(profile_id, anime_id);
        if (!if_exists) {
            throw new NotFoundException([vote_not_found]);
        }
        if (if_exists.vote === true) {
            throw new ConflictException([cannot_delete_dislike_if_there_is_like]);
        }
        const deleted = await model.delete_dislike_by_profile_id(if_exists.profile_id, if_exists.anime_id);
        return { deleted };
    };
})();

