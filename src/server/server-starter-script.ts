import { envConfig } from "#src/configs/env-variables-config.ts";
import { appConstants } from "#src/constants/web-server-constants.ts";
import { prisma } from "#src/provider/database-connector.ts";
import { startListeningTheServer } from "#src/utilities/express-core-middlewares.ts";
import consola from "consola";
import { format } from "date-fns";
import { chalk, Logger } from "log-it-colored";
import type { AddressInfo } from "node:net";
import { arch, platform } from "node:os";
import { expressMainApplication } from "./server-skeleton.ts";
export async function startMainServerScript(): Promise<void> {
    try {
        const instance = await startListeningTheServer(expressMainApplication, envConfig.server.host, envConfig.server.port);
        const { port, address, family } = instance.address() as AddressInfo;

        const time = format(new Date(), "HH:mm:ss dd.MM.yyyy");
        const url = `http://${envConfig.server.host}:${envConfig.server.port}`;
        const altUrl = `http://${address}:${port}`;
        Logger.blue(`${appConstants.name}. Launched at ${time}`);
        Logger.success(`${family}: ${chalk.magenta(url)} / ${altUrl} ${chalk.magenta(envConfig.NODE_ENV)}`);
        const runtimeInfo = detectServerRuntime();
        Logger.slate(
            `Runtime: ${runtimeInfo.runtime}${runtimeInfo.version ? "@" + runtimeInfo.version : ""}` +
                ". Arch: " +
                chalk.bold(arch()) +
                ". Platform: " +
                chalk.bold(platform()),
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

type RuntimeName = "bun" | "deno" | "node" | "edge-runtime" | "unknown";

type RuntimeInfo = {
    runtime: RuntimeName;
    version: string | null; // e.g. "20.11.0", "0.4.0", ...
};

/**
 * Detect server runtime and return its version when available.
 */
export function detectServerRuntime(): RuntimeInfo {
    // Bun (check first because Bun may expose node-like process.versions)
    if (typeof process !== "undefined" && (process as any).versions?.bun) {
        return { runtime: "bun", version: String((process as any).versions.bun) };
    }
    if (typeof (globalThis as any).Bun !== "undefined") {
        const v = (globalThis as any).Bun?.version ?? (globalThis as any).Bun?.version?.toString?.();
        return { runtime: "bun", version: v ? String(v) : null };
    }

    // Deno
    if (typeof (globalThis as any).Deno !== "undefined") {
        const v = (globalThis as any).Deno?.version?.deno ?? (globalThis as any).Deno?.version?.toString?.();
        return { runtime: "deno", version: v ? String(v) : null };
    }

    // Node
    if (typeof process !== "undefined" && process.versions?.node) {
        return { runtime: "node", version: String(process.versions.node) };
    }

    // Edge-like runtimes (some expose EdgeRuntime or similar globals)
    if (typeof (globalThis as any).EdgeRuntime !== "undefined") {
        const v = (globalThis as any).EdgeRuntime?.version ?? undefined;
        return { runtime: "edge-runtime", version: v ? String(v) : null };
    }

    return { runtime: "unknown", version: null };
}
