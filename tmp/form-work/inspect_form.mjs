import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "C:/Users/唐乐/Desktop/个人网站/01 应聘人员信息登记表.xlsx";
const outputDir = "C:/Users/唐乐/Desktop/个人网站/tmp/form-work";
const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const summary = await workbook.inspect({
  kind: "workbook,sheet,table,region",
  maxChars: 12000,
  tableMaxRows: 50,
  tableMaxCols: 30,
  tableMaxCellChars: 120,
});
await fs.writeFile(`${outputDir}/form-inspection.txt`, summary.ndjson, "utf8");

const sheets = await workbook.inspect({ kind: "sheet", include: "id,name", maxChars: 2000 });
const firstSheetName = JSON.parse(sheets.ndjson.split("\n")[0]).name;
const preview = await workbook.render({ sheetName: firstSheetName, autoCrop: "all", scale: 1.5, format: "png" });
await fs.writeFile(`${outputDir}/form-before.png`, new Uint8Array(await preview.arrayBuffer()));

console.log(JSON.stringify({ firstSheetName, inspectionPath: `${outputDir}/form-inspection.txt` }));
