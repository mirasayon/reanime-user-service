import { getSessionMetaFromClientDto } from "#/utilities/dto-factory-utils/get-session-meta.js";
import { vmFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { authenticationSectionSchemas, type AuthSectionReqDtos } from "#/shared/validators-shared/app-validator-for-all.routes.js";

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
    registration: vmFactory<AuthenticationSectionRequestTypes.registration>(authenticationSectionSchemas.registration, async (req) => {
        return {
            ...getSessionMetaFromClientDto(req),
            ...req.body,
        };
    }),

    check_session: vmFactory<AuthenticationSectionRequestTypes.check_session>(authenticationSectionSchemas.check_session),

    logout: vmFactory<AuthenticationSectionRequestTypes.logout>(authenticationSectionSchemas.logout),

    check_username_availability: vmFactory<AuthenticationSectionRequestTypes.check_username_availability>(
        authenticationSectionSchemas.check_username_availability,
        async (req) => req.params.username,
    ),

    login_by_email: vmFactory<AuthenticationSectionRequestTypes.login_by_email>(authenticationSectionSchemas.login_by_email, async (req) => {
        return {
            ...getSessionMetaFromClientDto(req),
            ...req.body,
        };
    }),

    login_by_username: vmFactory<AuthenticationSectionRequestTypes.login_by_username>(authenticationSectionSchemas.login_by_username, async (req) => {
        return {
            ...getSessionMetaFromClientDto(req),
            ...req.body,
        };
    }),
};
