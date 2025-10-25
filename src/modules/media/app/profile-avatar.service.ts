import type e from "express";
import { serveFile } from "../utils/nest.static.js";
export const avatars_folder = ensuredJoinSync(PathsConfig.storage, "avatars", "base");
import { ConflictException, ForbiddenException, NotFoundException } from "#/modules/errors/client-side/exceptions.js";
import { join } from "node:path";
import { existsSync } from "node:fs";
import { Logger } from "log-it-colored";
import { readFile, unlink, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { MediaServiceUtils } from "../utils/methods.js";
import { PathsConfig } from "#/configs/paths.config.js";
const tempProcessPath = ensuredJoinSync(PathsConfig.storage, "avatars", "temp");
const avatar_image_width = 555 as const;
const avatar_image_height = 555 as const;
import { BadGatewayException, InternalServerErrorException } from "#/modules/errors/server-side/exceptions.js";
import { ensuredJoinSync } from "#/utils/tools/ensured-path-join.util.js";
type avatar_upload_ServiceParameters = { profile_cuid: string; file: Express.Multer.File };
type avatar_update_ServiceParameters = { profile_cuid: string; file: Express.Multer.File };
/**
 * Main Avatar Service
 */
export const avatarService = new (class Avatar_Post_Service {
    /** Deletes Avatar File */
    avatar_delete = async (profile_cuid: string) => {
        const prod_path = join(avatars_folder, `${profile_cuid}.webp`);
        if (!existsSync(prod_path)) {
            throw new NotFoundException(["Аватарка не найдена для удаления"]);
        }
        await unlink(prod_path);
    };
    avatar_set = async ({ profile_cuid, file }: avatar_upload_ServiceParameters) => {
        const prod_path = join(avatars_folder, `${profile_cuid}.webp`) as string;
        if (existsSync(prod_path)) {
            throw new ConflictException([
                "Аватар с таким идентификатором профиля уже существует. Используйте другой идентификатор профиля или обновите существующий аватар.",
            ]);
        }
        const extname = MediaServiceUtils.get_correct_extname(file.mimetype);
        const temp_path = join(tempProcessPath, `${profile_cuid}.${extname}`);
        await writeFile(temp_path, file.buffer);
        await image_sharp_process(temp_path, prod_path);
        return { profile_cuid } as const;
    };
    avatar_update = async ({ profile_cuid, file }: avatar_update_ServiceParameters) => {
        const prod_path = await MediaServiceUtils.create_avatar_prod_path_FOR_UPDATE_PATH(profile_cuid);
        const extname = MediaServiceUtils.get_correct_extname(file.mimetype);
        if (!extname) {
            throw new BadGatewayException(["Нету расширения загружаемого файла"]);
        }
        const temp_path = await MediaServiceUtils.create_avatar_temp_path(profile_cuid, extname);
        await writeFile(temp_path, file.buffer);
        await image_sharp_process(temp_path, prod_path);
        return { profile_cuid } as const;
    };
    serveAvatarImage = async (user_cuid: string, req: e.Request, res: e.Response) => {
        const filePath = join(avatars_folder, `${user_cuid}.webp`);
        return await serveFile(req, res, filePath);
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
        throw new InternalServerErrorException("Обработка изображения не удалась (#1)");
    }
};
