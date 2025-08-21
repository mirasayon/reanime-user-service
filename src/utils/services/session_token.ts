import { PathsConfig } from "#/configs/paths.js";
import type { ObjectCuid } from "%/types/inputs/infotype.js";
import consola from "consola";
import { InternalServerErrorException } from "%/errors/server-side/exceptions.js";
import { ForbiddenException } from "%/errors/client-side/exceptions.js";
import { publicEncrypt, randomBytes, constants, privateDecrypt } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
export const authentication_Session_Token_Util = new (class Authentication_Session_Token_Util {
    private readonly publicKey = readFileSync(join(PathsConfig.root, "public.pem"), { encoding: "utf-8" });
    private readonly privateKey = readFileSync(join(PathsConfig.root, "private.pem"), { encoding: "utf-8" });

    create_session_token = (account_id: ObjectCuid) => {
        try {
            const rand = randomBytes(32).toString("hex"); // randomBytes(32) => 64 chars of lenght
            const buffer = Buffer.from(account_id, "utf-8");
            const salt = publicEncrypt(
                {
                    key: this.publicKey,
                    padding: constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha256",
                },
                buffer,
            ).toString("hex");
            const token = `${rand}_${salt}` as const;
            return token;
        } catch (error) {
            consola.error("Error while generating session token: ", error);
            throw new InternalServerErrorException("Error while generating session token");
        }
    };
    decrypt_session_token(raw: string) {
        try {
            const encryptedBase64 = raw.split("_")[1];
            const session_token = raw.split("_")[0];
            const buffer = Buffer.from(encryptedBase64, "hex");
            const decrypted = privateDecrypt(
                {
                    key: this.privateKey,
                    padding: constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha256",
                },
                buffer,
            );
            const accound_id = decrypted.toString("utf-8");
            return { session_token, accound_id };
        } catch (error) {
            throw new ForbiddenException(["Токен сеанса поддельный"]);
        }
    }
})();

