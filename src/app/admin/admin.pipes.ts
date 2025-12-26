import { validatorMiddlewareFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { administratorSectionValidatorSchemas, type AdminSectionReqDtos } from "#/shared/validators/request-validator-for-all.routes.js";

export namespace AdministratorSectionRequestTypes {
    export type get_all_users = RequestDtoTypeFactory<AdminSectionReqDtos.get_all_users>;
}

export const administratorSectionReqPipes = {
    get_all_users: validatorMiddlewareFactory<AdministratorSectionRequestTypes.get_all_users>(administratorSectionValidatorSchemas.get_all_users),
};
