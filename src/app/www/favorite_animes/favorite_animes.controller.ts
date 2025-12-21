import { goReplyHttp } from "#/handlers/final-responder/all-http-responder.js";
import type { ResponseTypesForVoteToAnime } from "#/shared/response-patterns/favorite-animes.routes.js";
import { ControllerUtils } from "#/utilities/controller.js";
import type { Favorite_Animes_ReqDto } from "[www]/favorite_animes/favorite_animes.pipes.js";
import { FavoriteAnimes_Services as service } from "[www]/favorite_animes/favorite_animes.service.js";
import type { default as ExpressJS } from "express";
export const FavoriteAnimes_Controller = new (class FavoriteAnimes_Controller {
    explore_likes = async (req: Favorite_Animes_ReqDto.explore_likes, res: ExpressJS.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { likes } = await service.explore_likes(auth.profile.id);
        const data: ResponseTypesForVoteToAnime.explore_likes = likes;
        const message = "Ваши любимые аниме";
        return goReplyHttp.ok(res, { data, message });
    };

    explore_dislikes = async (req: Favorite_Animes_ReqDto.explore_dislikes, res: ExpressJS.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
        const { dislikes } = await service.explore_dislikes(auth.profile.id);
        const data: ResponseTypesForVoteToAnime.explore_dislikes = dislikes;
        const message = "Ваши нелюбимые аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    view_vote_on_anime = async (req: Favorite_Animes_ReqDto.view_vote_on_anime, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { vote } = await service.view_vote_on_anime(auth.profile.id, dto);
        const data: ResponseTypesForVoteToAnime.view_vote_on_anime = vote;
        const message = "Ваш лайк/дизлайк на это аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    add_like_to_anime = async (req: Favorite_Animes_ReqDto.add_like_to_anime, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.add_like_to_anime(auth.profile.id, dto);
        const data: ResponseTypesForVoteToAnime.add_like_to_anime = sr;
        const message = "Успешно добавлен лайк к аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    delete_like_from_anime = async (req: Favorite_Animes_ReqDto.delete_like_from_anime, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted } = await service.delete_like_from_anime(auth.profile.id, dto);
        const data: ResponseTypesForVoteToAnime.delete_like_from_anime = deleted;
        const message = "Успешно удалён лайк с аниме";
        return goReplyHttp.ok(res, { data, message });
    };

    add_dislike_to_anime = async (req: Favorite_Animes_ReqDto.add_dislike_to_anime, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.add_dislike_to_anime(auth.profile.id, dto);
        const data: ResponseTypesForVoteToAnime.add_dislike_to_anime = sr;
        const message = "Успешно добавлен дизлайк к аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    delete_dislike_from_anime = async (req: Favorite_Animes_ReqDto.delete_dislike_from_anime, res: ExpressJS.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted } = await service.delete_dislike_from_anime(auth.profile.id, dto);
        const data: ResponseTypesForVoteToAnime.delete_dislike_from_anime = deleted;
        const message = "Успешно удалён дизлайк с аниме";
        return goReplyHttp.ok(res, { data, message });
    };
})();
