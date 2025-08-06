import { PathsConfig } from "#/configs/paths.js";
import type { infotype } from "#/types/informative.js";
import consola from "consola";
import { InternalServerErrorException } from "@reanime.art/user-service/user-service/errors/server-side/exceptions.js";
import { ForbiddenException } from "@reanime.art/user-service/user-service/errors/client-side/exceptions.js";
import node_crypto from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
export const authentication_Session_Token_Util = new (class Authentication_Session_Token_Util {
    private readonly publicKey = readFileSync(join(PathsConfig.root, "public.pem"), { encoding: "utf-8" });
    private readonly privateKey = readFileSync(join(PathsConfig.root, "private.pem"), { encoding: "utf-8" });

    create_session_token = (account_id: infotype.Cuid) => {
        try {
            const rand = node_crypto.randomBytes(32).toString("hex"); // randomBytes(32) => 64 chars of lenght
            const buffer = Buffer.from(account_id, "utf-8");
            const salt = node_crypto
                .publicEncrypt(
                    {
                        key: this.publicKey,
                        padding: node_crypto.constants.RSA_PKCS1_OAEP_PADDING,
                        oaepHash: "sha256",
                    },
                    buffer,
                )
                .toString("hex");
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
            const decrypted = node_crypto.privateDecrypt(
                {
                    key: this.privateKey,
                    padding: node_crypto.constants.RSA_PKCS1_OAEP_PADDING,
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

