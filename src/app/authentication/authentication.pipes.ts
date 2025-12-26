import { getSessionMetaFromClientDto } from "#/utilities/dto-factory-utils/get-session-meta.js";
import { validatorMiddlewareFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { authenticationSectionSchemas, type AuthSectionReqDtos } from "#/shared/validators/app-validator-for-all.routes.js";

/** Namespace for all validation types for Comments logic */
export namespace AuthenticationSectionRequestTypes {
    export type registration = RequestDtoTypeFactory<AuthSectionReqDtos.registration>;
    export type login_by_username = RequestDtoTypeFactory<AuthSectionReqDtos.login_by_username>;
    export type login_by_email = RequestDtoTypeFactory<AuthSectionReqDtos.login_by_email>;
    export type logout = RequestDtoTypeFactory<AuthSectionReqDtos.logout>;
    export type check_session = RequestDtoTypeFactory<AuthSectionReqDtos.check_session>;
    export type check_username_availability = RequestDtoTypeFactory<AuthSectionReqDtos.check_username_availability, { username: string }>;
}

export const authenticationSectionRequestValidatorMiddlewares = {
    registration: validatorMiddlewareFactory<AuthenticationSectionRequestTypes.registration>(
        authenticationSectionSchemas.registration,
        async (req) => {
            return {
                ...getSessionMetaFromClientDto(req),
                ...req.body,
            };
        },
    ),

    check_session: validatorMiddlewareFactory<AuthenticationSectionRequestTypes.check_session>(authenticationSectionSchemas.check_session),

    logout: validatorMiddlewareFactory<AuthenticationSectionRequestTypes.logout>(authenticationSectionSchemas.logout),

    check_username_availability: validatorMiddlewareFactory<AuthenticationSectionRequestTypes.check_username_availability>(
        authenticationSectionSchemas.check_username_availability,
        async (req) => req.params.username,
    ),

    login_by_email: validatorMiddlewareFactory<AuthenticationSectionRequestTypes.login_by_email>(
        authenticationSectionSchemas.login_by_email,
        async (req) => {
            return {
                ...getSessionMetaFromClientDto(req),
                ...req.body,
            };
        },
    ),

    login_by_username: validatorMiddlewareFactory<AuthenticationSectionRequestTypes.login_by_username>(
        authenticationSectionSchemas.login_by_username,
        async (req) => {
            return {
                ...getSessionMetaFromClientDto(req),
                ...req.body,
            };
        },
    ),
};
