import { UtilitySchemas } from "#/shared/validators/utils/common.js";
import z from "zod";

/** Set Avatar */
export const avatar_set_ReqDTO = z.strictObject({
    profile_id: UtilitySchemas.cuid("Айди профиля"),
});

/** Update Avatar */
export const avatar_update_ReqDTO = z.strictObject({
    profile_id: UtilitySchemas.cuid("Айди профиля"),
});
export type avatar_update_ReqDTOType = {
    profile_id: string;
};
export type avatar_set_ReqDTOType = {
    profile_id: string;
};

export const avatar_delete_ReqDTO = z.strictObject({
    profile_id: UtilitySchemas.cuid("Айди профиля"),
    avatar_url_hash: z.string().length(64),
});
