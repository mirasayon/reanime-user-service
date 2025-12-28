import type { SessionMetadataType } from "#src/types/auth-middleware-shape.ts";
import type { LoginSession } from "#orm/client.ts";
import type ExpressJS from "express";
/**
 * Returns meta from DB LoginSession
 * @param session DB LoginSession record from DB
 * @returns meta from DB LoginSession
 */
export function getSessionMetaFromDbDto(session: LoginSession): SessionMetadataType {
    return {
        ip: session.ip_address ?? undefined,
        agent: session.user_agent ?? undefined,
    };
}

/**
 * Returns meta from web request
 * @param req Request object itself
 * @returns meta from web request
 */
export function getSessionMetaFromClientDto(req: ExpressJS.Request): SessionMetadataType {
    return {
        ip: req.ip ?? undefined,
        agent: req.headers["user-agent"] ?? undefined,
    };
}
