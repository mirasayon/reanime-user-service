import { PrismaClient } from "#src/databases/orm/client.ts";
import consola from "consola";
import { PrismaPg } from "@prisma/adapter-pg";
import { envMainConfig } from "#src/configs/environment-variables-config.ts";

/** Prisma Client Instance Type */
export type PrismaClientType = ReturnType<typeof createMainPrismaClient>;
/** Tests for connection for the DB instance */
export async function testTheDbForConnection(db: PrismaClientType) {
    try {
        consola.success("Connected to the database successfully");
        const res = await db.$executeRaw`SELECT 1`;
        return consola.success("Database is working properly: ", `"SELECT 1" -> ${res}`);
    } catch (error) {
        consola.fail("Database ping failure: ");
        throw error;
    }
}
/** Creates new Prisma Client */
export const createMainPrismaClient = () => {
    try {
        const adapter = new PrismaPg({ connectionString: envMainConfig.dbConnectionUrl });
        return new PrismaClient({ adapter });
    } catch (error) {
        consola.fail("Error while creating Prisma Client instance: ");
        throw error;
    }
};
