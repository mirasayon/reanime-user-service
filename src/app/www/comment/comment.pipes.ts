import { get_universal_search_query_values_array } from "#/utilities/util-functions.js";
import { vmfactory as m } from "#/utilities/validators/factory.js";
import type { Request_dto_auth as _ } from "#/types/dto-middleware-shape.js";
import { type dto, comment_schemas } from "#/shared/validators/comment.validator.routes.js";

namespace rd {
    export type create = _<dto.create, { anime_id: string }>;
    export type report = _<dto.report>;
    export type all_my_comments = _<dto.all_my_comments>;
    export type all_for_public_profile = _<dto.all_for_public_profile, { username: string }>;
    export type update = _<dto.update, { comment_id: string }>;
    export type delete_comment = _<dto.delete_comment, { comment_id: string }>;
    export type vote_dislike = _<dto.add_dislike, { comment_id: string }>;
    export type vote_like = _<dto.add_like, { comment_id: string }>;
    export type delete_dislike = _<dto.delete_dislike, { comment_id: string }>;
    export type delete_like = _<dto.delete_like, { comment_id: string }>;
    export type get_all_for_anime = _<dto.get_all_for_anime, { anime_id: string }>;
}
export type { rd as Comment_ReqDtos };

export const Comment_ReqPipes = new (class Comment_ReqPipes {
    create = m<rd.create>(comment_schemas.create, async (req) => {
        return {
            ...req.body,
            anime_id: req.params.anime_id,
        };
    });

    /** GET Request  */
    get_all_for_anime = m<rd.get_all_for_anime>(comment_schemas.get_all_for_anime, async (req) => {
        const { limit, page } = get_universal_search_query_values_array(req.query, ["page", "limit"]);
        const { anime_id } = req.params;
        return { page, limit, anime_id };
    });

    update = m<rd.update>(comment_schemas.update, async (req) => {
        return { comment_id: req.params.comment_id, ...req.body };
    });

    delete_comment = m<rd.delete_comment>(comment_schemas.delete_comment, async (req) => req.params.comment_id);

    report = m<rd.report>(comment_schemas.report, async (req) => req.body);
    /** new 2025.11.15 */
    all_my_comments = m<rd.all_my_comments>(comment_schemas.all_my_comments, async (req) => {
        const { limit, page } = get_universal_search_query_values_array(req.query, ["page", "limit"]);
        return {
            limit: limit,
            page: page,
        };
    });
    /** new 2025.11.15 */
    all_for_public_profile = m<rd.all_for_public_profile>(comment_schemas.all_for_public_profile, async (req) => {
        const { limit, page } = get_universal_search_query_values_array(req.query, ["page", "limit"]);
        return {
            limit: limit,
            page: page,
            username: req.params.username,
        };
    });

    add_like = m<rd.vote_like>(comment_schemas.add_like, async (req) => req.params.comment_id);
    add_dislike = m<rd.vote_dislike>(comment_schemas.add_dislike, async (req) => req.params.comment_id);

    delete_like = m<rd.delete_like>(comment_schemas.delete_like, async (req) => req.params.comment_id);
    delete_dislike = m<rd.delete_dislike>(comment_schemas.delete_dislike, async (req) => req.params.comment_id);
})();
