import { prisma } from "#src/provider/database-connector.ts";
import { testTheDbForConnection } from "#src/provider/database-orm-adapter.ts";
import { startMainServerScript } from "#src/server/server-starter-script.ts";
console.clear();
console.time("in");

await startMainServerScript();
await testTheDbForConnection(prisma);
console.timeEnd("in");
