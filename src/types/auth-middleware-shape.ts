export type AuthMiddlewareDTO = {
    account_id: string;
    profile_id: string;
    selector: string;
};
/** DTO for auth */
export type AuthMiddlewareDTOFull = {
    sessionDto?: AuthMiddlewareDTO;
};

/** IP and User-Agent */
export type SessionMetadataType = {
    ip: string | undefined;
    agent: string | undefined;
};
