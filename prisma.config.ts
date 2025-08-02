import { dirname, join } from "node:path";
import { env } from "node:process";
import { fileURLToPath } from "node:url";
import type { PrismaConfig } from "prisma";
/** root */
const _dirname = dirname(fileURLToPath(import.meta.url));
/** root / src / db */
const db_path = join(_dirname, "src", "db");
export default {
    schema: join(db_path, "schemas", "prisma", "schema.prisma"),
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
