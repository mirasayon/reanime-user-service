import { validatorMiddlewareFactory } from "#src/utilities/controller-utility-functions.ts";
import type { RequestDtoTypeFactory } from "#src/types/dto-middleware-shape.ts";
import { authenticationSectionSchemas, type AuthenticationSectionValidatorSchemaType } from "#src/shared/request-validator-for-all.routes.ts";

/** Namespace for all validation types for Comments logic */
export interface AuthenticationSectionRequestTypes {
    registration: RequestDtoTypeFactory<AuthenticationSectionValidatorSchemaType["registration"]>;
    login_by_username: RequestDtoTypeFactory<AuthenticationSectionValidatorSchemaType["login_by_username"]>;
    login_by_email: RequestDtoTypeFactory<AuthenticationSectionValidatorSchemaType["login_by_email"]>;
    logout: RequestDtoTypeFactory<AuthenticationSectionValidatorSchemaType["logout"]>;
    check_session: RequestDtoTypeFactory<AuthenticationSectionValidatorSchemaType["check_session"]>;
    check_username_availability: RequestDtoTypeFactory<AuthenticationSectionValidatorSchemaType["check_username_availability"], { username: string }>;
}

export const authenticationSectionRequestValidatorMiddlewares = {
    registration: validatorMiddlewareFactory<AuthenticationSectionRequestTypes["registration"]>(
        authenticationSectionSchemas.registration,
        (req) => req.body,
    ),

    check_session: validatorMiddlewareFactory<AuthenticationSectionRequestTypes["check_session"]>(authenticationSectionSchemas.check_session),

    logout: validatorMiddlewareFactory<AuthenticationSectionRequestTypes["logout"]>(authenticationSectionSchemas.logout),

    check_username_availability: validatorMiddlewareFactory<AuthenticationSectionRequestTypes["check_username_availability"]>(
        authenticationSectionSchemas.check_username_availability,
        (req) => req.params.username,
    ),

    login_by_email: validatorMiddlewareFactory<AuthenticationSectionRequestTypes["login_by_email"]>(
        authenticationSectionSchemas.login_by_email,
        (req) => req.body,
    ),

    login_by_username: validatorMiddlewareFactory<AuthenticationSectionRequestTypes["login_by_username"]>(
        authenticationSectionSchemas.login_by_username,
        (req) => req.body,
    ),
};
