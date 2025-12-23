import { goReplyHttp } from "#/handlers/final-responder/all-http-responder.js";
import type { ResponseTypesForVoteToAnime } from "#/shared/response-patterns/favorite-animes.routes.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import type { Favorite_Animes_ReqDto } from "[www]/vote-to-anime/vote-to-anime.pipes.js";
import { voteToAnimeRouteService } from "[www]/vote-to-anime/vote-to-anime.service.js";
import type { default as ExpressJS } from "express";
class VoteToAnimeRouteControllerClass {
    explore_likes = async (req: Favorite_Animes_ReqDto.explore_likes, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const { likes } = await voteToAnimeRouteService.explore_likes(sessionDto.profile_id);
        const data: ResponseTypesForVoteToAnime.explore_likes = likes;
        const message = "Ваши любимые аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    explore_dislikes = async (req: Favorite_Animes_ReqDto.explore_dislikes, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const { dislikes } = await voteToAnimeRouteService.explore_dislikes(sessionDto.profile_id);
        const data: ResponseTypesForVoteToAnime.explore_dislikes = dislikes;
        const message = "Ваши нелюбимые аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    view_vote_on_anime = async (req: Favorite_Animes_ReqDto.view_vote_on_anime, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const vote = await voteToAnimeRouteService.view_vote_on_anime(sessionDto.profile_id, dto);
        const data: ResponseTypesForVoteToAnime.view_vote_on_anime = vote;
        const message = "Ваш лайк/дизлайк на это аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    add_like_to_anime = async (req: Favorite_Animes_ReqDto.add_like_to_anime, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await voteToAnimeRouteService.add_like_to_anime(sessionDto.profile_id, dto);
        const data: ResponseTypesForVoteToAnime.add_like_to_anime = sr;
        const message = "Успешно добавлен лайк к аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    delete_like_from_anime = async (req: Favorite_Animes_ReqDto.delete_like_from_anime, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const deleted = await voteToAnimeRouteService.delete_like_from_anime(sessionDto.profile_id, dto);
        const data: ResponseTypesForVoteToAnime.delete_like_from_anime = deleted;
        const message = "Успешно удалён лайк с аниме";
        return goReplyHttp.ok(res, { data, message });
    };

    add_dislike_to_anime = async (req: Favorite_Animes_ReqDto.add_dislike_to_anime, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await voteToAnimeRouteService.add_dislike_to_anime(sessionDto.profile_id, dto);
        const data: ResponseTypesForVoteToAnime.add_dislike_to_anime = sr;
        const message = "Успешно добавлен дизлайк к аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    delete_dislike_from_anime = async (req: Favorite_Animes_ReqDto.delete_dislike_from_anime, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await voteToAnimeRouteService.delete_dislike_from_anime(sessionDto.profile_id, dto);
        const data: ResponseTypesForVoteToAnime.delete_dislike_from_anime = sr;
        const message = "Успешно удалён дизлайк с аниме";
        return goReplyHttp.ok(res, { data, message });
    };
}
export const voteToAnimeRouteController = new VoteToAnimeRouteControllerClass();
