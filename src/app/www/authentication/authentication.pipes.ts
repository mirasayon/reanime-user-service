import { metadata_dto } from "#/utils/dto/meta.js";
import { vmfactory as m } from "#/utils/validators/factory.js";
import { Request_dto_auth as _ } from "[T]/request_with_dto.js";
import { authentication_schemas as schemas, dto } from "reanime/user-service/validators/authentication.js";

/** Namespace for all validation types for Comments logic */
namespace rd {
    export type registration = _<dto.registration>;
    export type login_via_username = _<dto.login_via_username>;
    export type login_via_email = _<dto.login_via_email>;
    export type logout = _<dto.logout>;
    export type check_session = _<dto.check_session>;
    export type check_username_availability = _<dto.check_username_availability, { username: string }>;
}
export type { rd as Authentication_ReqDtos };

export const Authentication_ReqPipes = new (class Authentication_ReqPipes {
    registration = m<rd.registration>(schemas.registration, async (req) => {
        return {
            ...metadata_dto.client_request(req),
            ...req.body,
        };
    });

    check_session = m<rd.check_session>(schemas.check_session, async (req) => {
        return {
            ...metadata_dto.client_request(req),
            ...req.cookies,
        };
    });

    logout = m<rd.logout>(schemas.logout);

    check_username_availability = m<rd.check_username_availability>(schemas.check_username_availability, async (req) => req.params.username);

    login_via_email = m<rd.login_via_email>(schemas.login_via_email, async (req) => {
        return {
            ...metadata_dto.client_request(req),
            ...req.body,
        };
    });

    login_via_username = m<rd.login_via_username>(schemas.login_via_username, async (req) => {
        return {
            ...metadata_dto.client_request(req),
            ...req.body,
        };
    });
})();

