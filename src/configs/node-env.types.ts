/** Node env type */
export const NodeEnvs = ["development", "test", "production"] as const;
export type NodeEnv = (typeof NodeEnvs)[number];
