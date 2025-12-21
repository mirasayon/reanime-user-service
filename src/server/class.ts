import { EnvConfig } from "#/configs/environment-variables.js";
import { Service_Setting } from "#/configs/settings.js";
import { prisma } from "#/databases/providers/database-connect.js";
import { startListeningTheServer } from "#/utils/tools/express.js";
import consola from "consola";
import { format } from "date-fns";
import { chalk, Logger } from "log-it-colored";
import type { AddressInfo } from "node:net";
import { arch, platform } from "os";
import { expressMainApplication } from "./server.js";
export const startMainServer = async (): Promise<void> => {
    try {
        const instance = await startListeningTheServer(expressMainApplication, EnvConfig.server);
        const { port, address, family } = instance.address() as AddressInfo;

        const time = format(new Date(), "HH:mm:ss dd.MM.yyyy");
        const url = `http://${EnvConfig.server.host}:${port}`;
        const altUrl = `http://${address}:${port}`;

        Logger.blue(`${Service_Setting.name}. Launched at ${time}`);
        Logger.success(`${family}: ${chalk.magenta(url)} / ${altUrl} ${chalk.magenta(EnvConfig.NODE_ENVIRONMENT)}`);

        Logger.slate(
            "Node.js: " + chalk.bold("v" + process.versions.node) + ". CpuArch: " + chalk.bold(arch()) + ". Platform: " + chalk.bold(platform()),
        );
        const shutdown = async () => {
            instance.close(() => {});
            Logger.sky("Shutting down...");
            await prisma.$disconnect().then(() => Logger.sky("db disconnected"));
        };

        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);
    } catch (error) {
        consola.fatal("Error while starting the server: ");
        throw error;
    }
};
