import { envConfig } from "#src/configs/env-variables-config.ts";
import { createMainPrismaClient, type PrismaClientType } from "./database-orm-adapter.ts";
declare global {
    /** Declared type for singleton Prisma Client  */
    var _prisma_client_global_: PrismaClientType | undefined;
}
/** Global prisma client for all of application */
const prisma = globalThis._prisma_client_global_ || createMainPrismaClient();

if (!envConfig.isProd) {
    globalThis._prisma_client_global_ = prisma;
}
export { prisma };
