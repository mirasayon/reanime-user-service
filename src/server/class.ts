import type { AddressInfo } from "node:net";
import type e from "express";
import { Logger } from "@xamarin.city/reanime/tools/logger/chalk.js";
import { cEnv } from "#/configs/environment.js";
import { format } from "date-fns";
import { Service_Setting } from "#/configs/settings.js";
import consola from "consola";
import { prisma } from "#/db/connect.js";
import { Express_Main_Server } from "./server.js";

export const Startup_Server = new (class Startup_Server {
    constructor(private readonly app: e.Application) {}

    /**
     * Starts the server and returns the instance
     * @param port Port number
     * @param host Hostname
     */
    private readonly listen = (port: number, host: string): Promise<ReturnType<e.Application["listen"]>> => {
        return new Promise((resolve, reject) => {
            const server = this.app.listen({ port, host }, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve(server);
            });
        });
    };

    /**
     * Initializes and starts the server
     */
    public readonly start = async (): Promise<void> => {
        try {
            const instance = await this.listen(
                cEnv.config_for_this_server.server.port,
                cEnv.config_for_this_server.server.host,
            );
            const { port, address, family } = instance.address() as AddressInfo;

            const time = format(new Date(), "HH:mm:ss dd.MM.yyyy");
            const url = `http://${cEnv.config_for_this_server.server.host}:${port}`;
            const altUrl = `http://${address}:${port}`;

            Logger.blue(`${Service_Setting.name}. Launched at ${time}`);
            Logger.success(
                `${family}: ${Logger.chalk.magenta(url)} / ${altUrl} ${Logger.chalk.magenta(cEnv.NODE_ENVIRONMENT)}`,
            );

            const shutdown = async () => {
                Logger.sky("Shutting down...");
                await prisma.$disconnect();
                Logger.sky("db disconnected");
                instance.close(() => process.exit(0));
            };

            process.on("SIGINT", shutdown);
            process.on("SIGTERM", shutdown);
        } catch (error) {
            consola.error("Error while starting the server: ");
            throw error;
        }
    };
})(Express_Main_Server);
