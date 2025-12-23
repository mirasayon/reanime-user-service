import { AllowedImageFormats } from "#/configs/constants/media-module-config.js";
import { pathsMainConfig } from "#/configs/paths.config.js";
import { BadRequestException } from "#/errors/client-side-exceptions.js";
import { Logger } from "log-it-colored";
import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";
import path from "node:path";
import type { ExpressJS_Multer_File } from "#/types/express-types.js";

/** A file with such a path should not exist. */
type path_prod = string;
class ProfileAvatarServiceClass {
    /** Internal Service Util */
    get_correct_extname = (mimetype: string) => {
        const ext = mimetype.split("/")[1];
        if (!mimetype.startsWith("image/")) {
            throw new BadRequestException(["Invalid File MimeType"]);
        }
        return ext;
    };

    /** Checks the temporary file, if it exists, deletes it. */
    private check_tempfile = async (temp_path: string) => {
        if (existsSync(temp_path)) {
            Logger.blue("Cleaned paths.temp file");
            await unlink(temp_path);
        }
    };

    /** Internal Service Utils.*/
    deleteOldAvatarForUpdatingIt = async (avatar_hash: string): Promise<path_prod> => {
        const prod_path = path.join(pathsMainConfig.storage, "avatars", "base", `${avatar_hash}.webp`) as path_prod;
        if (!existsSync(prod_path)) {
            throw new BadRequestException(["Avatar with this profile ID does not exist. Please upload a new avatar."]);
        }
        await unlink(prod_path);
        return prod_path;
    };
    /**
     * Internal Service Utils.
     */
    create_avatar_temp_path = async (avatar_hash: string, extname: string) => {
        const temp_path = path.join(pathsMainConfig.storage, "avatars", "temp", `${avatar_hash}.${extname}`);
        await this.check_tempfile(temp_path);
        return temp_path;
    };

    private get_first_media_field_from_request = (files: ExpressJS_Multer_File[]): ExpressJS_Multer_File => {
        const file = files.at(0);
        if (!file) {
            throw new BadRequestException(["Client did not give image file"]);
        }
        if (!file.mimetype) {
            throw new BadRequestException(["File format is not allowed"]);
        }
        if (typeof file.mimetype !== "string") {
            throw new BadRequestException(["File format is not allowed"]);
        }
        if (!AllowedImageFormats.includes(file.mimetype)) {
            throw new BadRequestException(["File format is not allowed"]);
        }
        return file;
    };
}
export const profileAvatarService = new ProfileAvatarServiceClass();
