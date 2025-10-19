import { PrismaClient } from "#/databases/orm/client.js";
import consola from "consola";
import type { PrismaClientType } from "./database-connect.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { EnvConfig } from "#/configs/environment-variables.js";
/** Tests for connection for the DB instance */
export const test_db = async (db: PrismaClientType) => {
    try {
        consola.success("Connected to the database successfully");
        const res = await db.$executeRaw`SELECT 1`;
        return consola.success("Database is working properly: ", `"SELECT 1" -> ${res}`);
    } catch (error) {
        consola.fail("Database ping failure: ");
        throw error;
    }
};
/** Creates new Prisma Client */
export const create_client = () => {
    try {
        const adapter = new PrismaPg({ connectionString: EnvConfig.dbConnectionUrl });
        return new PrismaClient({ adapter });
    } catch (error) {
        consola.fail("Error while creating Prisma Client instance: ");
        throw error;
    }
};
