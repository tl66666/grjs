import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "C:/Users/唐乐/Desktop/个人网站/01 应聘人员信息登记表-已填写.xlsx";
const outputDir = "C:/Users/唐乐/Desktop/个人网站/tmp/form-work";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(inputPath));

const inspection = await workbook.inspect({
  kind: "table,formula,computedStyle",
  range: "应聘人员信息登记表!A4:R28",
  include: "values,formulas",
  tableMaxRows: 28,
  tableMaxCols: 18,
  maxChars: 15000,
});
await fs.writeFile(`${outputDir}/current-form-inspection.txt`, inspection.ndjson, "utf8");

const preview = await workbook.render({
  sheetName: "应聘人员信息登记表",
  autoCrop: "all",
  scale: 1.5,
  format: "png",
});
await fs.writeFile(`${outputDir}/current-form-before-update.png`, new Uint8Array(await preview.arrayBuffer()));
console.log("Inspection and preview saved.");
