import { stat, rm } from "node:fs/promises";
export async function removeFolder(folder: string): Promise<void> {
    const pathStat = await stat(folder);
    if (!pathStat.isDirectory()) {
        return console.error(`Not a directory: ${folder} — aborting.`);
    }
    // remove recursively and force (like rm -rf)
    await rm(folder, { recursive: true, force: true });
}
