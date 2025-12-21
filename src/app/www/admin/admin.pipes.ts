import { vmfactory } from "#/utilities/validators/factory.js";
import type { Request_dto_auth as _ } from "#/types/dto-middleware-shape.js";
import { administrator_schemas, type dto } from "#/shared/validators/admin.validator.routes.js";

export namespace rd {
    export type get_all_users = _<dto.get_all_users>;
}
export type { rd as Administrator_ReqDtos };
export const Administrator_ReqPipes = new (class Account_ReqPipes {
    get_all_users = vmfactory<rd.get_all_users>(administrator_schemas.get_all_users);
})();
