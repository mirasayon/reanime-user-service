import { z_cuid_schema } from "#/modules/media/utils/zod/utils.js";
import z from "zod";

export const avatar_delete_ReqDTO = z.strictObject({
    profile_id: z_cuid_schema,
    avatar_url_hash: z.string().length(64),
});
