import type { ReplyForComment } from "[orm]";

/** RESPONSES For Reply Route */
export namespace ResponseTypesForReplyToComment {
    export type edit_reply = boolean;
    export type get_1_reply_by_its_id = ReplyForComment;
    export type get_replies_by_comment_id = ReplyForComment[];
    export type add_like = boolean;
    export type add_dislike = boolean;
    export type delete_like = boolean;
    export type delete_dislike = boolean;
    export type report = boolean;
    /** Create reply
     *
     * true = Created
     *
     * false = error
     */
    export type create_reply = boolean;
    /** Deleted reply type
     * true = deleted
     *
     * false = error
     */
    export type delete_reply = boolean;
}
