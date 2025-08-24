/** Node env type */
export const NodeEnvs = ["development", "test", "production"] as const;
export type NodeEnv = (typeof NodeEnvs)[number];
/** Working mode */
export type TypeServerWorkMode = { dev: boolean; test: boolean; prod: boolean };

