import { join } from "node:path";
import { dirnamePath } from "./dirname.ts";
import { removeFolder } from "./remove-folder.ts";

const ORM_FOLDER = join(dirnamePath, "..", "src", "databases", "orm");

await removeFolder(ORM_FOLDER);
