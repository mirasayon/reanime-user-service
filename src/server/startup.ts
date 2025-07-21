console.time("in");
console.clear();
import { prisma_client_util } from "#/db/adapter.js";
import { prisma } from "#/db/connect.js";
import { Startup_Server as server } from "#/server/class.js";
import { ControllerUtils } from "#/utils/controller.js";

await server.start();
await prisma_client_util.test_db(prisma);
await ControllerUtils.check_the_media_service();
console.timeEnd("in");
