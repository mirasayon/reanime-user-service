import type e from "express";
import { serveFile } from "../../../utils/nest.static.js";
export const avatars_folder = join(PathsConfig.storage, "avatars", "base");
import { ForbiddenException, NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import { join } from "node:path";
import { create_avatar_hash_from_profile_id } from "../../../utils/crypto/hmac.js";
import { existsSync } from "node:fs";
import { Logger } from "log-it-colored";
import { readFile, unlink, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { MediaServiceUtils } from "../../../utils/methods.js";
import { PathsConfig } from "#/configs/paths.config.js";

const avatar_image_width = 555 as const;
const avatar_image_height = 555 as const;
import { BadGatewayException, InternalServerErrorException } from "#/modules/errors/server-side/exceptions.js";
type avatar_upload_ServiceParameters = { profile_id: string; file: Express.Multer.File };
type avatar_update_ServiceParameters = { profile_id: string; file: Express.Multer.File };
/**
 * Main Avatar Service
 *
 */
export const avatarService = new (class Avatar_Post_Service {
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
    avatar_set = async ({ profile_id, file }: avatar_upload_ServiceParameters) => {
        const avatar_hash = create_avatar_hash_from_profile_id(profile_id);
        const prod_path = MediaServiceUtils.create_avatar_prod_path_FOR_UPLOAD(avatar_hash);
        const extname = MediaServiceUtils.get_correct_extname(file.mimetype);
        const temp_path = join(PathsConfig.storage, "avatars", "temp", `${avatar_hash}.${extname}`);
        await writeFile(temp_path, file.buffer);
        await image_sharp_process(temp_path, prod_path);
        return { avatar_hash } as const;
    };
    avatar_update = async ({ profile_id, file }: avatar_update_ServiceParameters) => {
        const avatar_hash = create_avatar_hash_from_profile_id(profile_id);
        const prod_path = await MediaServiceUtils.create_avatar_prod_path_FOR_UPDATE_PATH(avatar_hash);
        const extname = MediaServiceUtils.get_correct_extname(file.mimetype);
        if (!extname) {
            throw new BadGatewayException(["No extname of file"]);
        }
        const temp_path = await MediaServiceUtils.create_avatar_temp_path(avatar_hash, extname);
        await writeFile(temp_path, file.buffer);
        await image_sharp_process(temp_path, prod_path);
        return { avatar_hash } as const;
    };
    /** /avatar/:avatar_hash */
    serveAvatarImage = async (req: e.Request, /**@Param("avatar_hash") */ avatar_hash: string, res: e.Response) => {
        async function serve_avatar_files(req: e.Request, res: e.Response, avatar_hash: string) {
            const filePath = join(avatars_folder, `${avatar_hash}.webp`);
            return await serveFile(req, res, filePath);
        }
        return await serve_avatar_files(req, res, avatar_hash);
    };
})();

const remove_temp_file_with_delay = async (Temp_path: string) => {
    if (existsSync(Temp_path)) {
        await MediaServiceUtils.sleep(2000);
        await unlink(Temp_path);
    }
};
const image_sharp_process = async (Temp_path: string, Prod_path: string) => {
    try {
        const inputBuffer = await readFile(Temp_path);
        const outputBuffer = sharp(inputBuffer);
        const processed_image_buffer = await outputBuffer
            .webp({ quality: 40, force: true })
            .resize({
                width: avatar_image_width,
                height: avatar_image_height,
                fit: "cover",
            })
            .toBuffer();
        await writeFile(Prod_path, processed_image_buffer);
        remove_temp_file_with_delay(Temp_path);
    } catch (error) {
        Logger.error(`InternalServerErrorException("Image processing failed");  ` + error);
        throw new InternalServerErrorException("Image processing failed");
    }
};
type Avatar_Delete_Service_Parameters = {
    /** For example: cmapdavvp0001sa7wrq4bdrzc */
    profile_id: string;
    /** For example: 3c41283948cd66a9fd20541161811b044d762141add6d0158fecb015509d5c1b */
    avatar_url_hash: string;
};
