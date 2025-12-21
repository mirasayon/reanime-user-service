import { default as ExpressJS } from "express";
export const ControllerUtils = new (class ControllerUtilsFunctions {
    /** Returns an Error if dto is not full */
    check_dto_for_validity = <CustomReq extends ExpressJS.Request>(req: CustomReq, dtos: string[]) => {
        for (const neededDto of dtos) {
            if (!Object.hasOwn(req, neededDto)) {
                throw new Error(`Нет dto: ${neededDto} в теле запроса`);
            }
        }
        return req as Required<CustomReq>;
    };
})();
