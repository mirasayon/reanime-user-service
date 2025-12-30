import { PrismaClient } from "#orm";
import consola from "consola";
import { PrismaPg } from "@prisma/adapter-pg";
import { envConfig } from "#src/configs/env-variables-config.ts";

export type PrismaClientType = ReturnType<typeof createPrismaClient>;
export function createPrismaClient() {
    try {
        const adapter = new PrismaPg({ connectionString: envConfig.databaseUrl });
        return new PrismaClient({ adapter });
    } catch (error) {
        consola.fail("Error with creating Prisma client");
        throw error;
    }
}
