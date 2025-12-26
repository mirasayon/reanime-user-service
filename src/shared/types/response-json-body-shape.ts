import type { I_UserServiceResponseStatusCodes, responseHTTPCodes } from "../response-codes-constants.shared.js";

/** Тип, представляющий стандартную структуру JSON-ответа.
 * @typeParam Data - Тип данных, включённые в поле `{data}` */
export interface HTTPResponseBodyPattern<Data> {
    data: Data | null;
    errors: string[];
    /** `true` если запрос успешный, `false` если нет */
    ok: boolean;
    message: string;
    response_code: responseHTTPCodes;
    status_code: I_UserServiceResponseStatusCodes;
}

export type BodyOptionalMessage = { message?: string };
export type BodyOptionalMessageAndErrors = { errors: string[]; message?: string };
export type BodyOptionalMessageAndData<DATA> = { data: DATA | undefined; message?: string };
