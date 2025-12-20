import type { LoginSession } from "#/databases/orm/client.js";
import type { metaData } from "#/types/auth-middleware-shape.js";
import type e from "express";

export const metadata_dto = new (class From_Create_DTO {
    /**
     * Returns meta from DB LoginSession
     * @param session DB LoginSession record from DB
     * @returns meta from DB LoginSession
     */
    server_session_db = (session: LoginSession): metaData => {
        return {
            ip: session.ip_address ?? undefined,
            agent: session.user_agent ?? undefined,
        };
    };

    /**
     * Returns meta from web request
     * @param req Request object itself
     * @returns meta from web request
     */
    client_request = (req: e.Request): metaData => {
        return {
            ip: req.ip ?? undefined,
            agent: req.headers["user-agent"] ?? undefined,
        };
    };
})();
