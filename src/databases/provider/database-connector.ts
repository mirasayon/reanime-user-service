import { envMainConfig } from "#/configs/environment-variables-config.js";
import { createMainPrismaClient, type PrismaClientType } from "./database-orm-adapter.js";
declare global {
    /** Declared type for singleton Prisma Client  */
    var _prisma_client_global_: PrismaClientType | undefined;
}
/** Global prisma client for all of application */
const prisma = globalThis._prisma_client_global_ || createMainPrismaClient();

if (!envMainConfig.is_prod) {
    globalThis._prisma_client_global_ = prisma;
}
export { prisma };
