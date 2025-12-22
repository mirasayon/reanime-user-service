import type { I_UserServiceResponseStatusCodes, ResponseHTTPCodes } from "../../shared/constants/response.constants.js";

/** Тип, представляющий стандартную структуру JSON-ответа.
 * @typeParam Data - Тип данных, включённые в поле `{data}` */
export interface HTTPResponseBodyPattern<Data> {
    data: Data | null;
    errors: string[];
    /** `true` если запрос успешный, `false` если нет */
    ok: boolean;
    message: string;
    response_code: ResponseHTTPCodes;
    status_code: I_UserServiceResponseStatusCodes;
}

export type optionalMessage = { message?: string };
export type optionalMessageAndErrors = { errors: string[]; message?: string };
export type optionalMessageAndData<DATA> = { data: DATA | undefined; message?: string };
