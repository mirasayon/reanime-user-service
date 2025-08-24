import type { Profile, Session } from "#/db/orm/client.js";

/** DTO for auth */
export type mid_auth_dto = {
    session: Session;
    profile: Profile;
};

/** IP and User-Agent */
export type metaData = {
    ip: string | undefined;
    agent: string | undefined;
};

