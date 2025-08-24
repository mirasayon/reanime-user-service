import type { AddressInfo } from "node:net";
import { chalk, Logger } from "log-it-colored";
import { EnvConfig } from "#/configs/environment-variables.js";
import { format } from "date-fns";
import { Service_Setting } from "#/configs/settings.js";
import consola from "consola";
import { prisma } from "#/providers/database-connect.js";
import { expressMainApplication as app } from "./server.js";
import { listen } from "#/utils/tools/express.js";

export const start = async (): Promise<void> => {
    try {
        const instance = await listen(app, EnvConfig.server);
        const { port, address, family } = instance.address() as AddressInfo;

        const time = format(new Date(), "HH:mm:ss dd.MM.yyyy");
        const url = `http://${EnvConfig.server.host}:${port}`;
        const altUrl = `http://${address}:${port}`;

        Logger.blue(`${Service_Setting.name}. Launched at ${time}`);
        Logger.success(`${family}: ${chalk.magenta(url)} / ${altUrl} ${chalk.magenta(EnvConfig.NODE_ENVIRONMENT)}`);

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

