import { vmFactory } from "#/utilities/validator-middleware-factory.js";
import type { Request_dto_auth as _ } from "#/types/dto-middleware-shape.js";
import { account_schemas as schemas, type dto } from "#/shared/validators/account.validator.routes.js";

export namespace rd {
    export type explore_me = _<dto.explore_me>;
    export type update_email = _<dto.update_email>;
    export type set_email = _<dto.set_email>;
    export type update_password = _<dto.update_password>;
    export type update_username = _<dto.update_username>;
    export type get_sessions = _<dto.get_sessions>;
    export type terminate_other_sessions = _<dto.terminate_other_sessions>;
    export type terminate_specific_session = _<dto.terminate_specific_session, { session_id: string }>;
    export type delete_account = _<dto.delete_account>;
}
export type { rd as Account_ReqDtos };
export const Account_ReqPipes = new (class Account_ReqPipes {
    explore_me = vmFactory<rd.explore_me>(schemas.explore_me);
    get_sessions = vmFactory<rd.get_sessions>(schemas.get_sessions);
    delete_account = vmFactory<rd.delete_account>(schemas.delete_account);
    update_email = vmFactory<rd.update_email>(schemas.update_email, async (req) => req.body);
    set_email = vmFactory<rd.set_email>(schemas.set_email, async (req) => req.body.email);
    update_password = vmFactory<rd.update_password>(schemas.update_password, async (req) => req.body);
    update_username = vmFactory<rd.update_username>(schemas.update_username, async (req) => req.body.username);
    terminate_other_sessions = vmFactory<rd.terminate_other_sessions>(schemas.terminate_other_sessions);
    terminate_specific_session = vmFactory<rd.terminate_specific_session>(schemas.terminate_specific_session, async (req) => req.params.session_id);
})();
