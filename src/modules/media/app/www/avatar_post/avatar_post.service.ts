import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { join } from "node:path";
import { create_avatar_hash_from_profile_id } from "../../../utils/crypto/hmac.js";
import { existsSync } from "node:fs";
import { PathsConfig } from "../../../configs/paths.js";
import { Logger } from "log-it-colored";
import { readFile, unlink, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { Utils } from "../../../utils/methods.js";
type avatar_upload_ServiceParameters = { profile_id: string; file: Express.Multer.File };
type avatar_update_ServiceParameters = { profile_id: string; file: Express.Multer.File };
@Injectable()
export class Avatar_Post_Service {
    avatar_set = async ({ profile_id, file }: avatar_upload_ServiceParameters) => {
        const avatar_hash = create_avatar_hash_from_profile_id(profile_id);
        const prod_path = Utils.create_avatar_prod_path_FOR_UPLOAD(avatar_hash);
        const extname = Utils.get_correct_extname(file.mimetype);
        const temp_path = join(PathsConfig.storage, "avatars", "temp", `${avatar_hash}.${extname}`);
        await writeFile(temp_path, file.buffer);
        await this.image_sharp_process(temp_path, prod_path);
        return { avatar_hash } as const;
    };
    avatar_update = async ({ profile_id, file }: avatar_update_ServiceParameters) => {
        const avatar_hash = create_avatar_hash_from_profile_id(profile_id);
        const prod_path = await Utils.create_avatar_prod_path_FOR_UPDATE_PATH(avatar_hash);
        const extname = Utils.get_correct_extname(file.mimetype);
        const temp_path = await Utils.create_avatar_temp_path(avatar_hash, extname);
        await writeFile(temp_path, file.buffer);
        await this.image_sharp_process(temp_path, prod_path);
        return { avatar_hash } as const;
    };

    private remove_temp_file_with_delay = async (Temp_path: string) => {
        if (existsSync(Temp_path)) {
            await Utils.sleep(2000);
            await unlink(Temp_path);
        }
    };
    private avatar_image_width = 555 as const;
    private avatar_image_height = 555 as const;
    private image_sharp_process = async (Temp_path: string, Prod_path: string) => {
        try {
            const inputBuffer = await readFile(Temp_path);
            const outputBuffer = sharp(inputBuffer);
            const processed_image_buffer = await outputBuffer
                .webp({ quality: 40, force: true })
                .resize({
                    width: this.avatar_image_width,
                    height: this.avatar_image_height,
                    fit: "cover",
                })
                .toBuffer();
            await writeFile(Prod_path, processed_image_buffer);
            this.remove_temp_file_with_delay(Temp_path);
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException("Image processing failed");
        }
    };
}
