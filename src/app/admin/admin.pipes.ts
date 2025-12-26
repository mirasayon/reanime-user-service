import { vmFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory as _ } from "#/types/dto-middleware-shape.js";
import { administratorSectionValidatorSchemas, type AdminSectionReqDtos } from "#/shared/validators-shared/app-validator-for-all.routes.js";

export namespace rd {
    export type get_all_users = _<AdminSectionReqDtos.get_all_users>;
}
export type { rd as Administrator_ReqDtos };
export const Administrator_ReqPipes = new (class Account_ReqPipes {
    get_all_users = vmFactory<rd.get_all_users>(administratorSectionValidatorSchemas.get_all_users);
})();
