import { zodUtilSchemas } from "./validator-utils-shared/common-validator-utils.js";
import { z } from "zod";

const schemas = new (class Administrator_ValidatorSchemas {
    get_all_users = zodUtilSchemas.void;
})();
export { schemas as administrator_schemas };
export type Schemas = typeof schemas;
/** Request Validator DTO Types */
export namespace dto {
    export type get_all_users = z.infer<Schemas["get_all_users"]>;
}
