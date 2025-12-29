import { goReplyHttp } from "#src/handlers/all-http-responder.ts";
import { checkRequestForValidity } from "#src/utilities/controller-utility-functions.ts";
import type { VoteToAnimesSectionRequestTypes } from "#src/app/vote-to-anime/vote-to-anime.pipes.ts";
import { voteToAnimeSectionService } from "#src/app/vote-to-anime/vote-to-anime.service.ts";
import type ExpressJS from "express";
import type { ResponseTypesFor_VoteToAnime_Section } from "#src/shared/user-service-response-types-for-all.routes.ts";
class VoteToAnimeRouteControllerClass {
    explore_likes = async (req: VoteToAnimesSectionRequestTypes["explore_likes"], res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const likes = await voteToAnimeSectionService.explore_likes(sessionDto.profile_id);
        const data: ResponseTypesFor_VoteToAnime_Section["explore_likes"] = likes;
        const message = "Ваши любимые аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    explore_dislikes = async (req: VoteToAnimesSectionRequestTypes["explore_dislikes"], res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const { dislikes } = await voteToAnimeSectionService.explore_dislikes(sessionDto.profile_id);
        const data: ResponseTypesFor_VoteToAnime_Section["explore_dislikes"] = dislikes;
        const message = "Ваши нелюбимые аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    view_vote_on_anime = async (req: VoteToAnimesSectionRequestTypes["view_vote_on_anime"], res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const vote = await voteToAnimeSectionService.view_vote_on_anime(sessionDto.profile_id, dto);
        const data: ResponseTypesFor_VoteToAnime_Section["view_vote_on_anime"] = vote;
        const message = "Ваш лайк/дизлайк на это аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    add_like_to_anime = async (req: VoteToAnimesSectionRequestTypes["add_like_to_anime"], res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await voteToAnimeSectionService.add_like_to_anime(sessionDto.profile_id, dto);
        const data: ResponseTypesFor_VoteToAnime_Section["add_like_to_anime"] = sr;
        const message = "Успешно добавлен лайк к аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    delete_like_from_anime = async (req: VoteToAnimesSectionRequestTypes["delete_like_from_anime"], res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const deleted = await voteToAnimeSectionService.delete_like_from_anime(sessionDto.profile_id, dto);
        const data: ResponseTypesFor_VoteToAnime_Section["delete_like_from_anime"] = deleted;
        const message = "Успешно удалён лайк с аниме";
        return goReplyHttp.ok(res, { data, message });
    };

    add_dislike_to_anime = async (req: VoteToAnimesSectionRequestTypes["add_dislike_to_anime"], res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await voteToAnimeSectionService.add_dislike_to_anime(sessionDto.profile_id, dto);
        const data: ResponseTypesFor_VoteToAnime_Section["add_dislike_to_anime"] = sr;
        const message = "Успешно добавлен дизлайк к аниме";
        return goReplyHttp.ok(res, { data, message });
    };
    delete_dislike_from_anime = async (req: VoteToAnimesSectionRequestTypes["delete_dislike_from_anime"], res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await voteToAnimeSectionService.delete_dislike_from_anime(sessionDto.profile_id, dto);
        const data: ResponseTypesFor_VoteToAnime_Section["delete_dislike_from_anime"] = sr;
        const message = "Успешно удалён дизлайк с аниме";
        return goReplyHttp.ok(res, { data, message });
    };
}
export const voteToAnimeRouteController = new VoteToAnimeRouteControllerClass();
