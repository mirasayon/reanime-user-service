export type DtoTypeForAuthSession = {
    account_id: string;
    profile_id: string;
    selector: string;
};
/** DTO for auth */
export type RequestTypeWithDtoForAuthSession = {
    sessionDto?: DtoTypeForAuthSession;
};

/** IP and User-Agent */
export type SessionMetadataType = {
    ip: string | undefined;
    agent: string | undefined;
};
