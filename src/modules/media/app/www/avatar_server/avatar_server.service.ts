import { Injectable } from "@nestjs/common";
import e from "express";
import { join } from "path";
import { PathsConfig } from "../../../configs/paths.js";
import { serveFile } from "../../../utils/nest.static.js";
export const avatars_folder = join(PathsConfig.storage, "avatars", "base");
@Injectable()
export class Avatar_Server_Service {
    serve_avatar_files(req: e.Request, res: e.Response, avatar_hash: string) {
        const filePath = join(avatars_folder, `${avatar_hash}.webp`);
        return serveFile(req, res, filePath);
    }
}
