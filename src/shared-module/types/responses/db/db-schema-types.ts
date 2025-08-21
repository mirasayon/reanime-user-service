export type Account = {
    id: string;
    created_at: Date;
    updated_at: Date;
    type: AccountType;
    email: string | null;
    username: string;
    password_hash: string;
    is_activated: boolean;
    activation_link: string | null;
};
export type Session = {
    id: string;
    created_at: Date;
    updated_at: Date;
    token: string;
    expires_at: Date | null;
    ip_address: string | null;
    user_agent: string | null;
    by_account_id: string;
};
export type Profile = {
    id: string;
    created_at: Date;
    updated_at: Date;
    by_account_id: string;
    nickname: string | null;
    avatar_url_hash: string | null;
    cover_url_hash: string | null;
    bio: string | null;
};
export type Comment = {
    anime_id: number;
    content: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    is_visible: boolean;
    by_profile_id: string;
};
export type CommentVote = {
    id: string;
    created_at: Date;
    updated_at: Date;
    by_profile_id: string;
    comment_id: string;
    vote: boolean;
};
export type AnimeFavorite = {
    id: string;
    created_at: Date;
    updated_at: Date;
    profile_id: string;
    anime_id: number;
    vote: boolean;
};
export type MarkedAnimeCollection = {
    id: string;
    created_at: Date;
    updated_at: Date;
    profile_id: string;
    anime_id: number;
    status: AnimeStatus;
};
export type Reply = {
    content: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    by_profile_id: string;
    is_visible: boolean;
    to_comment_id: string;
};
export type ReplyVote = {
    reply_id: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    by_profile_id: string;
    vote: boolean;
};
export type AnimeStatus = "WATCHING" | "ABANDONED" | "PLANNED" | "COMPLETED";
export type AccountType = "USER" | "ADMIN" | "MODERATOR" | "DEVELOPER" | "TESTER";
