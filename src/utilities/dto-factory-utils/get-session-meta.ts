import type { SessionMetadataType } from "#src/types/auth-middleware-shape.ts";
import type { LoginSession } from "#orm";
import type ExpressJS from "express";
import { USER_AGENT_HEADER_NAME, USER_IP_HEADER_NAME } from "#src/app/require-client-ip.guard.ts";
/**
 * Returns meta from DB LoginSession
 * @param session DB LoginSession record from DB
 * @returns meta from DB LoginSession
 */
export function getIpAndAgentFromSessionDb(session: LoginSession): SessionMetadataType {
    return {
        ip: session.ip_address,
        agent: session.user_agent || null,
    };
}

/**
 * Returns meta from web request
 * @param req Request object itself
 * @returns meta from web request
 */
export function getIpAndAgentFromRequest(headers: ExpressJS.Request["headers"]): SessionMetadataType {
    return {
        ip: headers[USER_IP_HEADER_NAME] as string,
        agent: (headers[USER_AGENT_HEADER_NAME] as string) || null,
    };
}
