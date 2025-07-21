/**
 * Namespace for common database-related primitive types.
 * These types represent more meaningful aliases for raw values stored in the database.
 */
export namespace infotype {
    /** Represents a user's email address */
    export type Email = string;

    /** Represents a unique CUID identifier (e.g. user ID) */
    export type Cuid = string;

    /** Represents a user's raw (non-hashed) password */
    export type RawUserPassword = string;

    /** Represents a user's display name or username */
    export type Username = string;
    /** Represents an anime ID (Shikimori anime ID) */
    export type Anime_ID = number;

    /** Represents an Session's Token. 64 char lenght */
    export type session_token = string;
}
