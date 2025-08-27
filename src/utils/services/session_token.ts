import type { iObjectCuid } from "#/shared/types/inputs/informative.types.js";
import consola from "consola";
import { InternalServerErrorException } from "#/modules/errors/server-side/exceptions.js";
import { ForbiddenException, UnauthorizedException } from "#/modules/errors/client-side/exceptions.js";
import { publicEncrypt, randomBytes, constants, privateDecrypt } from "node:crypto";
import { keysPrivateKey, keysPublicKey } from "#/configs/paths.config.js";

export const authentication_Session_Token_Util = new (class Authentication_Session_Token_Util {
    create_session_token = (account_id: iObjectCuid) => {
        try {
            const rand = randomBytes(32).toString("hex"); // randomBytes(32) => 64 chars of lenght
            const buffer = Buffer.from(account_id, "utf-8");
            const salt = publicEncrypt(
                {
                    key: keysPublicKey,
                    padding: constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha256",
                },
                buffer,
            ).toString("hex");
            const token = `${rand}_${salt}` as const;
            return token;
        } catch (_error) {
            consola.error("Error while generating session token: ", _error);
            throw new InternalServerErrorException("Ошибка генерации токена сеанса");
        }
    };
    decrypt_session_token(raw: string) {
        try {
            const [session_token, encryptedBase64] = raw.split("_");
            if (!session_token || !encryptedBase64) {
                throw new UnauthorizedException(["Неверный формат токена сеанса или токен сеанса отсутствует"]);
            }
            const buffer = Buffer.from(encryptedBase64, "hex");
            const decrypted = privateDecrypt(
                {
                    key: keysPrivateKey,
                    padding: constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha256",
                },
                buffer,
            );
            const accound_id = decrypted.toString("utf-8");
            return { session_token, accound_id };
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new ForbiddenException(["Токен сеанса поддельный"]);
        }
    }
})();

