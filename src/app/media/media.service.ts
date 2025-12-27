import { BadRequestException } from "#/errors/client-side-exceptions.js";
import { mediaRouteModel, type DataTypeForUploadOrUpdateAvatar } from "#/app/media/media.model.js";
import type ExpressJS from "express";
import { profileRouteModel } from "#/app/user-profile/user-profile.model.js";
import { dirname, join } from "node:path";
import { AVATAR_IMAGE_FILE_HEIGHT_PIXELS, AVATAR_IMAGE_FILE_WIDTH_PIXELS } from "#/constants/media-module-config.js";
import { pathsMainConfig } from "#/configs/file-system-path-config.js";
import consola from "consola";
import type { ExpressJSMulterFileType } from "#/types/util-expressjs-types.js";
import { existsSync } from "node:fs";
import { mkdir, readdir, rm, unlink } from "node:fs/promises";
import { mediaHashService } from "#/utilities/cryptography-services/media-filename-hashing.service.js";
import { editForProdTheImageSharp, destroyFilesAfterTrigger, serveMediaFile } from "./media.utilities.js";
import type { ProfileAvatarPicture } from "#/databases/orm/client.js";
import { timingSafeEqual } from "node:crypto";
export type MediaPathPairAndFullPath = {
    dirName: string;
    fileName: string;
    fullPath: string;
};
/** Service Class with all methods for comments */
class MediaRouteServiceClass {
    private checkIfUserHasAvatar = async (profile_id: string): Promise<ProfileAvatarPicture> => {
        const avatar = await profileRouteModel.findAvatarByProfileId(profile_id);

        if (!avatar) {
            throw new BadRequestException(["Вам нужно установить аватар, но вы пытаетесь обновить"]);
        }
        return avatar;
    };
    private checkDBIfUserAlreadyHasAvatar = async (profile_id: string) => {
        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_id);
        if (found_profile.avatar) {
            throw new BadRequestException(["У вас уже есть аватарка. Вы можете обновить на странице профиля"]);
        }
    };
    set_avatar = async (profile_id: string, file: ExpressJSMulterFileType): Promise<boolean> => {
        await this.checkDBIfUserAlreadyHasAvatar(profile_id);
        const avatarFileMeta = await this.avatarSetToFS(file, profile_id);

        const new_avatar = await mediaRouteModel.set_avatar_by_id({
            by_profile_id: profile_id,
            path_dirname: avatarFileMeta.path_dirname,
            path_filename: avatarFileMeta.path_filename,
            mime_type: avatarFileMeta.mime_type,
            size_bytes: avatarFileMeta.size_bytes,
            width: avatarFileMeta.width,
            height: avatarFileMeta.height,
            original_name: file.originalname,
            hash_algorithm_version: mediaHashService.BUFFER_HASH_ALGORITHM_VERSION,
            file_hash: avatarFileMeta.file_hash,
        });
        return !!new_avatar;
    };
    private checkForDuplicateUploadFiles = (file: ExpressJSMulterFileType, stored_hash: string) => {
        const hash = mediaHashService.hashFileB64Url(file.buffer);
        if (timingSafeEqual(Buffer.from(hash), Buffer.from(stored_hash))) {
            throw new BadRequestException(["Такой файл уже загружен ранее"]);
        }
    };
    update_avatar = async (profile_id: string, file: ExpressJSMulterFileType): Promise<boolean> => {
        const found_avatar = await this.checkIfUserHasAvatar(profile_id);
        this.checkForDuplicateUploadFiles(file, found_avatar.file_hash);
        const newMeta = await this.avatarUpdateToFS(join(found_avatar.path_dirname, found_avatar.path_filename), file, profile_id);
        const updated_avatar = await mediaRouteModel.update_avatar_by_id({
            by_profile_id: profile_id,
            path_dirname: newMeta.path_dirname,
            path_filename: newMeta.path_filename,
            mime_type: newMeta.mime_type,
            height: newMeta.height,
            width: newMeta.width,
            size_bytes: newMeta.size_bytes,
            original_name: newMeta.original_name,
            hash_algorithm_version: newMeta.hash_algorithm_version,
            file_hash: newMeta.file_hash,
        });
        return !!updated_avatar;
    };

    delete_avatar = async (profile_id: string): Promise<boolean> => {
        const { path_dirname, path_filename, id } = await profileRouteModel.findAvatarByProfileId(profile_id);
        await this.deleteAvatarFile(join(path_dirname, path_filename + ".webp"));
        await mediaRouteModel.delete_avatar_by_id(id);
        return true;
    };
    avatar_view = async (username: string, req: ExpressJS.Request, res: ExpressJS.Response) => {
        const foundProfile = await profileRouteModel.find_profile_by_username(username);

        const avatar = await profileRouteModel.findAvatarByProfileId(foundProfile.profile.id).catch(() => null);
        if (!avatar) {
            return res.redirect("/default-avatar/m.jpg");
        }
        const filePath = join(pathsMainConfig.fsPathForAvatar, avatar.path_dirname, avatar.path_filename + ".webp");
        return await serveMediaFile(req, res, filePath);
    };

    private deleteAvatarFile = async (relPath: string): Promise<boolean> => {
        const fullPath = join(pathsMainConfig.fsPathForAvatar, relPath);
        const dirnamePath = dirname(fullPath);
        if (existsSync(fullPath)) {
            const dirInfo = await readdir(dirnamePath);
            if (dirInfo.length === 1) {
                await rm(dirnamePath, { recursive: true });
            } else {
                await unlink(fullPath);
            }
            return true;
        }
        return false;
    };
    private makeDirnameEnsured = async (...paths: string[]): Promise<string> => {
        const pathFull = join(...paths);
        const dirPath = dirname(pathFull);
        if (!existsSync(dirPath)) {
            await mkdir(dirPath, { recursive: true });
        }
        return pathFull;
    };
    private genAvatarPath = async (): Promise<MediaPathPairAndFullPath> => {
        const { dirName, fileName } = mediaHashService.genFilenamePairForProduction();
        const avatarPath = await this.makeDirnameEnsured(pathsMainConfig.fsPathForAvatar, dirName, `${fileName}.webp`);
        if (existsSync(avatarPath)) {
            consola.warn(
                "Просто уведомление о том, что аватар с таким идентификатором профиля уже существует - " + avatarPath,
                this.avatarSetToFS.name,
            );
            return await this.genAvatarPath();
        }
        return {
            dirName: dirName,
            fileName: fileName,
            fullPath: avatarPath,
        };
    };
    private avatarSetToFS = async (file: ExpressJSMulterFileType, profile_id: string): Promise<DataTypeForUploadOrUpdateAvatar> => {
        const pathPair = await this.genAvatarPath();
        return await this.fromTempToProdProcess(pathPair, file, profile_id);
    };

    private fromTempToProdProcess = async (
        pathPair: MediaPathPairAndFullPath,
        file: ExpressJSMulterFileType,
        profile_id: string,
    ): Promise<DataTypeForUploadOrUpdateAvatar> => {
        let errored = false;
        try {
            const size_bytes = await editForProdTheImageSharp(file.buffer, pathPair.fullPath);
            const file_hash = mediaHashService.hashFileB64Url(file.buffer);

            return {
                path_dirname: pathPair.dirName,
                path_filename: pathPair.fileName,
                mime_type: file.mimetype,
                original_name: file.originalname,
                width: AVATAR_IMAGE_FILE_WIDTH_PIXELS,
                by_profile_id: profile_id,
                file_hash: file_hash,
                height: AVATAR_IMAGE_FILE_HEIGHT_PIXELS,
                hash_algorithm_version: mediaHashService.BUFFER_HASH_ALGORITHM_VERSION,
                size_bytes: size_bytes,
            } satisfies DataTypeForUploadOrUpdateAvatar;
        } catch (error) {
            errored = true;
            throw error;
        } finally {
            try {
                await destroyFilesAfterTrigger(errored, profile_id, pathPair.fullPath);
            } catch (cleanupErr) {
                consola.warn(`Cleanup failed ${destroyFilesAfterTrigger.name}(): `, cleanupErr);
            }
        }
    };

    private avatarUpdateToFS = async (
        oldAvatarPath: string,
        file: ExpressJSMulterFileType,
        profile_id: string,
    ): Promise<DataTypeForUploadOrUpdateAvatar> => {
        await this.deleteAvatarFile(oldAvatarPath + ".webp");
        const newAvatarPath = await this.genAvatarPath();
        return await this.fromTempToProdProcess(newAvatarPath, file, profile_id);
    };
}
export const mediaSectionService = new MediaRouteServiceClass();
