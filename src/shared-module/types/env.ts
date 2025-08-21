/** Node env type */
export type NodeEnv = "development" | "test" | "production";
export const NodeEnvs = ["development", "test", "production"] as const;
/** Working mode */
export type WorkingMode = { dev: boolean; test: boolean; prod: boolean };

