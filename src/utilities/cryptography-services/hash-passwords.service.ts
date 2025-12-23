// hashing-service.ts
import { envMainConfig } from "#/configs/environment-variables-config.js";
import { argon2, randomBytes, timingSafeEqual, type Argon2Parameters } from "node:crypto";
type Argon2idDefaultsParameters = Omit<Argon2idHashResult, "hash_base64" | "salt_base64">;
export type Argon2idHashResult = {
    /**
     * Полученный хэш пароля в формате base64.
     */
    hash_base64: string;
    /**
     * Соль в формате base64.
     */
    salt_base64: string;
    /**
     * Параметры Argon2id. Memory — в KiB.
     */
    memory: number;
    /**
     * Параметры Argon2id. Passes — количество проходов.
     */
    passes: number;
    /**
     * Параметры Argon2id. Parallelism — количество параллельных процессов.
     */
    parallelism: number;
    /**
     * Параметры Argon2id. TagLength — длина тега в байтах.
     */
    tag_length: number;
};
class Argon2idHashingService {
    /** Промисифицированный wrapper для callback API */
    private readonly _argon2idPromise = async (parameters: Argon2Parameters): Promise<Buffer<ArrayBuffer>> => {
        return await new Promise((resolve: (derivedKey: Buffer<ArrayBuffer>) => void, reject: (err: Error) => void) => {
            return argon2("argon2id", parameters, (err, derivedKey) => {
                if (err) {
                    return reject(err);
                }
                return resolve(derivedKey);
            });
        });
    };
    /** Параметры по-умолчанию для Argon2id. */
    public readonly _defaultParams: Argon2idDefaultsParameters = {
        parallelism: 2,
        tag_length: 32,
        memory: 65_536, //64 * 1024, KiB = 64 MiB
        passes: 3,
    };
    /** Base64-строка с перцем
     * «перец» (pepper) — это секретный, уникальный для системы фрагмент данных (как пароль), который добавляется к паролю до хеширования вместе с солью, но хранится отдельно и более защищённо (например, в аппаратном модуле)
     */
    private _pepper: string;
    constructor() {
        const pepper = envMainConfig.passwordHashPepper;
        if (!pepper) {
            throw new Error("Hashing passwords pepper required");
        }
        this._pepper = pepper;
    }
    /**
     * Хэширует пароль и возвращает объект, который потом можно сохранить в БД.
     * derivedB64 и saltB64 — base64-строки.
     */
    hashPasswordArgon2id = async (password: string): Promise<Argon2idHashResult> => {
        const salt = randomBytes(16);
        const params: Argon2Parameters = {
            message: Buffer.from(password, "utf8"),
            secret: Buffer.from(this._pepper, "base64"),
            nonce: salt,
            parallelism: this._defaultParams.parallelism,
            tagLength: this._defaultParams.tag_length,
            memory: this._defaultParams.memory,
            passes: this._defaultParams.passes,
        };

        const derived = await this._argon2idPromise(params); // Buffer

        return {
            hash_base64: derived.toString("base64"), // сохраняем в DB
            salt_base64: salt.toString("base64"),
            memory: params.memory,
            passes: params.passes,
            parallelism: params.parallelism,
            tag_length: params.tagLength,
        } satisfies Argon2idHashResult;
    };

    /**
     * Проверка: принимает candidate password и объект, как из БД.
     * Возвращает `true`/`false`.
     */
    verifyPasswordWithStored = async ({ password, stored }: { password: string; stored: Argon2idHashResult }): Promise<boolean> => {
        /** Пароль из БД в формате base64. */
        const storedDerived = Buffer.from(stored.hash_base64, "base64");

        const params: Argon2Parameters = {
            message: Buffer.from(password, "utf8"),
            nonce: Buffer.from(stored.salt_base64, "base64"),
            parallelism: stored.parallelism,
            tagLength: stored.tag_length,
            memory: stored.memory,
            passes: stored.passes,
            secret: Buffer.from(this._pepper, "base64"),
        };

        /**  Введённый пароль в формате base64. */
        const derived = await this._argon2idPromise(params);
        // timingSafeEqual бросит, если длины разные -> сначала проверяем длину
        if (derived.length !== storedDerived.length) {
            return false;
        }
        return timingSafeEqual(derived, storedDerived);
    };
}
export const passwordHashingService = new Argon2idHashingService();
