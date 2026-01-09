import type ExpressJS from "express";
import { goReplyHttp } from "#src/handlers/all-http-responder.ts";
import { checkRequestForValidity } from "#src/utilities/controller-utility-functions.ts";
import { type ProfileSectionRequestTypes } from "#src/app/user-profile/user-profile.pipes.ts";
import { profileRouteService } from "#src/app/user-profile/user-profile.service.ts";
import type { ResponseTypesFor_UserProfile_Section } from "#src/shared/user-service-response-types-for-all.routes.ts";

class ProfileSectionController {
    /** Просмотр других профилей пользователя */
    other_profiles = async (req: ProfileSectionRequestTypes["other_profiles"], res: ExpressJS.Response) => {
        const username = checkRequestForValidity(req, ["dto"]).dto;
        const sr = await profileRouteService.other_profiles(username);
        const data: ResponseTypesFor_UserProfile_Section["view_other_profiles"] = {
            email: sr.account.email ? (sr.account.email_visibility === "SHOW" ? sr.account.email : null) : null,
            username: sr.account.username,
            other_gender: sr.profile.other_gender ? (sr.profile.gender_visibility === "PUBLIC" ? sr.profile.other_gender : null) : null,
            created_at: sr.account.created_at,
            bio: sr.profile.bio ? sr.profile.bio : null,
            nickname: sr.profile.nickname,
            avatar: sr.avatar
                ? {
                      path_dirname: sr.avatar.path_dirname,
                      path_filename: sr.avatar.path_filename,
                  }
                : null,
            gender: sr.profile.gender_visibility === "PUBLIC" ? sr.profile.gender : "UNSPECIFIED",
            date_of_birth: sr.profile.date_of_birth
                ? sr.profile.birthdate_visibility === "FULL"
                    ? sr.profile.date_of_birth
                    : sr.profile.birthdate_visibility === "YEAR_ONLY"
                      ? sr.profile.date_of_birth.getFullYear()
                      : sr.profile.date_of_birth
                : null,
        };
        const message = "Информация профиля другого пользователя успешно получена";
        return goReplyHttp.ok(res, { data, message });
    };
    /** Обновление никнейма пользователя */
    update_nickname = async (req: ProfileSectionRequestTypes["update_name"], res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const updated_profile = await profileRouteService.update_nickname({ new_nickname: dto, profile_id: sessionDto.profile_id });
        const data: ResponseTypesFor_UserProfile_Section["update_nickname"] = updated_profile;
        const message = "Ник успешно обновлен";
        return goReplyHttp.accepted(res, { data, message });
    };

    update_bio = async (req: ProfileSectionRequestTypes["update_bio"], res: ExpressJS.Response) => {
        const { sessionDto, dto } = checkRequestForValidity(req, ["dto", "sessionDto"]);
        const sr = await profileRouteService.edit_bio(dto, sessionDto.profile_id);
        const data: ResponseTypesFor_UserProfile_Section["update_bio"] = sr;
        const message = "Био успешно обновлена";
        return goReplyHttp.accepted(res, { data, message });
    };
    view_my_profile = async (req: ProfileSectionRequestTypes["my_profile"], res: ExpressJS.Response) => {
        const { sessionDto } = checkRequestForValidity(req, ["sessionDto"]);
        const sr = await profileRouteService.view_my_profile(sessionDto.account_id);
        const data: ResponseTypesFor_UserProfile_Section["view_my_profile"] = sr;
        const message = "Информация о текущем профиле пользователя успешно получена";
        return goReplyHttp.ok(res, { data, message });
    };
}
export const profileSectionController = new ProfileSectionController();
