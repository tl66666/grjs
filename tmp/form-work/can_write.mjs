import fs from "node:fs/promises";

await fs.mkdir("C:/Users/唐乐/AppData/Local/Temp/codex-node-write-probe", { recursive: true });
console.log("node write access confirmed");
