import { getSessionMetaFromClientDto, getSessionMetaFromDbDto } from "#/utilities/dto-factory-utils/get-session-meta.js";
import { vmFactory as m } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory as _ } from "#/types/dto-middleware-shape.js";
import { authenticationSectionSchemas as schemas, type dto } from "#/shared/validators-shared/authentication.validator.routes.js";

/** Namespace for all validation types for Comments logic */
namespace rd {
    export type registration = _<dto.registration>;
    export type login_by_username = _<dto.login_by_username>;
    export type login_by_email = _<dto.login_by_email>;
    export type logout = _<dto.logout>;
    export type check_session = _<dto.check_session>;
    export type check_username_availability = _<dto.check_username_availability, { username: string }>;
}
export type { rd as Authentication_ReqDtos };

export const Authentication_ReqPipes = new (class Authentication_ReqPipes {
    registration = m<rd.registration>(schemas.registration, async (req) => {
        return {
            ...getSessionMetaFromClientDto(req),
            ...req.body,
        };
    });

    check_session = m<rd.check_session>(schemas.check_session);

    logout = m<rd.logout>(schemas.logout);

    check_username_availability = m<rd.check_username_availability>(schemas.check_username_availability, async (req) => req.params.username);

    login_by_email = m<rd.login_by_email>(schemas.login_by_email, async (req) => {
        return {
            ...getSessionMetaFromClientDto(req),
            ...req.body,
        };
    });

    login_by_username = m<rd.login_by_username>(schemas.login_by_username, async (req) => {
        return {
            ...getSessionMetaFromClientDto(req),
            ...req.body,
        };
    });
})();
