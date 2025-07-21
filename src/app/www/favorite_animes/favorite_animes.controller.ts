import { ControllerUtils } from "#/utils/controller.js";
import { FavoriteAnimes_Services as service } from "[www]/favorite_animes/favorite_animes.service.js";
import type { Favorite_Animes_ReqDto } from "[www]/favorite_animes/favorite_animes.pipes.js";
import type e from "express";
import { xResponse } from "@xamarin.city/reanime/user-service/patterns/response/handlers.js";
export const FavoriteAnimes_Controller = new (class FavoriteAnimes_Controller {
    explore_my_likes = async (req: Favorite_Animes_ReqDto.explore_my_likes, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { likes } = await service.explore_my_likes(auth.profile.id);
        const data = likes;
        const message = "Ваши любимые аниме";
        return xResponse.ok(res, { data, message });
    };

    explore_my_dislikes = async (req: Favorite_Animes_ReqDto.explore_my_dislikes, res: e.Response) => {
        const { auth } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { dislikes } = await service.explore_my_dislikes(auth.profile.id);
        const data = dislikes;
        const message = "Ваши нелюбимые аниме";
        return xResponse.ok(res, { data, message });
    };
    view_my_vote_on_anime = async (req: Favorite_Animes_ReqDto.view_my_vote_on_anime, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { vote } = await service.view_my_vote_on_anime(auth.profile.id, dto);
        const data = vote;
        const message = "Ваш лайк/дизлайк на это аниме";
        return xResponse.ok(res, { data, message });
    };
    add_my_like_to_anime = async (req: Favorite_Animes_ReqDto.add_my_like_to_anime, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.add_like_to_anime(auth.profile.id, dto);
        const data = sr;
        const message = "Успешно добавлен лайк к аниме";
        return xResponse.ok(res, { data, message });
    };
    delete_my_like_from_anime = async (req: Favorite_Animes_ReqDto.delete_my_like_from_anime, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted } = await service.delete_my_like_from_anime(auth.profile.id, dto);
        const data = deleted;
        const message = "Успешно удалён лайк с аниме";
        return xResponse.ok(res, { data, message });
    };

    add_dislike_to_anime = async (req: Favorite_Animes_ReqDto.add_my_dislike_to_anime, res: e.Response) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const sr = await service.add_dislike_to_anime(auth.profile.id, dto);
        const data = sr;
        const message = "Успешно добавлен дизлайк к аниме";
        return xResponse.ok(res, { data, message });
    };

    delete_my_dislike_from_anime = async (
        req: Favorite_Animes_ReqDto.delete_my_dislike_from_anime,
        res: e.Response,
    ) => {
        const { auth, dto } = ControllerUtils.check_dto_for_validity(req, ["dto", "auth"]);
        const { deleted } = await service.delete_my_dislike_from_anime(auth.profile.id, dto);
        const data = deleted;
        const message = "Успешно удалён дизлайк с аниме";
        return xResponse.ok(res, { data, message });
    };
})();
