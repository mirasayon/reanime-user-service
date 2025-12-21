import { test_db } from "#/databases/providers/adapter.js";
import { prisma } from "#/databases/providers/database-connect.js";
import { startMainServerScript } from "#/server/server-starter-script.js";
import { clear, time, timeEnd } from "node:console";
clear();
time("in");

await startMainServerScript();
await test_db(prisma);
timeEnd("in");
