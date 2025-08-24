console.clear();
console.time("in");
import { test_db } from "#/providers/adapter.js";
import { prisma } from "#/providers/database-connect.js";
import { start } from "#/server/class.js";
import { ControllerUtils } from "#/utils/controller.js";

await start();
await test_db(prisma);
await ControllerUtils.check_the_media_service();
console.timeEnd("in");

