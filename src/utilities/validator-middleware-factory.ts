import { BadRequestException } from "#/errors/client-side-exceptions.js";
import type { AuthMiddlewareDTO } from "#/types/auth-middleware-shape.js";
import type { z, ZodType } from "zod";
import type { default as ExpressJS } from "express";
/** Функция-фабрика для создания промежуточного обработчика запроса валидатором */
export function vmFactory<
    RequestType extends ExpressJS.Request & {
        dto?: z.infer<Zod_x_Schema_type>;
        sessionDto?: AuthMiddlewareDTO;
    },
    Zod_x_Schema_type extends ZodType = ZodType,
    A extends any = any,
>(schema: Zod_x_Schema_type, get_req_body?: (req: RequestType) => Promise<A>) {
    return async (req: RequestType, res: ExpressJS.Response, next: ExpressJS.NextFunction) => {
        /**  If schema itself is for undefined. Then body also must be undefined */
        let rawData = undefined;
        if (get_req_body) {
            rawData = await get_req_body(req);
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
