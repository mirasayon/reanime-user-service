import { zodUtilSchemas } from "#/shared/validators-shared/validator-utils-shared/common-validator-utils.js";
import z, { strictObject } from "zod";

/** Set Avatar */
export const avatar_set_ReqDTO = strictObject({
    profile_id: zodUtilSchemas.cuid("Айди профиля"),
});

/** Update Avatar */
export const avatar_update_ReqDTO = strictObject({
    profile_id: zodUtilSchemas.cuid("Айди профиля"),
});
export type avatar_update_ReqDTOType = {
    profile_id: string;
};
export type avatar_set_ReqDTOType = {
    profile_id: string;
};

export const avatar_delete_ReqDTO = strictObject({
    profile_id: zodUtilSchemas.cuid("Айди профиля"),

    avatar_url_hash: z.string("Путь к аватару"),
});
