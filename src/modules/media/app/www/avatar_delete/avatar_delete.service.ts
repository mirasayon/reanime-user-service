import { create_avatar_hash_from_profile_id } from "../../../utils/crypto/hmac.js";
import { join } from "node:path";
import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";
import { ForbiddenException, NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import { PathsConfig } from "#/configs/paths.config.js";
type Avatar_Delete_Service_Parameters = {
    /** For example: cmapdavvp0001sa7wrq4bdrzc */
    profile_id: string;
    /** For example: 3c41283948cd66a9fd20541161811b044d762141add6d0158fecb015509d5c1b */
    avatar_url_hash: string;
};

export const avatar_Delete_Service = class Avatar_Delete_Service {
    /** Deletes Avatar File */
    avatar_delete = async ({ profile_id, avatar_url_hash }: Avatar_Delete_Service_Parameters) => {
        const actual_avatar_hash = create_avatar_hash_from_profile_id(profile_id);
        if (actual_avatar_hash !== avatar_url_hash) {
            throw new ForbiddenException(["The provided avatar's Hash does not match"]);
        }
        const prod_path = join(PathsConfig.storage, "avatars", "base", `${avatar_url_hash}.webp`);
        if (!existsSync(prod_path)) {
            throw new NotFoundException([]);
        }
        await unlink(prod_path);
    };
};
