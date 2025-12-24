import { BadRequestException, NotFoundException, ConflictException } from "#/errors/client-side-exceptions.js";
import { mediaRouteModel } from "#/app/media/media.model.js";
import type { default as ExpressJS } from "express";
import { profileRouteModel } from "#/app/profile/profile.model.js";
import { pathsMainConfig } from "#/configs/file-system-path-config.js";
import { Logger } from "log-it-colored";
import { dirname, join } from "node:path";
import { AVATAR_IMAGE_FILE_HEIGHT_PIXELS, AVATAR_IMAGE_FILE_WIDTH_PIXELS } from "#/constants/media-module-config.js";
import { baseProcessPathForAvatar, tempProcessPathForAvatar } from "#/configs/file-system-path-config.js";
import { BadGatewayException, UnexpectedInternalServerErrorException } from "#/errors/server-side-exceptions.js";
import consola from "consola";
import type { ExpressJSMulterFileType } from "#/types/util-expressjs-types.js";
import { statSync, existsSync } from "node:fs";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { mediaHashService } from "#/utilities/cryptography-services/media-filename-hashing.service.js";
import { editForProdTheImageSharp, destroyFilesAfterTrigger, serveMediaFile } from "./media.utilities.js";
type FileSystemAvatarMeta = {
    path: string;
    mime_type: string;
    file_hash: string;
    original_name: string | null;
    width: number | null;
    height: number | null;
    size_bytes: number;
};

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
    set_avatar = async (profile_cuid: string, file: ExpressJSMulterFileType): Promise<boolean> => {
        const avatarFileMeta = await mediaSectionService.avatarSetToFS(file);
        await this.checkIfUserALreadyHasAvatar(profile_cuid);

        const found_profile = await profileRouteModel.find_profile_by_its_id_with_avatar_data(profile_cuid);
        if (found_profile.avatar) {
            throw new BadRequestException(["Вам нужно обновить аватар, но вы загружаете"]);
        }
        const username = (await profileRouteModel.find_by_account_id_AND_return_account_and_profile(found_profile.by_account_id)).account.username;
        const new_avatar = await mediaRouteModel.set_avatar_by_id(found_profile.id, username, "", 1);
        return !!new_avatar;
    };
    update_avatar = async (profile_id: string, file: ExpressJSMulterFileType): Promise<boolean> => {
        await this.avatarUpdateFileSystem("", file);
        const { found_profile } = await this.checkIfUserHasAvatar(profile_id);
        const username = (await profileRouteModel.find_by_account_id_AND_return_account_and_profile(found_profile.by_account_id)).account.username;
        const updated_avatar = await mediaRouteModel.update_avatar_by_id(found_profile.id, username, "", 1);
        return !!updated_avatar;
    };

    delete_avatar = async (profile_id: string): Promise<boolean> => {
        await this.checkIfProfileHasAvatarForDeletingIt(profile_id);

        const deleted_avatar = await mediaRouteModel.delete_avatar_from_profile(profile_id);
        await this.avatarDeleteFileSystem(profile_id);
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
    private get_correct_extname = (mimetype: string): string => {
        const ext = mimetype.split("/")[1];
        if (!mimetype.startsWith("image/")) {
            throw new BadRequestException(["Invalid File MimeType"]);
        }
        if (!ext) {
            throw new BadGatewayException(["Нету расширения загружаемого файла"]);
        }
        return ext;
    };

    /** Checks the temporary file, if it exists, deletes it. */
    private destroyFileIfExists = async (temp_path: string) => {
        if (existsSync(temp_path)) {
            Logger.blue("Cleaned paths.temp file");
            await unlink(temp_path);
        }
    };

    /** Internal Service Utils.*/
    private destroyProdAvatarFile = async (pathToDelete: string): Promise<path_prod> => {
        const prod_path = join(pathsMainConfig.storage, "avatars", "base", pathToDelete) as path_prod;
        if (!existsSync(prod_path)) {
            throw new BadRequestException(["Avatar with this profile ID does not exist. Please upload a new avatar."]);
        }
        await unlink(prod_path);
        return prod_path;
    };
    /**
     * Internal Service Utils.
     */
    private makeEnsuredPathFull = async (pathFull: string): Promise<string> => {
        const ensuredPath = join(pathsMainConfig.storage, "avatars", "temp", pathFull);
        const dirPath = dirname(ensuredPath);
        if (!existsSync(dirPath)) {
            await mkdir(dirPath, { recursive: true });
        }
        return ensuredPath;
    };

    // -------------------- File System  --------------------

    /** Deletes Avatar File */
    private avatarDeleteFileSystem = async (pathToDelete: string) => {
        const fullPath = join(baseProcessPathForAvatar, pathToDelete);
        if (existsSync(fullPath)) {
            await unlink(fullPath);
        }
        throw new UnexpectedInternalServerErrorException("Аватарка не найдена для удаления", this.avatarDeleteFileSystem.name);
    };
    private avatarSetToFS = async (file: ExpressJSMulterFileType): Promise<FileSystemAvatarMeta> => {
        const genName = mediaHashService.genFilenamePairForProduction();

        const prod_path = join(baseProcessPathForAvatar, genName.dirName, `${genName.dirName}.webp`) as string;
        const extname = this.get_correct_extname(file.mimetype);

        const temp_path = join(tempProcessPathForAvatar, genName.dirName, `${genName.dirName}.${extname}`);
        if (existsSync(prod_path)) {
            throw new UnexpectedInternalServerErrorException("Аватар с таким идентификатором профиля уже существует", this.avatarSetToFS.name);
        }
        // ---- Image Processing
        return await this.fromTempToProdProcess(temp_path, prod_path, file);
    };

    private fromTempToProdProcess = async (temp_path: string, prod_path: string, file: ExpressJSMulterFileType): Promise<FileSystemAvatarMeta> => {
        let errored = false;

        try {
            await writeFile(temp_path, file.buffer);
            const hash = await editForProdTheImageSharp(temp_path, prod_path);
            return {
                path: prod_path,
                mime_type: file.mimetype,
                original_name: file.originalname,
                width: AVATAR_IMAGE_FILE_WIDTH_PIXELS,
                file_hash: hash,
                height: AVATAR_IMAGE_FILE_HEIGHT_PIXELS,
                size_bytes: statSync(prod_path).size,
            } satisfies FileSystemAvatarMeta;
        } catch (error) {
            errored = true;
            throw error;
        } finally {
            try {
                await destroyFilesAfterTrigger(errored, [temp_path, prod_path]);
            } catch (cleanupErr) {
                consola.warn(`Cleanup failed (${destroyFilesAfterTrigger.name}): `, cleanupErr);
            }
        }
    };

    private avatarUpdateFileSystem = async (pathToDelete: string, file: ExpressJSMulterFileType): Promise<FileSystemAvatarMeta> => {
        await this.destroyProdAvatarFile(pathToDelete);
        const genName = mediaHashService.genFilenamePairForProduction();

        const prod_path = join(baseProcessPathForAvatar, genName.dirName, `${genName.dirName}.webp`) as string;
        const extname = this.get_correct_extname(file.mimetype);

        const temp_path = join(tempProcessPathForAvatar, genName.dirName, `${genName.dirName}.${extname}`);
        if (existsSync(prod_path)) {
            throw new UnexpectedInternalServerErrorException("Аватар с таким идентификатором профиля уже существует", this.avatarSetToFS.name);
        }

        // ---- Image Processing
        return await this.fromTempToProdProcess(temp_path, prod_path, file);
    };
    serveAvatarImage = async (profile_id: string, req: ExpressJS.Request, res: ExpressJS.Response) => {
        const filePath = join(baseProcessPathForAvatar, `${profile_id}.webp`);
        return await serveMediaFile(req, res, filePath);
    };
}
export const mediaSectionService = new MediaRouteServiceClass();
