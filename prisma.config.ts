import { dirname, join } from "node:path";
import { env } from "prisma/config";
import { fileURLToPath } from "node:url";
import type { PrismaConfig } from "prisma";
/** root `./` */
const _dirname = dirname(fileURLToPath(import.meta.url));
/** . / prisma */
const db_path = join(_dirname, "prisma");
export default {
    schema: join(db_path, "schemas", "main.prisma"),
    datasource: {
        url: env("DATABASE_SERVER_CONNECTION_URL"),
    },
    migrations: {
        path: join(db_path, "migrations"),
    },
    views: {
        path: join(db_path, "views"),
    },
    typedSql: {
        path: join(db_path, "queries"),
    },
} satisfies PrismaConfig;
