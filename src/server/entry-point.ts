import { startMainServerScript } from "#src/server/server-starter-script.ts";
console.clear();
console.time("in");

await startMainServerScript();
console.timeEnd("in");
