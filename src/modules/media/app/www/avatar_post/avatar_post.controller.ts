import {
    Controller,
    Patch,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { Avatar_Post_Service } from "./avatar_post.service.js";
import { avatar_update_ReqDTO, avatar_set_ReqDTO } from "./validators/request.dto.js";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Utils } from "../../../utils/methods.js";
@Controller("avatar_post")
export class Avatar_Post_Controller {
    constructor(private readonly avatar_Post_Service: Avatar_Post_Service) {}
    @Post("set")
    @UseInterceptors(FilesInterceptor("one_avatar_image_file", 1))
    @UsePipes(new ValidationPipe())
    async avatar_set(@Query() dto: avatar_set_ReqDTO, @UploadedFiles() files: Express.Multer.File[]) {
        const file = Utils.get_first_media_field_from_request(files);
        const sr = await this.avatar_Post_Service.avatar_set({ profile_id: dto.profile_id, file });
        return sr;
    }

    @Patch("update")
    @UseInterceptors(FilesInterceptor("one_avatar_image_file", 1))
    @UsePipes(new ValidationPipe())
    async avatar_update(@Query() dto: avatar_update_ReqDTO, @UploadedFiles() files: Express.Multer.File[]) {
        const file = Utils.get_first_media_field_from_request(files);
        const sr = await this.avatar_Post_Service.avatar_update({ profile_id: dto.profile_id, file });
        return sr;
    }
}
