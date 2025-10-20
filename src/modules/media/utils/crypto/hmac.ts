import { createHmac } from "node:crypto";
import { Logger } from "log-it-colored";
import { InternalServerErrorException } from "#/modules/errors/server-side/exceptions.js";
import { EnvConfig } from "#/configs/environment-variables.js";

const SECRET_AVATAR = EnvConfig.keys.hmac_key_for_avatar_image_filename;
const SECRET_COVER = EnvConfig.keys.hmac_key_for_avatar_image_filename;

export const create_avatar_hash_from_profile_id = (profile_id: string): string => {
    try {
        const name = createHmac("sha256", SECRET_AVATAR).update(profile_id).digest("hex");
        return name;
    } catch (error) {
        Logger.error("Error from hmac service: ", error);
        throw new InternalServerErrorException("Failed to generate hash for avatar image. Please try again later.");
    }
};
export const create_cover_hash_from_profile_id = (username: string): string => {
    try {
        const name = createHmac("sha256", SECRET_COVER).update(username).digest("hex");
        return name;
    } catch (error) {
        Logger.error("Error from hmac service: ", error);
        throw new InternalServerErrorException("Failed to generate hash for cover image. Please try again later.");
    }
};
