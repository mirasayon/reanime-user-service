import { testTheDbForConnection } from "#/databases/provider/database-orm-adapter.js";
import { prisma } from "#/databases/provider/database-connector.js";
import { startMainServerScript } from "#/server/server-starter-script.js";
console.clear();
console.time("in");

await startMainServerScript();
await testTheDbForConnection(prisma);
console.timeEnd("in");
