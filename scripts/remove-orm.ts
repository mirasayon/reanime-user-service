import { join } from "node:path";
import { dirnamePath } from "./dirname.ts";
import { removeFolder } from "./remove-folder.ts";

const ORM_FOLDER = join(dirnamePath, "..", "prisma", "client");

await removeFolder(ORM_FOLDER);
