console.clear();
console.time("in");
import { test_db } from "#/providers/adapter.js";
import { prisma } from "#/providers/database-connect.js";
import { start } from "#/server/class.js";

await start();
await test_db(prisma);
console.timeEnd("in");
