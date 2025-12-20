import type { I_UserServiceResponseStatusCodes, ResponseHTTPCodes } from "../../shared/constants/response.constants.js";

/**
 * Type representing the standard JSON response structure
 * @template Data - The type of data included in the response
 */
export interface HTTPResponseBodyPattern<DATA> {
    data: DATA | null;
    errors: string[];
    ok: boolean;
    message: string;
    response_code: ResponseHTTPCodes;
    status_code: I_UserServiceResponseStatusCodes;
}

export type optionalMessage = { message?: string };
export type optionalMessageAndErrors = { errors: string[]; message?: string };
export type optionalMessageAndData<DATA> = { data: DATA | undefined; message?: string };
