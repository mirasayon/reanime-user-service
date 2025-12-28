import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const dirnamePath = dirname(fileURLToPath(import.meta.url));

/** `./prisma` */
const prismaPath = join(dirnamePath, "..");

/** root `./` */
const rootPath = join(prismaPath, "..");

export const mainPrismaPathConfig = {
  schema: join(prismaPath, "schemas", "main.prisma"),
  migrationsPath: join(prismaPath, "migrations"),
  viewsPath: join(prismaPath, "views"),
  typedSqlPath: join(prismaPath, "queries"),
  devEnvFilePath: join(rootPath, ".env.development"),
  testEnvFilePath: join(rootPath, ".env.test"),
  prodEnvFilePath: join(rootPath, ".env.production"),
};
