import { testTheDbForConnection } from "#src/databases/provider/database-orm-adapter.ts";
import { prisma } from "#src/databases/provider/database-connector.ts";
import { startMainServerScript } from "#src/server/server-starter-script.ts";
console.clear();
console.time("in");

await startMainServerScript();
await testTheDbForConnection(prisma);
console.timeEnd("in");
