import type { ReplyToComment, ReplyVote } from "../../databases/orm/client.js";

/** RESPONSES For Reply Route */
export namespace Reply_ResponseTypes {
    export type edit_reply = ReplyToComment;
    export type get_1_reply_by_its_id = ReplyToComment;
    export type get_replies_by_comment_id = ReplyToComment[];
    export type add_like = {
        is_updated: boolean;
        vote: ReplyVote;
    };
    export type add_dislike = {
        is_updated: boolean;
        vote: ReplyVote;
    };
    export type delete_like = ReplyVote;
    export type delete_dislike = ReplyVote;
    export type report = 0;
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
