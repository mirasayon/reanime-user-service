import { vmFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory as _ } from "#/types/dto-middleware-shape.js";
import { administrator_schemas, type dto } from "#/shared/validators-shared/admin.validator.routes.js";

export namespace rd {
    export type get_all_users = _<dto.get_all_users>;
}
export type { rd as Administrator_ReqDtos };
export const Administrator_ReqPipes = new (class Account_ReqPipes {
    get_all_users = vmFactory<rd.get_all_users>(administrator_schemas.get_all_users);
})();
