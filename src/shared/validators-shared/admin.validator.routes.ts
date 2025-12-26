import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import type { z } from "zod";

export const administratorSectionValidatorSchemas = {
    get_all_users: zodUtilSchemas.void,
};

/** Request Validator DTO Types */
export namespace dto {
    export type get_all_users = z.infer<(typeof administratorSectionValidatorSchemas)["get_all_users"]>;
}
