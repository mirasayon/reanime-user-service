import { envMainConfig } from "#/configs/environment-variables-config.js";
import { Service_Setting } from "#/constants/web-server-constants.js";
import { prisma } from "#/databases/provider/database-connector.js";
import { startListeningTheServer } from "#/utilities/express-core-middlewares.js";
import consola from "consola";
import { format } from "date-fns";
import { chalk, Logger } from "log-it-colored";
import type { AddressInfo } from "node:net";
import { arch, platform } from "node:os";
import { expressMainApplication } from "./server-skeleton.js";
export async function startMainServerScript(): Promise<void> {
    try {
        const instance = await startListeningTheServer(expressMainApplication, envMainConfig.server.host, envMainConfig.server.port);
        const { port, address, family } = instance.address() as AddressInfo;

        const time = format(new Date(), "HH:mm:ss dd.MM.yyyy");
        const url = `http://${envMainConfig.server.host}:${port}`;
        const altUrl = `http://${address}:${port}`;
        Logger.blue(`${Service_Setting.name}. Launched at ${time}`);
        Logger.success(`${family}: ${chalk.magenta(url)} / ${altUrl} ${chalk.magenta(envMainConfig.NODE_ENVIRONMENT)}`);
        Logger.slate(
            "Node.js: " + chalk.bold("v" + process.versions.node) + ". Arch: " + chalk.bold(arch()) + ". Platform: " + chalk.bold(platform()),
        );
        async function shutdownAppAndDb() {
            Logger.slate("Shutting down the server and db connection...");
            return await new Promise<void>((resolve, reject) => {
                try {
                    return instance.close(async () => {
                        await prisma.$disconnect();
                        Logger.slate("Server stopped and db disconnected. Goodbye!");
                        return resolve();
                    });
                } catch (error) {
                    return reject(error);
                }
            });
        }

        process.on("SIGINT", shutdownAppAndDb);
        process.on("SIGTERM", shutdownAppAndDb);
    } catch (error) {
        consola.fatal("Error while starting the server: ");
        throw error;
    }
}
