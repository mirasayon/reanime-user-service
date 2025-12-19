import { keysPrivateKey, keysPublicKey } from "#/configs/paths.config.js";
import { ForbiddenException, UnauthorizedException } from "#/modules/errors/client-side/exceptions.js";
import { UnexpectedInternalServerErrorException } from "#/modules/errors/server-side/exceptions.js";
import type { iObjectCuid } from "#/shared/types/inputs/informative.types.js";
import { constants, privateDecrypt, publicEncrypt, randomBytes } from "node:crypto";

export const sessionTokenHashService = new (class Authentication_Session_Token_Util {
    create_session_token = (account_id: iObjectCuid): `${string}_${string}` => {
        try {
            const rand = randomBytes(32).toString("hex"); // randomBytes(32) => 64 chars of length
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
            throw new UnexpectedInternalServerErrorException({
                errorMessageToClient: "Ошибка генерации токена сеанса",
                errorItselfOrPrivateMessageToServer: "Error while generating session token: " + _error,
                service_name: this.create_session_token.name,
            });
        }
    };
    decrypt_session_token = (
        raw: string,
    ): {
        session_token: string;
        account_id: string;
    } => {
        try {
            if (!raw) {
                throw new UnauthorizedException(["Токен сеанса отсутствует"]);
            }

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
            const account_id = decrypted.toString("utf-8");
            return { session_token, account_id };
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new ForbiddenException(["Токен сеанса поддельный"]);
        }
    };
})();
