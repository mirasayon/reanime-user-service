import { EnvConfig } from "#/configs/environment-variables.js";
import { ControllerUtils } from "#/utils/controller.js";
import { BadRequestException, ConflictException, UnauthorizedException } from "#/modules/errors/client-side/exceptions.js";
import { InternalServerErrorException, MediaServerNotAvalableException } from "#/modules/errors/server-side/exceptions.js";
import consola from "consola";
import { avatarService } from "#/modules/media/app/www/profile-avatar/profile-avatar.service.js";

type Example_of_media_service_response = {
    avatar_hash: string;
};
export const serviceUtils = new (class ServiceUtils {
    /** Posts to media Service for setting picture for profile*/
    post_to_media_server_for_SET_avatar = async (file: Express.Multer.File, profile_id: string) => {
        const res = await avatarService.avatar_set({ profile_id: profile_id, file });
        return res;
        // try {
        //     const responseB = await axios.post<Example_of_media_service_response>(
        //         `${media_server_url}/avatar_post/set?profile_id=${profile_id}`,
        //         form,
        //         {
        //             headers: {
        //                 ...form.getHeaders(),
        //                 ...ControllerUtils.media_service_api_key_header,
        //             },
        //         },
        //     );
        //     return responseB;
        // } catch (error) {
        //     if (error instanceof AxiosError) {
        //         if (error.response?.status === 409) {
        //             throw new ConflictException(["The pfp already exists"]);
        //         }

        //         if (error.response?.status === 401) {
        //             throw new UnauthorizedException(["Unauthorized access to the media server. Please check your API key."]);
        //         }
        //         throw new BadRequestException(["There is wrong image file for avatar"]);
        //     }
        //     throw error;
        // }
    };
    /** Posts to media Service */
    post_to_media_server_for_UPDATE_avatar = async (file: Express.Multer.File, profile_id: string) => {
        const res = await avatarService.avatar_update({ profile_id: profile_id, file });
        return res;
        // const form = new FormData();
        // form.append("one_avatar_image_file", file.buffer, {
        //     filename: file.originalname,
        //     contentType: file.mimetype,
        // });

        // try {
        //     /** Upload the avatar to the media server */
        //     const responseB = await axios.patch<Example_of_media_service_response>(
        //         `${media_server_url}/avatar_post/update?profile_id=${profile_id}`,
        //         form,
        //         {
        //             headers: {
        //                 ...form.getHeaders(),
        //             },
        //         },
        //     );
        //     return responseB;
        // } catch (error) {
        //     if (error instanceof AxiosError) {
        //         if (error.response?.status === 409) {
        //             throw new ConflictException(["A pfp already exists."]);
        //         }

        //         if (error.response?.status === 401) {
        //             throw new MediaServerNotAvalableException(["Unauthorized access to the media server. Please check your API key"]);
        //         }
        //         throw new BadRequestException(["There is wrong image file for avatar"]);
        //     }
        //     throw error;
        // }
    };

    request_to_media_service_to_delete_avatar = async (profile_id: string, avatar_url_hash: string) => {
        const res = await avatarService.avatar_delete({ profile_id: profile_id, avatar_url_hash });
        return res;
        // try {
        //     const responseB = await axios.delete<Example_of_media_service_response>(`${media_server_url}/avatar_delete/via_hash`, {
        //         data: {
        //             profile_id: profile_id,
        //             avatar_url_hash: avatar_url_hash,
        //         },
        //         headers: ControllerUtils.media_service_api_key_header,
        //     });

        //     consola.info(responseB);
        //     return responseB;
        // } catch (error) {
        //     throw new InternalServerErrorException("request_to_media_service_to_delete_avatar");
        // }
    };
})();
