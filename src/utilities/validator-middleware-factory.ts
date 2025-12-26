import { BadRequestException } from "#/errors/client-side-exceptions.js";
import type { DtoTypeForAuthSession } from "#/types/auth-middleware-shape.js";
import type { z, ZodType } from "zod";
import type { default as ExpressJS } from "express";
/** Factory function for creating an validator middleware for requests */
export function vmFactory<
    RequestType extends ExpressJS.Request & {
        dto?: z.infer<ZodXSchemaType>;
        sessionDto?: DtoTypeForAuthSession;
    },
    ZodXSchemaType extends ZodType = ZodType,
    A extends any = any,
>(schema: ZodXSchemaType, getReqBody?: (req: RequestType) => Promise<A>) {
    return async (req: RequestType, res: ExpressJS.Response, next: ExpressJS.NextFunction) => {
        /**  If schema itself is for undefined. Then body also must be undefined */
        let rawData = undefined;
        if (getReqBody) {
            rawData = await getReqBody(req);
        }
        const parsed = await schema.safeParseAsync(rawData);
        if (parsed.success) {
            req.dto = parsed.data;
            return next();
        }
        const errorList = parsed.error.issues.map(({ path, message }) => {
            return `${path.join(".")} -- ${message}` as const;
        });
        throw new BadRequestException(errorList);
    };
}
