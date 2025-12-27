import { validatorMiddlewareFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { administratorSectionValidatorSchemas, type AdministratorSectionValidationSchemaType } from "#/shared/request-validator-for-all.routes.js";

export interface AdministratorSectionRequestTypes {
    get_all_users: RequestDtoTypeFactory<AdministratorSectionValidationSchemaType["get_all_users"]>;
}

export const administratorSectionReqPipes = {
    get_all_users: validatorMiddlewareFactory<AdministratorSectionRequestTypes["get_all_users"]>(administratorSectionValidatorSchemas.get_all_users),
};
