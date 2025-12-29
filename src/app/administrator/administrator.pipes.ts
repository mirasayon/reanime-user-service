import { validatorMiddlewareFactory } from "#src/utilities/controller-utility-functions.ts";
import type { RequestDtoTypeFactory } from "#src/types/dto-middleware-shape.ts";
import { administratorSectionValidatorSchemas, type AdministratorSectionValidationSchemaType } from "#src/shared/request-validator-for-all.routes.ts";

export interface AdministratorSectionRequestTypes {
    get_all_users: RequestDtoTypeFactory<AdministratorSectionValidationSchemaType["get_all_users"]>;
}

export const administratorSectionReqPipes = {
    get_all_users: validatorMiddlewareFactory<AdministratorSectionRequestTypes["get_all_users"]>(administratorSectionValidatorSchemas.get_all_users),
};
