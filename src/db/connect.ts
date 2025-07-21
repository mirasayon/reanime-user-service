import { cEnv } from "#/configs/environment.js";
import { prisma_client_util } from "./adapter.js";
/** Prisma Client Instance Type */
export type PrismaClientType = ReturnType<typeof prisma_client_util.create_client>;
declare global {
    /** Declared type for singleton Prisma Client  */
    var _prisma_client_global_: PrismaClientType | undefined;
}
/** Global prisma client for all of application */
const prisma = globalThis._prisma_client_global_ || prisma_client_util.create_client();

if (!cEnv.mode.prod) {
    globalThis._prisma_client_global_ = prisma;
}
export { prisma };
