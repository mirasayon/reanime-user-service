export const userServiceHttpResponseConventionalCodes = {
    OK: "OK",
    CREATED: "CREATED",
    ACCEPTED: "ACCEPTED",
    BAD_REQUEST: "BAD_REQUEST",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    USE_SECURE_HTTP: "USE_SECURE_HTTP",
    NOT_FOUND: "NOT_FOUND",
    CONFLICT: "CONFLICT",
    BAD_GATEWAY: "BAD_GATEWAY",
    PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
    TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
    NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
    UNEXPECTED_INTERNAL_ERROR: "UNEXPECTED_INTERNAL_ERROR",
    EXPECTED_INTERNAL_ERROR: "EXPECTED_INTERNAL_ERROR",
    SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
    I_AM_A_TEAPOT: "I_AM_A_TEAPOT",
} as const;
export type UserServiceHttpResponseConventionalCodeType =
    (typeof userServiceHttpResponseConventionalCodes)[keyof typeof userServiceHttpResponseConventionalCodes];

export const userServiceHttpResponseStatusCodes = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    PAYLOAD_TOO_LARGE: 413,
    TOO_MANY_REQUESTS: 429,
    NOT_IMPLEMENTED: 501,
    UNEXPECTED_INTERNAL_ERROR: 500,
    USE_SECURE_HTTP: 426,
    EXPECTED_INTERNAL_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    MEDIA_SERVICE_NOT_AVAILABLE: 503,
    MEDIA_SERVICE_ERROR: 503,
    BAD_GATEWAY: 502,
    I_AM_A_TEAPOT: 418,
} as const;

export type UserServiceHttpResponseStatusCodeType = (typeof userServiceHttpResponseStatusCodes)[keyof typeof userServiceHttpResponseStatusCodes];

/** Тип, представляющий стандартную структуру JSON-ответа.
 * @typeParam Data - Тип данных, включённые в поле `{data}` */
export interface UserServiceHttpResponseBodyPatternType<Data> {
    data: Data | null;
    errors: string[];
    /** `true` если запрос успешный, `false` если нет */
    ok: boolean;
    message: string;
    response_code: UserServiceHttpResponseConventionalCodeType;
    status_code: UserServiceHttpResponseStatusCodeType;
}

export type BodyOptionalMessage = { message?: string };
export type BodyOptionalMessageAndErrors = { errors: string[]; message?: string };
export type BodyOptionalMessageAndData<DATA> = { data: DATA | undefined; message?: string };
