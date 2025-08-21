import { EnvConfig } from "#/configs/environment.js";
import { create_client } from "./adapter.js";
/** Prisma Client Instance Type */
export type PrismaClientType = ReturnType<typeof create_client>;
declare global {
    /** Declared type for singleton Prisma Client  */
    var _prisma_client_global_: PrismaClientType | undefined;
}
/** Global prisma client for all of application */
const prisma = globalThis._prisma_client_global_ || create_client();

if (!EnvConfig.mode.prod) {
    globalThis._prisma_client_global_ = prisma;
}
export { prisma };

