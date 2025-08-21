import { cryptoConfig } from "#/configs/crypto.config.js";
import bcryptjs from "bcryptjs";

/** Bcrypt service */
export const bcryptjsService = new (class App_Bcrypt_Service {
    /** Salting rounds for creating hash */
    private readonly salt = cryptoConfig.saltRounds;
    /**
     *
     * Compares user inputted password with its hash from the DB
     * @param raw_password raw passord string from user input
     * @param password_hash hash from password that stored in the DB
     * @returns `true` if inputted password is correct. `false` otherwise.
     */
    compare_raw_to_hash = async (raw_password: string, password_hash: string) => {
        return await bcryptjs.compare(raw_password, password_hash);
    };

    /**
     * Creates password's hash from raw password.
     * @param raw_password raw password that user inputted
     * @returns Password's hash
     */
    create_hash = async (raw_password: string) => {
        const hashPassword = await bcryptjs.hash(raw_password, this.salt);
        return hashPassword;
    };
})();

