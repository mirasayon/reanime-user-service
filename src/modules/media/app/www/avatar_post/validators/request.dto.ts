import { IsString } from "class-validator";
import { IsCUID } from "../../../../utils/zod/class_validator_adapted.js";

/** Set Avatar */
export class avatar_set_ReqDTO {
    @IsString()
    @IsCUID()
    profile_id!: string;
}

/** Update Avatar */
export class avatar_update_ReqDTO {
    @IsString()
    @IsCUID()
    profile_id!: string;
}
