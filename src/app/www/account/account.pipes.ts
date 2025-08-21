import { vmfactory } from "#/utils/validators/factory.js";
import type { Request_dto_auth as _ } from "[T]/request_with_dto.js";
import { account_schemas as schemas, dto } from "%/validators/account.js";

export namespace rd {
    export type explore_me = _<dto.explore_me>;
    export type update_email = _<dto.update_email>;
    export type set_email = _<dto.set_email>;
    export type update_password = _<dto.update_password>;
    export type update_username = _<dto.update_username>;
    export type get_sessions = _<dto.get_sessions>;
    export type terminate_other_sessions = _<dto.terminate_other_sessions>;
    export type delete_account = _<dto.delete_account>;
}
export type { rd as Account_ReqDtos };
export const Account_ReqPipes = new (class Account_ReqPipes {
    explore_me = vmfactory<rd.explore_me>(schemas.explore_me);
    get_sessions = vmfactory<rd.get_sessions>(schemas.get_sessions);
    delete_account = vmfactory<rd.delete_account>(schemas.delete_account);
    update_email = vmfactory<rd.update_email>(schemas.update_email, async (req) => req.body);
    set_email = vmfactory<rd.set_email>(schemas.set_email, async (req) => req.body.email);
    update_password = vmfactory<rd.update_password>(schemas.update_password, async (req) => req.body);
    update_username = vmfactory<rd.update_username>(schemas.update_username, async (req) => req.body.username);
    terminate_other_sessions = vmfactory<rd.terminate_other_sessions>(schemas.terminate_other_sessions);
})();

