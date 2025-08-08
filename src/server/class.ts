import type { AddressInfo } from "node:net";
import { chalk, Logger } from "@reanime.art/user-service/logger/chalk.js";
import { cEnv } from "#/configs/environment.js";
import { format } from "date-fns";
import { Service_Setting } from "#/configs/settings.js";
import consola from "consola";
import { prisma } from "#/db/connect.js";
import { Express_Main_Server as app } from "./server.js";
import { listen } from "#/utils/tools/express.js";

export const start = async (): Promise<void> => {
    try {
        const instance = await listen(app, cEnv.config_for_this_server.server);
        const { port, address, family } = instance.address() as AddressInfo;

        const time = format(new Date(), "HH:mm:ss dd.MM.yyyy");
        const url = `http://${cEnv.config_for_this_server.server.host}:${port}`;
        const altUrl = `http://${address}:${port}`;

        Logger.blue(`${Service_Setting.name}. Launched at ${time}`);
        Logger.success(`${family}: ${chalk.magenta(url)} / ${altUrl} ${chalk.magenta(cEnv.NODE_ENVIRONMENT)}`);

        const shutdown = async () => {
            instance.close(() => {
                // process.exit(0);
            });
            Logger.sky("Shutting down...");
            await prisma.$disconnect().then(() => Logger.sky("db disconnected"));
        };

        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);
    } catch (error) {
        consola.error("Error while starting the server: ");
        throw error;
    }
};

