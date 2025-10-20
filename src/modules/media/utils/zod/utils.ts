import { z } from "zod";

/** CUID zod schema */
export const z_cuid_schema = (field_name: string) => {
    const error = `Field for ${field_name} is not valid CUID`;
    return z.cuid({
        error,
    });
};
