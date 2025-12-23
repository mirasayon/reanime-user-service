import type { default as ExpressJS } from "express";
import { goReplyHttp } from "#/handlers/all-http-responder.js";
import type { ResponseTypesForUserProfile } from "#/shared/response-patterns-shared/profile.routes.js";
import { checkRequestForValidity } from "#/utilities/controller-utility-functions.js";
import { type Profile_ReqDtos } from "#/app/profile/profile.pipes.js";
import { profileRouteService } from "#/app/profile/profile.service.js";

class Profile_ControllerClass {
    /** Просмотр других профилей пользователя */
    other_profiles = async (req: Profile_ReqDtos.other_profiles, res: ExpressJS.Response) => {
        const { dto: username } = checkRequestForValidity(req, ["dto"]);
        const sr = await profileRouteService.other_profiles(username);
        const data: ResponseTypesForUserProfile.view_other_profiles = sr;
        const message = "Информация профиля другого пользователя успешно получена";
        return goReplyHttp.ok(res, { data, message });
    };
    /** Обновление никнейма пользователя */
    update_nickname = async (req: Profile_ReqDtos.update_name, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const updated_profile = await profileRouteService.update_nickname({ new_nickname: dto, profile_id: sessionDto.profile_id });
        const data: ResponseTypesForUserProfile.update_nickname = updated_profile;
        const message = "Ник успешно обновлен";
        return goReplyHttp.accepted(res, { data, message });
    };

    update_bio = async (req: Profile_ReqDtos.update_bio, res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await profileRouteService.edit_bio(dto, sessionDto.profile_id);
        const data: ResponseTypesForUserProfile.update_bio = sr;
        const message = "Био успешно обновлена";
        return goReplyHttp.accepted(res, { data, message });
    };
    view_my_profile = async (req: Profile_ReqDtos.my_profile, res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const sr = await profileRouteService.view_my_profile(sessionDto.account_id);
        const data: ResponseTypesForUserProfile.view_my_profile = sr;
        const message = "Информация о текущем профиле пользователя успешно получена";
        return goReplyHttp.ok(res, { data, message });
    };
}
export const Profile_Controller = new Profile_ControllerClass();
