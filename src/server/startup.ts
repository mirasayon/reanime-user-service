import { clear, time, timeEnd } from "node:console";
clear();
time("in");
import { test_db } from "#/providers/adapter.js";
import { prisma } from "#/providers/database-connect.js";
import { startThisServer } from "#/server/class.js";

await startThisServer();
await test_db(prisma);
timeEnd("in");
