import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
export const _dirname_ = dirname(fileURLToPath(import.meta.url));
/** Root dirname */
export const rootDirname = join(_dirname_, "..");
