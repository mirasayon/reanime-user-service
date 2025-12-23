import { BadRequestException, NotFoundException, ConflictException } from "#/errors/client-side-exceptions.js";
import { mediaRouteModel } from "#/app/media/media.model.js";
import type { default as ExpressJS } from "express";
import { profileRouteModel } from "#/app/profile/profile.model.js";
import { AllowedImageFormats } from "#/constants/media-module-config.js";
import { pathsMainConfig } from "#/configs/file-system-path-config.js";
import { Logger } from "log-it-colored";
import path from "node:path";
import { avatar_image_height, avatar_image_width } from "#/constants/media-module-config.js";
import { baseProcessPathForAvatar, tempProcessPathForAvatar } from "#/configs/file-system-path-config.js";
import { BadGatewayException } from "#/errors/server-side-exceptions.js";
import consola from "consola";
import { existsSync } from "node:fs";
import { readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import sharp from "sharp";
import type { ExpressJS_Multer_File } from "#/types/util-expressjs-types.js";
import { serveAvatarFile } from "./utils-media-route/serve-static-for-avatars.js";

/** A file with such a path should not exist. */
type path_prod = string;
/** Service Class with all methods for comments */
class MediaRouteServiceClass {
    private checkIfUserHasAvatar = async (profile_id: string) => {
        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_id);

        if (!found_profile.avatar) {
            throw new BadRequestException(["Вам нужно установить аватар, но вы пытаетесь обновить"]);
        }
        return { found_profile };
    };

    private checkIfProfileHasAvatarForDeletingIt = async (profile_id: string) => {
        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_id);

        if (!found_profile.avatar) {
            throw new BadRequestException(["Аватар не найден"]);
        }
    };
    private checkIfUserALreadyHasAvatar = async (profile_id: string) => {
        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_id);
        if (found_profile.avatar) {
            throw new BadRequestException(["Вам нужно обновить аватар, но вы загружаете"]);
        }
    };
    set_avatar = async (profile_cuid: string): Promise<boolean> => {
        await this.checkIfUserALreadyHasAvatar(profile_cuid);

        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_cuid);
        if (found_profile.avatar) {
            throw new BadRequestException(["Вам нужно обновить аватар, но вы загружаете"]);
        }
        const username = (await profileRouteModel.find_by_account_id_AND_return_account_and_profile(found_profile.by_account_id)).account.username;
        const new_avatar = await mediaRouteModel.set_avatar_by_id(found_profile.id, username, "", 1);
        return !!new_avatar;
    };
    update_avatar = async (profile_id: string): Promise<boolean> => {
        const { found_profile } = await this.checkIfUserHasAvatar(profile_id);
        const username = (await profileRouteModel.find_by_account_id_AND_return_account_and_profile(found_profile.by_account_id)).account.username;
        const updated_avatar = await mediaRouteModel.update_avatar_by_id(found_profile.id, username, "", 1);
        return !!updated_avatar;
    };

    delete_avatar = async (profile_id: string): Promise<boolean> => {
        await this.checkIfProfileHasAvatarForDeletingIt(profile_id);

        await this.avatar_delete(profile_id);
        const deleted_avatar = await mediaRouteModel.delete_avatar_from_profile(profile_id);
        return !!deleted_avatar;
    };
    avatar_view = async (username: string, req: ExpressJS.Request, res: ExpressJS.Response) => {
        const foundProfile = await profileRouteModel.find_profile_by_username(username);
        if (!foundProfile) {
            throw new NotFoundException(["Пользователь с таким юзернеймом не найден"]);
        }
        const avatarData = await profileRouteModel.find_profile_by_its_id_with_avatar_data(foundProfile.profile.id);
        if (!avatarData.avatar) {
            return res.redirect("/default-avatar/m.jpg");
        }
        return await this.serveAvatarImage(avatarData.avatar.by_profile_id, req, res);
    };

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

    // -------------------- utils --------------------

    /** Deletes Avatar File */
    avatar_delete = async (profile_cuid: string) => {
        const prod_path = join(baseProcessPathForAvatar, `${profile_cuid}.webp`);
        if (!existsSync(prod_path)) {
            throw new NotFoundException(["Аватарка не найдена для удаления [2]"]);
        }
        await unlink(prod_path);
    };
    avatar_set = async ({ profile_cuid, file }: avatar_upload_ServiceParameters) => {
        let errored = false;
        const prod_path = join(baseProcessPathForAvatar, `${profile_cuid}.webp`) as string;
        const extname = this.get_correct_extname(file.mimetype);
        const temp_path = join(tempProcessPathForAvatar, `${profile_cuid}.${extname}`);
        if (existsSync(prod_path)) {
            throw new ConflictException([
                "Аватар с таким идентификатором профиля уже существует. Используйте другой идентификатор профиля или обновите существующий аватар.",
            ]);
        }
        // ---- Image Processing
        try {
            await writeFile(temp_path, file.buffer);
            return await image_sharp_process(temp_path, prod_path);
        } catch (error) {
            errored = true;
            throw error;
        } finally {
            try {
                await clearAvatarFileSystemAfterError(temp_path, prod_path, errored);
            } catch (cleanupErr) {
                consola.warn(`Cleanup failed (${clearAvatarFileSystemAfterError.name}): `, cleanupErr);
            }
        }
    };
    /**
     * Перезаписывает аватарку
     */
    avatar_update = async ({ profile_cuid, file }: avatar_update_ServiceParameters) => {
        let errored = false;
        const prod_path = await this.deleteOldAvatarForUpdatingIt(profile_cuid);
        const extname = this.get_correct_extname(file.mimetype);
        if (!extname) {
            throw new BadGatewayException(["Нету расширения загружаемого файла"]);
        }
        const temp_path = await this.create_avatar_temp_path(profile_cuid, extname);

        try {
            await writeFile(temp_path, file.buffer);
            await image_sharp_process(temp_path, prod_path);
        } catch (error) {
            errored = true;
            throw error;
        } finally {
            try {
                await clearAvatarFileSystemAfterError(temp_path, prod_path, errored);
            } catch (cleanupErr) {
                consola.warn(`Cleanup failed (${clearAvatarFileSystemAfterError.name}): `, cleanupErr);
            }
        }
    };
    serveAvatarImage = async (user_cuid: string, req: ExpressJS.Request, res: ExpressJS.Response) => {
        const filePath = join(baseProcessPathForAvatar, `${user_cuid}.webp`);
        return await serveAvatarFile(req, res, filePath);
    };
}
export const mediaRouteService = new MediaRouteServiceClass();

//
type avatar_upload_ServiceParameters = { profile_cuid: string; file: ExpressJS_Multer_File };
type avatar_update_ServiceParameters = { profile_cuid: string; file: ExpressJS_Multer_File };

const remove_temp_file_with_delay = async (Temp_path: string) => {
    if (existsSync(Temp_path)) {
        await delay(2000);
        await unlink(Temp_path);
    }
};
const image_sharp_process = async (Temp_path: string, Prod_path: string) => {
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
    return true;
};
async function clearAvatarFileSystemAfterError(tempFilePath: string, prodFilePath: string, errored: boolean) {
    if (!errored) {
        return;
    }
    if (existsSync(tempFilePath)) {
        await unlink(tempFilePath);
    }
    if (existsSync(prodFilePath)) {
        await unlink(tempFilePath);
    }
}
