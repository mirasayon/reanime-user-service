import { BadRequestException } from "#src/errors/client-side-exceptions.ts";
import type { DtoTypeForAuthSession } from "#src/types/auth-middleware-shape.ts";
import { z, type ZodType } from "zod";
import type ExpressJS from "express";
/** Factory function for creating an validator middleware for requests */
export function validatorMiddlewareFactory<
    RequestType extends ExpressJS.Request & {
        dto?: z.infer<ZodXSchemaType>;
        sessionDto?: DtoTypeForAuthSession;
    },
    ZodXSchemaType extends ZodType = ZodType,
    A extends any = any,
>(schema: ZodXSchemaType, getReqBody?: (req: RequestType) => A) {
    return async (req: RequestType, res: ExpressJS.Response, next: ExpressJS.NextFunction) => {
        /**  If schema itself is for undefined. Then body also must be undefined */
        let rawData = undefined;
        if (getReqBody) {
            rawData = getReqBody(req);
        }
        const parsed = await schema.safeParseAsync(rawData);
        if (parsed.success) {
            req.dto = parsed.data;
            return next();
        }
        const errorList: string[] = parsed.error.issues.map(({ path, message }) => {
            return `${path.join(".")}: ${message}`;
        });
        throw new BadRequestException(errorList);
    };
}
