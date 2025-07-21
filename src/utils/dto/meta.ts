import type { Session } from "#/db/orm/client.js";
import type { metaData } from "[T]/auth.js";
import type e from "express";

class From_Create_DTO {
    /**
     * Returns meta from DB Session
     * @param session DB Session record from DB
     * @returns meta from DB Session
     */
    server_session_db = (session: Session): metaData => {
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
            ip: req.ip,
            agent: req.headers["user-agent"],
        };
    };
}
class Metadata_dto {
    from = new From_Create_DTO();
}

export const metadata_dto = new Metadata_dto();
