import { join } from "node:path";
import { removeFolder } from "./remove-folder.ts";
import { dirnamePath } from "./dirname.ts";

const FOLDER_TO_DELETE = join(dirnamePath, "..", "dist");

await removeFolder(FOLDER_TO_DELETE);
