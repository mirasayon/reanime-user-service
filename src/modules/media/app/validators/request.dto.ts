import { z_cuid_schema } from "#/modules/media/utils/zod/utils.js";
import z from "zod";

/** Set Avatar */
export const avatar_set_ReqDTO = z.strictObject({
    profile_id: z_cuid_schema,
});

/** Update Avatar */
export const avatar_update_ReqDTO = z.strictObject({
    profile_id: z_cuid_schema,
});
export type avatar_update_ReqDTOType = {
    profile_id: string;
};
export type avatar_set_ReqDTOType = {
    profile_id: string;
};

export const avatar_delete_ReqDTO = z.strictObject({
    profile_id: z_cuid_schema,
    avatar_url_hash: z.string().length(64),
});
