import type { LoginSession, UserProfile } from "[orm]";

/** DTO for auth */
export type mid_auth_dto = {
    session: LoginSession;
    profile: UserProfile;
};

/** IP and User-Agent */
export type metaData = {
    ip: string | undefined;
    agent: string | undefined;
};
