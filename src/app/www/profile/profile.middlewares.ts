import { ControllerUtils } from "#/utils/controller.js";
import { isBefore } from "date-fns/isBefore";
import { subMinutes } from "date-fns/subMinutes";
import type e from "express";
import { Profile_ReqDtos } from "./profile.pipes.js";
import { TooManyRequestsException } from "%/errors/client-side/exceptions.js";
import { REQUESTS_TO_MEDIA_SERVICE_INTERVAL_IN_MINUTES } from "#/configs/rules.js";

export const too_many_request_to_media_service = async (
    req: Profile_ReqDtos.set_avatar | Profile_ReqDtos.update_avatar,
    res: e.Response,
    next: e.NextFunction,
) => {
    const { auth } = ControllerUtils.check_dto_for_validity(req, ["auth"]);
    const update_at: Date = auth.profile.updated_at;
    const now = new Date();
    const fiveMinutesAgo = subMinutes(now, REQUESTS_TO_MEDIA_SERVICE_INTERVAL_IN_MINUTES, {});
    /** Last Action At: */
    const lastProfileUpdate = update_at;
    if (lastProfileUpdate && isBefore(fiveMinutesAgo, lastProfileUpdate)) {
        const minutesLeft = Math.ceil((lastProfileUpdate.getTime() - fiveMinutesAgo.getTime()) / 1000 / 60);
        throw new TooManyRequestsException(
            `Вы можете обновлять свой профиль не чаще, чем раз в ${REQUESTS_TO_MEDIA_SERVICE_INTERVAL_IN_MINUTES} минут. Повторите попытку через ${minutesLeft} минут`,
        );
    }
    return next();
};

