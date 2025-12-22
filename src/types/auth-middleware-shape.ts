import type { LoginSession, UserProfile } from "[orm]/client.js";

/** DTO for auth */
export type AuthMiddlewareDTO = {
    session: LoginSession;
    profile: UserProfile;
};

/** IP and User-Agent */
export type SessionMetadataType = {
    ip: string | undefined;
    agent: string | undefined;
};
