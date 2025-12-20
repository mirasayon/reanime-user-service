import { test_db } from "#/databases/providers/adapter.js";
import { prisma } from "#/databases/providers/database-connect.js";
import { startMainServer } from "#/server/class.js";
import { clear, time, timeEnd } from "node:console";
clear();
time("in");

await startMainServer();
await test_db(prisma);
timeEnd("in");
