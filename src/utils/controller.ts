import { EnvConfig } from "#/configs/environment-variables.js";
import { chalk, Logger } from "%/logger/chalk.js";
import { MediaServerNotAvalableException } from "%/errors/server-side/exceptions.js";
import axios from "axios";
import consola from "consola";
import type e from "express";
const media_server_url = EnvConfig.service_chain.media_service.url;
export const ControllerUtils = new (class ControllerUtilsFunctions {
    public readonly media_service_api_key_header = {
        "x-media-service-api-key": EnvConfig.api_keys.media_service_api_key,
    };

    /** Returns an Error if dto is not full */
    check_dto_for_validity = <CustomReq extends e.Request>(req: CustomReq, dtos: string[]) => {
        for (const neededDto of dtos) {
            if (!Object.hasOwn(req, neededDto)) {
                throw new Error(`Нет dto: ${neededDto} в теле запроса`);
            }
        }
        return req as Required<CustomReq>;
    };
    /** Checks if the media service is available. If it is not available, it will simply be noted in the logs. */
    check_the_media_service = async () => {
        try {
            const try_ping = await axios.get<"pong">(`${EnvConfig.service_chain.media_service.url}/ping`, {
                headers: this.media_service_api_key_header,
            });
            if (try_ping.data === "pong") {
                consola.success(`The media service is available: ${chalk.blueBright(media_server_url)}`);
            }
        } catch (error) {
            consola.warn(`The media service did not respond: ${error}`);
        }
    };

    /**
     * Checks if the media service is available.
     * If it is not available, returns an internal server error and stops the request.
     */
    ping_the_media_service_middleware = async (req: e.Request, res: e.Response, next: e.NextFunction) => {
        const ping = await axios.get<"pong">(`${media_server_url}/ping`, {
            headers: this.media_service_api_key_header,
        });
        if (ping.data === "pong") {
            return next();
        }
        throw new MediaServerNotAvalableException("Медиасервер не отвечает");
    };
})();

