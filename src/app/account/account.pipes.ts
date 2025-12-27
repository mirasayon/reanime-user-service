import { validatorMiddlewareFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { accountSectionSchemas, type AccountSectionReqDtos } from "#/shared/request-validator-for-all.routes.js";

export namespace accountSectionReqFullDtos {
    export type explore_me = RequestDtoTypeFactory<AccountSectionReqDtos.explore_me>;
    export type update_email = RequestDtoTypeFactory<AccountSectionReqDtos.update_email>;
    export type set_email = RequestDtoTypeFactory<AccountSectionReqDtos.set_email>;
    export type update_password = RequestDtoTypeFactory<AccountSectionReqDtos.update_password>;
    export type update_username = RequestDtoTypeFactory<AccountSectionReqDtos.update_username>;
    export type get_sessions = RequestDtoTypeFactory<AccountSectionReqDtos.get_sessions>;
    export type terminate_other_sessions = RequestDtoTypeFactory<AccountSectionReqDtos.terminate_other_sessions>;
    export type terminate_specific_session = RequestDtoTypeFactory<AccountSectionReqDtos.terminate_specific_session, { session_id: string }>;
    export type delete_account = RequestDtoTypeFactory<AccountSectionReqDtos.delete_account>;
}
export const accountSectionReqPipes = new (class Account_ReqPipes {
    explore_me = validatorMiddlewareFactory<accountSectionReqFullDtos.explore_me>(accountSectionSchemas.explore_me);
    get_sessions = validatorMiddlewareFactory<accountSectionReqFullDtos.get_sessions>(accountSectionSchemas.get_sessions);
    delete_account = validatorMiddlewareFactory<accountSectionReqFullDtos.delete_account>(accountSectionSchemas.delete_account);
    update_email = validatorMiddlewareFactory<accountSectionReqFullDtos.update_email>(accountSectionSchemas.update_email, async (req) => req.body);
    set_email = validatorMiddlewareFactory<accountSectionReqFullDtos.set_email>(accountSectionSchemas.set_email, async (req) => req.body.email);
    update_password = validatorMiddlewareFactory<accountSectionReqFullDtos.update_password>(
        accountSectionSchemas.update_password,
        async (req) => req.body,
    );
    update_username = validatorMiddlewareFactory<accountSectionReqFullDtos.update_username>(
        accountSectionSchemas.update_username,
        async (req) => req.body.username,
    );
    terminate_other_sessions = validatorMiddlewareFactory<accountSectionReqFullDtos.terminate_other_sessions>(
        accountSectionSchemas.terminate_other_sessions,
    );
    terminate_specific_session = validatorMiddlewareFactory<accountSectionReqFullDtos.terminate_specific_session>(
        accountSectionSchemas.terminate_specific_session,
        async (req) => req.params.session_id,
    );
})();
