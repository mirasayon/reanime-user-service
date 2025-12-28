import { validatorMiddlewareFactory } from "#src/utilities/validator-middleware-factory.ts";
import type { RequestDtoTypeFactory } from "#src/types/dto-middleware-shape.ts";
import { accountSectionSchemas, type AccountSectionValidationSchemaType } from "#src/shared/request-validator-for-all.routes.ts";

export interface AccountSectionRequestWithDtoTypes {
    explore_me: RequestDtoTypeFactory<AccountSectionValidationSchemaType["explore_me"]>;
    update_email: RequestDtoTypeFactory<AccountSectionValidationSchemaType["update_email"]>;
    set_email: RequestDtoTypeFactory<AccountSectionValidationSchemaType["set_email"]>;
    update_password: RequestDtoTypeFactory<AccountSectionValidationSchemaType["update_password"]>;
    update_username: RequestDtoTypeFactory<AccountSectionValidationSchemaType["update_username"]>;
    get_sessions: RequestDtoTypeFactory<AccountSectionValidationSchemaType["get_sessions"]>;
    terminate_other_sessions: RequestDtoTypeFactory<AccountSectionValidationSchemaType["terminate_other_sessions"]>;
    terminate_specific_session: RequestDtoTypeFactory<AccountSectionValidationSchemaType["terminate_specific_session"], { session_id: string }>;
    delete_account: RequestDtoTypeFactory<AccountSectionValidationSchemaType["delete_account"]>;
}
export const accountSectionValidatorMiddlewares = {
    explore_me: validatorMiddlewareFactory<AccountSectionRequestWithDtoTypes["explore_me"]>(accountSectionSchemas.explore_me),
    get_sessions: validatorMiddlewareFactory<AccountSectionRequestWithDtoTypes["get_sessions"]>(accountSectionSchemas.get_sessions),
    delete_account: validatorMiddlewareFactory<AccountSectionRequestWithDtoTypes["delete_account"]>(accountSectionSchemas.delete_account),
    update_email: validatorMiddlewareFactory<AccountSectionRequestWithDtoTypes["update_email"]>(
        accountSectionSchemas.update_email,
        (req) => req.body,
    ),
    set_email: validatorMiddlewareFactory<AccountSectionRequestWithDtoTypes["set_email"]>(accountSectionSchemas.set_email, (req) => req.body.email),
    update_password: validatorMiddlewareFactory<AccountSectionRequestWithDtoTypes["update_password"]>(
        accountSectionSchemas.update_password,
        (req) => req.body,
    ),
    update_username: validatorMiddlewareFactory<AccountSectionRequestWithDtoTypes["update_username"]>(
        accountSectionSchemas.update_username,
        (req) => req.body.username,
    ),
    terminate_other_sessions: validatorMiddlewareFactory<AccountSectionRequestWithDtoTypes["terminate_other_sessions"]>(
        accountSectionSchemas.terminate_other_sessions,
    ),
    terminate_specific_session: validatorMiddlewareFactory<AccountSectionRequestWithDtoTypes["terminate_specific_session"]>(
        accountSectionSchemas.terminate_specific_session,
        (req) => req.params.session_id,
    ),
};
