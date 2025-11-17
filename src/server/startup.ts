import { clear, time, timeEnd } from "node:console";
clear();
time("in");
import { test_db } from "#/providers/adapter.js";
import { prisma } from "#/providers/database-connect.js";
import { startMainServer } from "#/server/class.js";

await startMainServer();
await test_db(prisma);
timeEnd("in");
