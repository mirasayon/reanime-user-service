import { avatarService } from "./profile-avatar.service.js";
import { MediaServiceUtils } from "../../../utils/methods.js";
import type { avatar_set_ReqDTOType, avatar_update_ReqDTOType } from "../../validators/request.dto.js";

export const Avatar_Post_Controller = new (class Avatar_Post_Controller {
    /**
     * @Post("set")
     * @UseInterceptors(FilesInterceptor("one_avatar_image_file", 1))
     * @UsePipes(new ValidationPipe())
     */
    avatar_set = async (/**@Query()*/ dto: avatar_update_ReqDTOType, /**@UploadedFiles()*/ files: Express.Multer.File[]) => {
        const file = MediaServiceUtils.get_first_media_field_from_request(files);
        const sr = await avatarService.avatar_set({ profile_id: dto.profile_id, file });
        return sr;
    };

    /**
     * @Patch("update")
     * @UseInterceptors(FilesInterceptor("one_avatar_image_file", 1))
     * @UsePipes(new ValidationPipe())
     */
    avatar_update = async (/**@Query()*/ dto: avatar_set_ReqDTOType, /**@UploadedFiles() */ files: Express.Multer.File[]) => {
        const file = MediaServiceUtils.get_first_media_field_from_request(files);
        const sr = await avatarService.avatar_update({ profile_id: dto.profile_id, file });
        return sr;
    };
})();
