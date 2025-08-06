import { global_Utilities } from "#/utils/functions.js";
import { vmfactory as m } from "#/utils/validators/factory.js";
import type { Request_dto_auth as _ } from "[T]/request_with_dto.js";
import { dto, comment_schemas } from "@reanime.art/user-service/user-service/validators/comment.js";

namespace rd {
    export type create = _<dto.create, { anime_id: string }>;
    export type report = _<dto.report>;
    export type update = _<dto.update>;
    export type delete_comment = _<dto.delete_comment, { comment_id: string }>;
    export type vote_dislike = _<dto.add_dislike>;
    export type vote_like = _<dto.add_like>;
    export type delete_dislike = _<dto.delete_dislike>;
    export type delete_like = _<dto.delete_like>;
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

    /** GET Reqeust  */
    get_all_for_anime = m<rd.get_all_for_anime>(comment_schemas.get_all_for_anime, async (req) => {
        const { limit, page } = global_Utilities.get_universal_search_query_values_array(req.query, ["page", "limit"]);
        const { anime_id } = req.params;
        return { page, limit, anime_id };
    });

    update = m<rd.update>(comment_schemas.update, async (req) => req.body);

    delete_comment = m<rd.delete_comment>(comment_schemas.delete_comment, async (req) => req.params.comment_id);

    report = m<rd.report>(comment_schemas.report, async (req) => req.body);

    add_like = m<rd.vote_like>(comment_schemas.add_like, async (req) => req.body);
    add_dislike = m<rd.vote_dislike>(comment_schemas.add_dislike, async (req) => req.body);

    delete_like = m<rd.delete_like>(comment_schemas.delete_like, async (req) => req.body);
    delete_dislike = m<rd.delete_dislike>(comment_schemas.delete_dislike, async (req) => req.body);
})();

