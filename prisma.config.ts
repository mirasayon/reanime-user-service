import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { PrismaConfig } from "prisma";
/** root `./` */
const _dirname = dirname(fileURLToPath(import.meta.url));
/** root / src / db */
const db_path = join(_dirname, "src", "databases");
export default {
    schema: join(db_path, "schemas", "schema.prisma"),
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
