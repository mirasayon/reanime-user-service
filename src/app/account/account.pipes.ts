import { vmFactory } from "#/utilities/validator-middleware-factory.js";
import type { RequestDtoTypeFactory } from "#/types/dto-middleware-shape.js";
import { accountSectionSchemas, type accountSectionReqDtos } from "#/shared/validators-shared/app-validator-for-all.routes.js";

export namespace accountSectionReqFullDtos {
    export type explore_me = RequestDtoTypeFactory<accountSectionReqDtos.explore_me>;
    export type update_email = RequestDtoTypeFactory<accountSectionReqDtos.update_email>;
    export type set_email = RequestDtoTypeFactory<accountSectionReqDtos.set_email>;
    export type update_password = RequestDtoTypeFactory<accountSectionReqDtos.update_password>;
    export type update_username = RequestDtoTypeFactory<accountSectionReqDtos.update_username>;
    export type get_sessions = RequestDtoTypeFactory<accountSectionReqDtos.get_sessions>;
    export type terminate_other_sessions = RequestDtoTypeFactory<accountSectionReqDtos.terminate_other_sessions>;
    export type terminate_specific_session = RequestDtoTypeFactory<accountSectionReqDtos.terminate_specific_session, { session_id: string }>;
    export type delete_account = RequestDtoTypeFactory<accountSectionReqDtos.delete_account>;
}
export const accountSectionReqPipes = new (class Account_ReqPipes {
    explore_me = vmFactory<accountSectionReqFullDtos.explore_me>(accountSectionSchemas.explore_me);
    get_sessions = vmFactory<accountSectionReqFullDtos.get_sessions>(accountSectionSchemas.get_sessions);
    delete_account = vmFactory<accountSectionReqFullDtos.delete_account>(accountSectionSchemas.delete_account);
    update_email = vmFactory<accountSectionReqFullDtos.update_email>(accountSectionSchemas.update_email, async (req) => req.body);
    set_email = vmFactory<accountSectionReqFullDtos.set_email>(accountSectionSchemas.set_email, async (req) => req.body.email);
    update_password = vmFactory<accountSectionReqFullDtos.update_password>(accountSectionSchemas.update_password, async (req) => req.body);
    update_username = vmFactory<accountSectionReqFullDtos.update_username>(accountSectionSchemas.update_username, async (req) => req.body.username);
    terminate_other_sessions = vmFactory<accountSectionReqFullDtos.terminate_other_sessions>(accountSectionSchemas.terminate_other_sessions);
    terminate_specific_session = vmFactory<accountSectionReqFullDtos.terminate_specific_session>(
        accountSectionSchemas.terminate_specific_session,
        async (req) => req.params.session_id,
    );
})();
