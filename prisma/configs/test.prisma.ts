import { loadEnvFile } from "node:process";
import type { PrismaConfig } from "prisma";
import { mainPrismaPathConfig } from "./paths-config.ts";

loadEnvFile(mainPrismaPathConfig.testEnvFilePath);

export default {
    schema: mainPrismaPathConfig.schema,
    datasource: {
        url: process.env["DATABASE_URL"],
    },
    migrations: {
        path: mainPrismaPathConfig.migrationsPath,
    },
    views: {
        path: mainPrismaPathConfig.viewsPath,
    },
    typedSql: {
        path: mainPrismaPathConfig.typedSqlPath,
    },
} satisfies PrismaConfig;
